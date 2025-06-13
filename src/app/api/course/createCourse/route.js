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
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(':');
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  if (meridian === 'pm' && hours !== 12) hours += 12;
  if (meridian === 'am' && hours === 12) hours = 0;

  // Set a fixed date: Jan 1, 2000
  const fixedDate = new Date(2000, 0, 1, hours, minutes, 0, 0); 
  //                year, month (0-indexed), day, hr, min, sec, ms

  return fixedDate;
}

async function addCourseToStudents(students, courseId, rollNumbers) {
  const allStudentIds = new Set();

  // Step 1: By department + year
  for (let i = 0; i < students.departments.length; i++) {
    const dept = students.departments[i];
    const year = students.year;

    try {
      const updatedStudents = await Student.find({
        department: dept,
        year: year,
        enrolledClasses: { $ne: courseId },
      });

      const ids = updatedStudents.map((s) => s._id);
      ids.forEach(id => allStudentIds.add(id));

      await Student.updateMany(
        { _id: { $in: ids } },
        { $push: { enrolledClasses: courseId } }
      );
    } catch (err) {
      console.error(`Error updating department ${dept} (year ${year}):`, err);
    }
  }

  // Step 2: By roll numbers
  for (let i = 0; i < rollNumbers.length; i++) {
    const roll = rollNumbers[i];
    try {
      const student = await Student.findOne({
        rollno: roll,
        enrolledClasses: { $ne: courseId },
      });

      if (student) {
        allStudentIds.add(student._id);
        await Student.updateOne(
          { _id: student._id },
          { $push: { enrolledClasses: courseId } }
        );
      }
    } catch (err) {
      console.error(`Error updating roll number ${roll}:`, err);
    }
  }

  // Step 3: Push all collected student IDs into the Course.enrolledStudents
try {
  await Course.updateOne(
    { _id: courseId },
    {
      $addToSet: {
        enrolledStudents: { $each: Array.from(allStudentIds) },
      },
    }
  );
} catch (err) {
  console.error("Error updating course with enrolled students:", err);
}

}


function isOverlap(scheduleA, scheduleB) {
  // Check if there's a common day
  const daysOverlap = scheduleA.day.some(day => scheduleB.day.includes(day));
  if (!daysOverlap) return false;

  // Check if same room
  if (scheduleA.room !== scheduleB.room) return false;

  // Time overlap check
  return (
    scheduleA.start < scheduleB.end && scheduleB.start < scheduleA.end
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
              conflictingSchedule: existingSchedule
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
    const { title, schedule, profName, profEmail, credits,students } = await req.json();
    if (
      !title ||
      !schedule ||
      !profName ||
      !profEmail ||
      !credits ||
      !typeof schedule == Array ||
      !students
    ) {
      console.log(typeof students)
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
      schedule[i].start =  saveTime(schedule[i].start);
      schedule[i].end =  saveTime(schedule[i].end);
      schedule[i].day =  schedule[i].day;
    }
    const newCourse = new Course({
      title: title,
      schedule: schedule,
      profName: profName,
      profEmail: profEmail,
      credits: credits,
      prof: Array(profEmail.length),
    });
    for(let i=0;i<profEmail.length;i++){

      const user = await User.findOne({ email: profEmail });
  
      if (user) {
        const prof= await Professor.findOne({ userId: user._id });
        if (!prof) {
          newCourse.prof[i] = null;
        } else {
          newCourse.prof[i] = prof._id;
        }
      } 
    }
    const collidingCourses=await  checkCollision(newCourse)
    if(collidingCourses.length!=0){
      return NextResponse.json({
        success:false,
        message:"Multiple courses are in the same time slot",
        collidingCourses:collidingCourses,
      },{
        stats:400,
      })
    }
    await newCourse.save();
    await addCourseToStudents(students,newCourse._id,students.backlogs);
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
