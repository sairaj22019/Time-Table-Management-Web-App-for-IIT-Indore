import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model"; 
import Professor from "@/models/Professor.model";
import { connectDB } from "@/dbConnection/ConnectDB";


export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { username, email, role } = user;
    let profileData = { username, email, role };

    if (role === "student") {
      const student = await Student.findOne({ userId });
      if (!student) {
        return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
      }

      profileData = {
        ...profileData,
        year: student.year,
        department: student.department,
        rollno: student.rollno,
      };
    } else if (role === "professor") {
      const professor = await Professor.findOne({ userId });
      if (!professor) {
        return NextResponse.json({ error: "Professor profile not found" }, { status: 404 });
      }

      profileData = {
        ...profileData,
        department: professor.department,
      };
    } else {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

    return NextResponse.json({ profile: profileData }, { status: 200 });
  } catch (err) {
    console.error("Error viewing profile:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
