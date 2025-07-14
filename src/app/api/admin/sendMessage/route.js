import { connectDB } from "@/dbConnection/ConnectDB";
import Notification from "@/models/Notification.model";
import Professor from "@/models/Professor.model";
import Student from "@/models/Student.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error connecting to database",
        error: error,
      },
      { status: 500 }
    );
  }
  try {
    const { adminEmail, message, messageTitle } = await req.json();
    if (!adminEmail || !message || !messageTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide all the necessary fields",
        },
        { status: 400 }
      );
    }
    const newNotification = new Notification({
      message: message,
      messageTitle: messageTitle,
      type: "general message",
    });
    await newNotification.save();

    await Student.updateMany(
      {},
      {
        $push: {
          notifications: { notification: newNotification._id, isRead: false },
        },
      }
    );
    await Professor.updateMany(
      {}, 
      {
        $push: {
          notifications: { notification: newNotification._id, isRead: false },
        },
      }
    );
    return NextResponse.json({
        success:true,
        message:"Message sent successfully",
        notification:newNotification,
    },{status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        success:false,
        message:"Internal server error",
        error:error,
    },{status:500})
  }
}
