

import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Professor from "@/models/Professor.model";
import { connectDB } from "@/dbConnection/ConnectDB";


export async function DELETE(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = body;

    // Step 1: find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;
    const role = user.role; // e.g., "student" or "professor"

    // Step 2: delete user from User collection
    await User.deleteOne({ _id: userId });

    // Step 3: delete from respective schema if needed
    if (role === "student") {
      await Student.deleteOne({ userId });
    } else if (role === "professor") {
      await Professor.deleteOne({ userId });
    }

    return NextResponse.json({ message: "User and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

