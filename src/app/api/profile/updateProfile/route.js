import { NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Professor from "@/models/Professor.model";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, year, department, username } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (username) {
      user.username = username;
      await user.save();
    }

    const updateFields = {};
    if (year) updateFields.year = year;
    if (department) updateFields.department = department;

    if (user.role === "student") {
      const student = await Student.findOneAndUpdate(
        { userId },
        { $set: updateFields },
        { new: true }
      );

      if (!student) {
        return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
      }
    } else if (user.role === "professor") {
      const professor = await Professor.findOneAndUpdate(
        { userId },
        { $set: updateFields },
        { new: true }
      );

      if (!professor) {
        return NextResponse.json({ error: "Professor profile not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });

  } catch (err) {
    console.error("Error updating profile:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}