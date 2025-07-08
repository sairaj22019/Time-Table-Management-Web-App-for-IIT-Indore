import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Notification from "@/models/Notification.model";
import Professor from "@/models/Professor.model";
import Course from "@/models/Course.model";
import Poll from "@/models/Polls.model";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Unable to connect to Database",
      error: error,
    }, { status: 500 });
  }

  try {
    const { profEmail } = await req.json();
    if (!profEmail) {
      return NextResponse.json({
        success: false,
        message: "Please provide the student email",
      }, { status: 400 });
    }

    const user = await User.findOne({ email: profEmail });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "No user found",
      }, { status: 404 });
    }

    const professor = await Professor.findOne({ userId: user._id })
      .populate({
        path: "notifications.notification",
        model: "Notification",
      });

    if (!professor) {
      return NextResponse.json({
        success: false,
        message: "No professor found with the given Mail ID",
      }, { status: 404 });
    }

    for (const item of professor.notifications) {
      const notif = item.notification;

      if (notif && notif.type === "poll") {
        await notif.populate({ path: "message", model: "Poll" });
      }

      if (notif) {
        await notif.populate({ path: "prof", model: "Professor" });
        if(notif.prof)
        {
        const userId=notif.prof.userId;
        const user=await User.findById(userId);
        notif.prof=user;
        await notif.populate({ path: "course", model: "Course" });
        }

        if(notif.prof){
            const isSameProf = String(notif.prof._id) === String(professor._id);
            notif._doc.isSent = isSameProf;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "professor notifications fetched successfully",
      professor: professor.notifications,
    }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error,
    }, { status: 500 });
  }
}
