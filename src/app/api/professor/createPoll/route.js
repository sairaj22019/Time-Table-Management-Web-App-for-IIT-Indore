import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Notification from "@/models/Notification.model";
import Poll from "@/models/Polls.model";
import Professor from "@/models/Professor.model";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import { NextRequest, NextResponse } from "next/server";
import Courses from "@/app/student/courses/page";


function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);
  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;
  const istDate = new Date(2000, 0, 1, hours, minutes, 0, 0);
  return new Date(istDate.getTime()-(5.5*60*60*1000));
}


export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error connecting to database",
      error: error,
    });
  }

  try {
    const { options, reason, context, prof, courseId, expiryDate } =
      await req.json();
    if (
      !options ||
      !Array.isArray(options) ||
      !reason ||
      !context ||
      !prof ||
      !courseId ||
      !expiryDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide all the necessary fields for the poll",
        },
        { status: 400 }
      );
    }
    const newPoll = new Poll({
      options: [],
      reason: reason,
      context: context,
      expiryDate: expiryDate,
    });
    for (const option of options) {
      option.start = saveTime(option.startTime);
      option.end = saveTime(option.endTime);
      option.day = option.day;
      option.date = option.date;
      option.room = option.room;
      newPoll.options.push(option);
    }
    await newPoll.save();
    const finduser = await User.findOne({ email: prof });
    const findProf = await Professor.findOne({ userId: finduser._id });
    const newNotification = new Notification({
      message: newPoll._id,
      type: "poll",
      course: courseId,
      prof: findProf._id,
    });
    await newNotification.save();
    const course = await Course.findById(courseId);
    await course.populate("enrolledStudents");
    await course.populate("prof");

    //Pushing the new Notification into the student notifications.
    for (const student of course.enrolledStudents) {
      student.notifications.push({notification:newNotification._id,isRead:false});
      await student.save();
    }

    //Pushing the notification into the professot notifications.
    for (const professor of course.prof) {
      professor.notifications.push({ notification: newNotification._id, isRead: false });
      professor.activePolls.push(newNotification._id);
      await professor.save();
    }
    
    return NextResponse.json({
        success:true,
        message:"Poll sent successfully",
        poll:newPoll,
        notification:newNotification,
    },{status:200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({
        success:false,
        message:"Internal server error",
        error:error,
    },{status:500});
  }

}