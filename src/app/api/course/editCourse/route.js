import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";
import { connectDB } from "@/dbConnection/ConnectDB";

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

export async function POST(req) {
  try {
    try {
      await connectDB();
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          success: false,
          message: "Unable to connect to database",
          error: error,
        },
        {
          status: 500,
        }
      );
    }
    try {
      //Here i am only giving option to edit schedule room that's it;
      const { id, schedule} = await req.json();

      for (let i = 0; i < schedule.length; i++) {
        schedule[i].start = saveTime(schedule[i].start);
        schedule[i].end = saveTime(schedule[i].end);
        schedule[i].day = schedule[i].day;
      }

      const editedCourse = await Course.findByIdAndUpdate(
        id,
        { schedule },
        {
          new: true,
          runValidators: true,
        }
      );
      if(!editedCourse){
        return NextResponse.json({
            success:false,
            message:"Course with the given ID does not exist",
        },{
            status: 400,
        })
      }
      return NextResponse.json({
        success:true,
        message:"Course edited successfully",
        course:editedCourse
      },{
        status:200,
      })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server error",
        },{
            status:500,
        })
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
