
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import Student from "@/models/Student.model";
import Professor from "@/models/Professor.model";
import User from "@/models/User.model";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, newDepartment } = body;

    // Step 1: find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const userId = user._id;
    const role = user.role; // e.g., "student" or "professor"

    let updatedDoc;

    // Step 2: based on role, update department in respective schema
    if (role === "student") {
      updatedDoc = await Student.findOneAndUpdate(
        { userId },
        { department: newDepartment },
        { new: true }
      );
    } else if (role === "professor") {
      updatedDoc = await Professor.findOneAndUpdate(
        { userId },
        { department: newDepartment },
        { new: true }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid role or role does not support department update" },
        { status: 400 }
      );
    }

    if (!updatedDoc) {
      return NextResponse.json(
        { message: `${role} record not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Department updated successfully",
      department: updatedDoc.department,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

