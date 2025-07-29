
import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import Professor from "@/models/Professor.model";
import Student from "@/models/Student.model";
import Grid from "@/models/Grid.model";
import mongoose from "mongoose";
import Poll from "@/models/Polls.model";
import Notification from "@/models/Notification.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);
  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;
  const istDate = new Date(2000, 0, 1, hours, minutes, 0, 0);
  return new Date(istDate.getTime()-(5.5*60*60*1000));
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

function getDay(i) {
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i];
}

function getStart(j) {
  return saveTime(
    [
      "8:30:am", "9:30:am", "10:30:am", "11:30:am", "12:30:pm",
      "1:30:pm", "2:30:pm", "3:30:pm", "4:30:pm", "5:30:pm",
    ][j]
  );
}

function getEnd(j) {
  return saveTime(
    [
      "9:30:am", "10:30:am", "11:30:am", "12:30:pm", "1:30:pm",
      "2:30:pm", "3:30:pm", "4:30:pm", "5:30:pm", "6:30:pm",
    ][j]
  );
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

const sendNotificationToStudents = async (newCourse, session) => {
  await newCourse.populate("enrolledStudents");
  const newNotification = new Notification({
    message: `You have been enrolled in a new course with course code: ${newCourse.courseCode}`,
    messageTitle: "New Course Enrollment",
    type: "general message",
    course: newCourse._id,
  });
  await newNotification.save({ session });
  for (const student of newCourse.enrolledStudents) {
    student.notifications.push({ notification: newNotification._id, isRead: false });
    await student.save({ session });
  }
};

const sendNotificationToProfessors = async (newCourse, session) => {
  await newCourse.populate("prof");
  if (newCourse.prof.length === 0) return;
  const newNotification = new Notification({
    message: `You have been assigned to teach the course: ${newCourse.title} (${newCourse.courseCode}) and we strongly reccommend you to check the schedule and notiffy the students about the tutorial sessions if any are present for the course.`,
    messageTitle: "New Course Assignment",
    type: "general message",
    course: newCourse._id,
  });
  await newNotification.save({ session });
  for (const prof of newCourse.prof) {
    prof.notifications.push({ notification: newNotification._id, isRead: false });
    await prof.save({ session });
  }
};

export async function POST(req) {
  await connectDB();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const obj = await req.json();
    console.log("Received data:", obj);

    const {
      title,
      courseCode,
      lectures,
      tutorials,
      practicals,
      credits,
      studentYear,
      forSemester,
      courseCoordinator,
      profName,
      profEmail,
      roomSlots,
      students,
    } = obj;

    if (
      !title || !courseCode || !roomSlots || !forSemester ||
      !studentYear || !profName || !courseCoordinator ||
      !profEmail || !students
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "Provide all the necessary fields" },
        { status: 400 }
      );
    }

    const newCourse = new Course({
      title,
      courseCode,
      schedule: [],
      forSemester,
      studentYear,
      lectures,
      tutorials,
      practicals,
      profName,
      courseCoordinator,
      profEmail,
      prof: Array(profName.length),
      credits,
      isGiven:false,
      studentDetails:students,
      slotRoomDetails:roomSlots,
    });

    for (let i = 0; i < profEmail.length; i++) {
      const user = await User.findOne({ email: profEmail[i] }).session(session);
      if (user) {
        const prof = await Professor.findOne({ userId: user._id }).session(session);
        newCourse.prof[i] = prof ? prof._id : null;
      }
    }

    const enrolledStudents = await addCourseToStudents(
      students,
      newCourse._id,
      students.rollnos,
      session
    );
    newCourse.enrolledStudents = enrolledStudents;

    for (const profid of newCourse.prof) {
      if (!profid) continue;
      const prof = await Professor.findById(profid).session(session);
      if (!prof) continue;
      prof.teachingClasses.push(newCourse._id);
      await prof.save({ session });
    }

    const courseGrid = await Grid.findOne({
      year: String(studentYear),
      semester: forSemester,
    }).session(session);

    if (!courseGrid) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "Course grid is not yet made" },
        { status: 404 }
      );
    }

    const matchingSlots = [];

    for (const roomSlot of roomSlots) {
      const { room, slots } = roomSlot;
      for (let i = 0; i < courseGrid.grid.length; i++) {
        for (let j = 0; j < courseGrid.grid[i].length; j++) {
          if (slots.includes(courseGrid.grid[i][j].slot)) {
            matchingSlots.push({
              start: getStart(j),
              end: getEnd(j),
              day: getDay(i),
              room: room,
            });
          }
        }
      }
    }

    newCourse.schedule = matchingSlots;

    const collisionResult = await checkCollision(newCourse);
    if (collisionResult.length !== 0) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          success: false,
          message: "Course schedule overlaps have been detected",
          collidingCourses: collisionResult,
        },
        { status: 400 }
      );
    }

    const allOptions = matchingSlots.map(slot => ({
      date: new Date(2000, 0, 1),
      day: slot.day,
      start: slot.start,
      end: slot.end,
      room: slot.room,
    }));
    let newPoll;
    if(newCourse.lectures!=0 && newCourse.practicals!=0){
      newPoll = new Poll({
        options: allOptions,
        reason: `For fixture of course schedule for the course ${newCourse.title} (${newCourse.courseCode}) with lectures ${newCourse.lectures} and practical sessions ${newCourse.practicals}`,
        context: "Sending this poll to ask for the verification of slots which will be used for the given course",
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await newPoll.save({ session });
    }else if(newCourse.lectures==0 && newCourse.practicals!=0){
      newPoll = new Poll({
        options: allOptions,
        reason: `For fixture of course schedule for the course ${newCourse.title} (${newCourse.courseCode}) with practical sessions ${newCourse.practicals}`,
        context: "Sending this poll to ask for the verification of slots which will be used for the given course",
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await newPoll.save({ session });
    }else{
      newPoll = new Poll({
        options: allOptions,
        reason: `For fixture of course schedule for the course ${newCourse.title} (${newCourse.courseCode}) with lectures ${newCourse.lectures}`,
        context: "Sending this poll to ask for the verification of slots which will be used for the given course",
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await newPoll.save({ session });
    }

    const newNotification = new Notification({
      message: newPoll._id,
      messageTitle: `Confirmation of course schedule with course code: ${newCourse.courseCode} and lectures ${newCourse.lectures}`,
      type: "schedule selection",
      course: newCourse._id,
    });
    await newNotification.save({ session });

    const userObject = await User.findOne({ email: profEmail[0] });
    const professorObject = await Professor.findOne({ userId: userObject._id });

    if (!professorObject) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "Professor is not on the platform yet!" },
        { status: 400 }
      );
    }

    professorObject.notifications.push({ notification: newNotification._id, isRead: false });
    await professorObject.save({ session });

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
    console.error("Transaction Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}




