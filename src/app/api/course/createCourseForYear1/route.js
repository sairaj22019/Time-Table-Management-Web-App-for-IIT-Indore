import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";
import mongoose from "mongoose";
import { connectDB } from "@/dbConnection/ConnectDB";
import Professor from "@/models/Professor.model";
import { propEffect } from "motion";
import moment from "moment-timezone";
import User from "@/models/User.model";
import Student from "@/models/Student.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;

  // Set a fixed date: Jan 1, 2000
  const fixedDate = new Date(2000, 0, 1, hours, minutes, 0, 0);
  //                year, month (0-indexed), day, hr, min, sec, ms

  return fixedDate;
}

async function addCourseToStudents(students, courseId, rollNumbers) {
  try {
    let s = [];

    // Step 1: Add students by department and year
    for (const department of students.departments) {
      const allStudents = await Student.find({
        department: department,
        year: students.year,
      });

      for (const student of allStudents) {
        if (!student.enrolledClasses.includes(courseId)) {
          student.enrolledClasses.push(courseId);
          await student.save(); // ✅ Save changes
          s.push(student._id); // ✅ Only store ObjectIds
        }
      }
    }

    // Step 2: Add students by roll number
    for (const rollno of rollNumbers) {
      const student = await Student.findOne({ rollno: rollno });

      if (student && !student.enrolledClasses.includes(courseId)) {
        student.enrolledClasses.push(courseId);
        await student.save(); // ✅ Save
        s.push(student._id); // ✅ Only store ObjectId
      }
    }

    return s; // ✅ Array of ObjectIds
  } catch (error) {
    console.error("Error in addCourseToStudents:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in registering students",
      },
      {
        status: 401,
      }
    );
  }
}

function isOverlap(scheduleA, scheduleB) {
  console.log(scheduleA.start.getTime()==scheduleB.start.getTime());
  if (scheduleA.day == scheduleB.day && scheduleA.room == scheduleB.room) {
    if 
      (scheduleA.start.getTime() == scheduleB.start.getTime()) {
      return true; 
    }
  }

  return false;
}

async function checkCollision(newCourse) {
  try {
    const allCourses = await Course.find({});
    const collisions = [];

    for (const existingCourse of allCourses) {
      for (const existingSchedule of existingCourse.schedule) {
        for (const newSchedule of newCourse.schedule) {
          // console.log(isOverlap(existingSchedule, newSchedule))
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

export async function POST(req) {
  try {
    connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        success: false,
        message: "Error connecting to database",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const { title, courseCode,lectures,tutorials,practicals, schedule,studentYear, forSemester, profName,courseCoordinator, profEmail, credits, students } =await req.json();
    // console.log(typeof schedule);
    if (
      !title ||
      !schedule ||
      !courseCode ||
      !lectures ||
      !tutorials ||
      !practicals ||
      !forSemester ||
      !studentYear ||
      !profName ||
      !courseCoordinator ||
      !profEmail ||
      !credits ||
      !students
    ) {
      // console.log(typeof students);
      return NextResponse.json(
        {
          success: false,
          message:
            "Provide all the necessary fields (Also error for frontend check the data types you are sending)",
        },
        {
          status: 400,
        }
      );
    }

    for (let i = 0; i < schedule.length; i++) {
      schedule[i].start = saveTime(schedule[i].start);
      schedule[i].end = saveTime(schedule[i].end);
      schedule[i].day = schedule[i].day;
    }
    const newCourse = new Course({
      title: title,
      courseCode:courseCode,
      studentYear:studentYear,
      schedule: schedule,
      lectures:lectures,
      tutorials:tutorials,
      practicals:practicals,
      profName: profName,
      forSemester:forSemester,
      courseCoordinator:courseCoordinator,
      profEmail: profEmail,
      credits: credits,
      prof: Array(profEmail.length),
      enrolledStudents: Array(),
    });
    for (let i = 0; i < profEmail.length; i++) {
      const user = await User.findOne({ email: profEmail[i] });

      if (user) {
        const prof = await Professor.findOne({ userId: user._id });
        if (!prof) {
          newCourse.prof[i] = null;
        } else {
          newCourse.prof[i] = prof._id;
        }
      }
    }
    const collidingCourses = await checkCollision(newCourse);
    if (collidingCourses.length != 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Multiple courses are in the same time slot",
          collidingCourses: collidingCourses,
        },
        {
          status: 400,
        }
      );
    }
    await newCourse.save();
    newCourse.enrolledStudents = await addCourseToStudents(
      students,
      newCourse._id,
      students.rollnos
    );
    for(const profid of newCourse.prof){
      const prof=await Professor.findById(profid);
      if(!prof) continue;
      prof.teachingClasses.push(newCourse._id);
      await prof.save();
    }
    await newCourse.save();

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        course: newCourse,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating course",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}