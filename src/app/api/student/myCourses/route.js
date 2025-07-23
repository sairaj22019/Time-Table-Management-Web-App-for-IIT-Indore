
import { connectDB } from "@/dbConnection/ConnectDB";
import Student from "@/models/Student.model";
import User from "@/models/User.model";
import { NextResponse } from "next/server";
import Course from "@/models/Course.model";
import Grid from "@/models/Grid.model";
export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to Database",
        error: error,
      },
      { status: 500 }
    );
  }
  try {
    const { studentEmail } = await req.json();
    console.log("entered try block with", studentEmail);
    if (!studentEmail) {
      return NextResponse.json(
        {
          success: true,
          message: "Please provide the course ID",
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email: studentEmail });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No user found",
        },
        { status: 404 }
      );
    }
    const student = await Student.findOne({ userId: user._id });
    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "No student found with the given Mail ID",
        },
        { status: 404 }
      );
    }
    console.log(student);
    await student.populate("enrolledClasses");
    console.log("classes", student.enrolledClasses);
    const currentSem = student?.enrolledClasses[0]?.forSemester || "";
    const gridOfTheSemester = await Grid.findOne({ semester: currentSem });
    let lunchBreakSlot;
    if(!gridOfTheSemester) lunchBreakSlot = 4;
    else {
      if (gridOfTheSemester.grid[0][4].slot == "LB") {
        lunchBreakSlot = 4;
      } else {
        lunchBreakSlot = 5;
      }
    }
    return NextResponse.json(
      {
        success: true,
        message: "Student Courses fetched successfully",
        courses: student.enrolledClasses,
        lunchBreakSlot: lunchBreakSlot,
        currentSem: currentSem,
      },
      { status: 200 }
    );
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
