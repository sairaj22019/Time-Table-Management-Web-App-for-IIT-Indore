import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";
import mongoose from "mongoose";
import { connectDB } from "@/dbConnection/ConnectDB";
import Professor from "@/models/Professor.model";
import { propEffect } from "motion";
import moment from "moment-timezone";
import User from "@/models/User.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(':');
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  if (meridian === 'pm' && hours !== 12) hours += 12;
  if (meridian === 'am' && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // hour, minute, second, ms

  return date;
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
    const { title, schedule, profName, profEmail, credits } = await req.json();
    if (
      !title ||
      !schedule ||
      !profName ||
      !profEmail ||
      !credits ||
      !typeof schedule == Array
    ) {
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
      prof: null,
    });
    const user = await User.findOne({ email: profEmail });

    if (user) {
      const prof = await Professor.findOne({ userId: user._id });
      if (!prof) {
        newCourse.prof = null;
      } else {
        newCourse.prof = prof._id;
      }
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
