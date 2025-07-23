import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Student from "@/models/Student.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { courseId } = await req.json();
    

    const course=await Course.findOne({ _id: courseId })
    return NextResponse.json({
      success: true,
      message: "Course details fetched successfully",
      course,
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