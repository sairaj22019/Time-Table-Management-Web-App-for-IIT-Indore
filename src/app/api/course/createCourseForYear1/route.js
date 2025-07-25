
import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";
import mongoose from "mongoose";
import { connectDB } from "@/dbConnection/ConnectDB";
import Professor from "@/models/Professor.model";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Notification from "@/models/Notification.model";

function splitIntoOneHourIntervals(schedule) {
  const result = [];

  for (const entry of schedule) {
    let start = saveTime(entry.start);
    const end = saveTime(entry.end);

    while (start < end) {
      const nextEnd = new Date(start.getTime());
      nextEnd.setHours(start.getHours() + 1);

      // Limit end to the overall block end
      const slotEnd = nextEnd > end ? end : nextEnd;

      result.push({
        day: entry.day,
        room: entry.room,
        start: new Date(start),
        end: new Date(slotEnd),
      });

      start = slotEnd;
    }
  }

  return result;
}

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);
  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;
  return new Date(2000, 0, 1, hours, minutes, 0, 0);
}

function isOverlap(scheduleA, scheduleB) {
  return (
    scheduleA.day === scheduleB.day &&
    scheduleA.room === scheduleB.room &&
    scheduleA.start.getTime() === scheduleB.start.getTime()
  );
}

async function checkCollision(newCourse) {
  try {
    const allCourses = await Course.find({});
    const collisions = [];
    for (const existingCourse of allCourses) {
      for (const existingSchedule of existingCourse.schedule) {
        for (const newSchedule of newCourse.schedule) {
          if (isOverlap(existingSchedule, newSchedule)) {
            collisions.push({
              courseId: existingCourse._id,
              title: existingCourse.title,
              conflictingSchedule: existingSchedule,
            });
          }
        }
      }
    }
    return collisions;
  } catch (error) {
    console.error("Error checking collisions:", error);
    return [];
  }
}

async function addCourseToStudents(students, courseId, rollNumbers, session) {
  let s = [];
  for (const department of students.departments) {
    const allStudents = await Student.find({
      department: department,
      year: students.year,
    }).session(session);
    for (const student of allStudents) {
      if (!student.enrolledClasses.includes(courseId)) {
        student.enrolledClasses.push(courseId);
        await student.save({ session });
        s.push(student._id);
      }
    }
  }
  for (const rollno of rollNumbers) {
    const student = await Student.findOne({ rollno: rollno }).session(session);
    if (student && !student.enrolledClasses.includes(courseId)) {
      student.enrolledClasses.push(courseId);
      await student.save({ session });
      s.push(student._id);
    }
  }
  return s;
}
const sendNotificationToStudents=async (newCourse,session)=>{
  await newCourse.populate("enrolledStudents");
  const newNotification= new Notification({
    message:`You have been enrolled in a new course with course code: ${newCourse.courseCode}`,
    messageTitle:"New Course Enrollment",
    type:"general message",
    course:newCourse._id,
  })
  await newNotification.save({session});
  for(const student of newCourse.enrolledStudents){
    console.log("pushing notification to student",student._id);
    student.notifications.push({notification:newNotification._id,isRead:false});
    await student.save({session});
  }
}
const sendNotificationToProfessors=async (newCourse,session)=>{
  await newCourse.populate("prof");
  if(newCourse.prof.length===0) return;
  const newNotification= new Notification({
    message:`You have been assigned to teach the course: ${newCourse.title} (${newCourse.courseCode})`,
    messageTitle:"New Course Assignment",
    type:"general message",
    course:newCourse._id,
  });
  await newNotification.save({session});
  for(const prof of newCourse.prof){
    prof.notifications.push({notification:newNotification._id,isRead:false});
    await prof.save({session});
  }
}
export async function POST(req) {
  await connectDB();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title,
      courseCode,
      lectures,
      tutorials,
      practicals,
      schedule,
      studentYear,
      forSemester,
      profName,
      courseCoordinator,
      profEmail,
      credits,
      students,
    } = await req.json();

    if (
      !title ||
      !schedule ||
      !courseCode ||
      !forSemester ||
      !studentYear ||
      !profName ||
      !courseCoordinator ||
      !profEmail ||
      !students
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "Provide all necessary fields" },
        { status: 400 }
      );
    }

  const parsedSchedule = splitIntoOneHourIntervals(schedule);


    const newCourse = new Course({
      title,
      courseCode,
      studentYear,
      schedule:parsedSchedule,
      lectures,
      tutorials,
      practicals,
      profName,
      forSemester,
      courseCoordinator,
      profEmail,
      isFinalized: true,
      credits,
      prof: Array(profEmail.length),
      enrolledStudents: [],
      isGiven:true,
      studentDetails:students,
    });

    for (let i = 0; i < profEmail.length; i++) {
      const user = await User.findOne({ email: profEmail[i] }).session(session);
      if (user) {
        const prof = await Professor.findOne({ userId: user._id }).session(
          session
        );
        newCourse.prof[i] = prof ? prof._id : null;
      }
    }

    const collidingCourses = await checkCollision(newCourse);
    if (collidingCourses.length !== 0) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          success: false,
          message: "Multiple courses are in the same time slot",
          collidingCourses,
        },
        { status: 400 }
      );
    }

    await newCourse.save({ session });
    newCourse.enrolledStudents = await addCourseToStudents(
      students,
      newCourse._id,
      students.rollnos,
      session
    );

    for (const profid of newCourse.prof) {
      const prof = await Professor.findById(profid).session(session);
      if (!prof) continue;
      prof.teachingClasses.push(newCourse._id);
      await prof.save({ session });
    }

    await newCourse.save({ session });
    await sendNotificationToStudents(newCourse, session);
    await sendNotificationToProfessors(newCourse, session);
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        course: newCourse,
      },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Course creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Error creating course", error },
      { status: 500 }
    );
  }
}
