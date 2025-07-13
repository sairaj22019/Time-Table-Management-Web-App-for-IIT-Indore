
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import Student from "@/models/Student.model";
import Professor from "@/models/Professor.model";
import User from "@/models/User.model";
import Course from "@/models/Course.model";


export async function GET() {
  try {
    await connectDB();

    const studentsRaw = await Student.find({})
      .populate({
        path: "userId",
        select: "username email role"
      })
      .populate("enrolledClasses", "title courseCode")
      .select("department year rollno enrolledClasses");


    const students = studentsRaw.map(student => ({
      username: student.userId?.username || "",
      email: student.userId?.email || "",
      role:student.userId?.role,
      department: student.department,
      year: student.year,
      rollno: student.rollno,
      enrolledClasses: student.enrolledClasses
    }));


    const professorsRaw = await Professor.find({})
      .populate({
        path: "userId",
        select: "username email role"
      })
      .populate("teachingClasses", "title courseCode")
      .select("department teachingClasses");


    const professors = professorsRaw.map(professor => ({
      username: professor.userId?.username || "",
      email: professor.userId?.email || "",
      role:professor.userId?.role,
      department: professor.department,
      teachingClasses: professor.teachingClasses
    }));

    return NextResponse.json({
      success: true,
      students,
      professors
    });

  }catch(error){
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

