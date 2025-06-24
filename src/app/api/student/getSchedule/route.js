import { connectDB } from "@/dbConnection/ConnectDB";
import Grid from "@/models/Grid.model";
import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Course from "@/models/Course.model";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to connect to database" },
      { status: 500 }
    );
  }

  try {
    const { studentEmail, currentSem, year } = await req.json();

    // Validate input
    if (!studentEmail || !currentSem || !year) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the grid
    const grid = await Grid.findOne({ year, semester: currentSem }).lean();
    if (!grid) {
      return NextResponse.json(
        { success: false, message: "Academic grid not configured" },
        { status: 404 }
      );
    }

    // Find user and student
    const user = await User.findOne({ email: studentEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const student = await Student.findOne({ userId: user._id });
    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student record not found" },
        { status: 404 }
      );
    }
    console.log(student.enrolledClasses);
    // Get enrolled courses
    await student.populate({
      path: "enrolledClasses",
      match: { forSemester: currentSem },
      model: Course,
    });
    console.log(student);
    // Build slot-to-course mapping
    const slotCourseMap = {};
    student.enrolledClasses.forEach(course => {
      course.slots.forEach(slot => {
        slotCourseMap[slot] = course;
      });
    });

    // Generate detailed schedule for ALL grid slots
    const detailedSchedule = [];
    grid.grid.forEach(row => {
      row.forEach(cell => {
        const course = slotCourseMap[cell.slot];
        detailedSchedule.push({
          slot: cell.slot,
          room: cell.room || "",
          courseCode: course?.courseCode || "",
          course: course ? 
            (course.toObject ? course.toObject() : course) : 
            null
        });
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Complete timetable generated",
        schedule: detailedSchedule,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
