import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Student from "@/models/Student.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: "Invalid or missing courseId",
      }, { status: 400 });
    }

    // Step-1: Fetch course with populated enrolled students
    const course = await Course.findById(courseId).populate("enrolledStudents");
    if (!course) {
      return NextResponse.json({
        success: false,
        message: "Course not found",
      }, { status: 404 });
    }

    const rollnos = [];    // Collect all enrolled student roll numbers
    const yearFreq = {};   // Track frequency of student years

    for (const student of course.enrolledStudents) {
      const roll = student.rollno || "unknown";
      rollnos.push(roll);

      if (typeof student.year === "number") {
        yearFreq[student.year] = (yearFreq[student.year] || 0) + 1;
      }
    }

    // Step-5: Determine most frequent studentYear
    let studentYear = null;
    const sortedYears = Object.entries(yearFreq).sort((a, b) => b[1] - a[1]);
    if (sortedYears.length > 0) {
      studentYear = parseInt(sortedYears[0][0], 10);
    }

    return NextResponse.json({
      success: true,
      message: "Course data fetched successfully",
      course,
      rollnos,
      studentYear,
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing student rollnos:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error,
    }, { status: 500 });
  }
}