import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student.model";
import User from "@/models/User.model"

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to database",
        error: error,
      },
      { status: 500 }
    );
  }

  try {
    const { studentEmail, notificationList } = await req.json();
    const userObj=await User.findOne({email:studentEmail});
    const studentObj=await Student.findOne({userId:userObj._id});
    if (!studentObj || !notificationList ) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide all the necessary fields",
        },
        { status: 400 }
      );
    }
      const index = student.notifications.findIndex(
        (item) => item.notification.toString() === notificationList
      );
      if (index !== -1) {
        student.notifications[index].isRead = true;
      }
    

    await student.save();

    return NextResponse.json({
      success: true,
      message: "Marked notifications as read",
    }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error,
      },
      { status: 500 }
    );
  }
}
