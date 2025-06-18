import { connectDB } from "@/dbConnection/ConnectDB";
import Grid from "@/models/Grid.model";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";

export async function POST(req) {
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
      { stauts: 500 }
    );
  }

  try {
    const { studentEmail, currentSem, year } = await req.json();

    const grid = await Grid.findOne({ year: year, semester: currentSem });
    if (!grid) {
      return NextResponse.json({
        success: false,
        message: "Check with the admin for page details",
      });
    }

    const user = await User.findOne({ email: studentEmail });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User with the given mailID does not exist",
        },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ userId: user._id });
    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student with the given Mail ID does not exist",
        },
        { status: 404 }
      );
    }
    if(student.scheduleGrid!=null){
      return NextResponse.json({
        success:true,
        message:"Student schedule fetched successfully",
        schedule:student.scheduleGrid,
      },{stauts:200});
    }
    await student.populate({
      path: "enrolledClasses",
      match: { year: year, semester: currentSem },
    });

    const personalGrid = JSON.parse(JSON.stringify(grid.grid)); // Deep copy to avoid mutating DB object

    for (const course of student.enrolledClasses) {
      for (let i = 0; i < personalGrid.length; i++) {
        for (let j = 0; j < personalGrid[i].length; j++) {
          if (course.slots.includes(personalGrid[i][j])) {
            personalGrid[i][j] = course.courseCode;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Student timetable generated",
      timetable: personalGrid,
    });
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
