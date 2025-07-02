import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student.model";

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
    const { userId, notificationList } = await req.json();
    if (!userId || !notificationList || !Array.isArray(notificationList)) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide all the necessary fields",
        },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ userId });
    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    for (const notificationId of notificationList) {
      const index = student.notifications.findIndex(
        (item) => item.notification.toString() === notificationId
      );
      if (index !== -1) {
        student.notifications[index].isRead = true;
      }
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
