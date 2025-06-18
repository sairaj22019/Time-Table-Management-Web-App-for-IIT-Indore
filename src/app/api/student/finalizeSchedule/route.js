import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to the database",
        error,
      },
      { status: 500 }
    );
  }

  try {
    const { studentEmail, scheduleGrid } = await req.json();

    // Basic input validation
    if (!studentEmail || !Array.isArray(scheduleGrid)) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing studentEmail or invalid scheduleGrid format",
        },
        { status: 400 }
      );
    }

    // Find user and student
    const user = await User.findOne({ email: studentEmail });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const student = await Student.findOne({ userId: user._id });
    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    // Save finalized grid
    student.scheduleGrid = scheduleGrid;
    await student.save();

    return NextResponse.json(
      {
        success: true,
        message: "Schedule finalized and saved successfully",
        schedule: student.scheduleGrid,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving schedule:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}
