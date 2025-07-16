import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse, NextRequest } from "next/server";
import Poll from "@/models/Polls.model";
import Notification from "@/models/Notification.model";
import Course from "@/models/Course.model";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Unable to connect to the database",
      error,
    }, { status: 500 });
  }

  try {
    const { selectedOptions, pollId, profEmail } = await req.json();

    if (!selectedOptions || !pollId || !profEmail) {
      return NextResponse.json({
        success: false,
        message: "Provide all the necessary fields",
      }, { status: 400 });
    }

    const poll = await Poll.findOne({ _id: pollId });
    if (!poll || poll.isApproved === true) {
      return NextResponse.json({
        success: false,
        message: "Poll not found or already approved",
      }, { status: 404 });
    }

    const notification = await Notification.findOne({ message: poll._id });
    if (!notification) {
      return NextResponse.json({
        success: false,
        message: "You have already voted for this poll",
      }, { status: 400 });
    }
    console.log(notification)
    const course = await Course.findById( notification.course );
    if (course==null) {
      return NextResponse.json({
        success: false,
        message: "Course not found",
      }, { status: 404 });
    }
    console.log(course)
    // ✅ Approve the poll
    poll.isApproved = true;
    await poll.save();

    // ✅ Update course schedule and finalize
    course.schedule = selectedOptions; 
    course.isFinalized = true;
    await course.save();

    return NextResponse.json({
      success: true,
      message: "Poll approved and course schedule finalized.",
      updatedSchedule: selectedOptions,
    }, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error,
    }, { status: 500 });
  }
}