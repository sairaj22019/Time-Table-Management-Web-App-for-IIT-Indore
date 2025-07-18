import { NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update role to "admin"
    user.role = "admin";
    await user.save();

    return NextResponse.json({ message: "User promoted to admin successfully", email }, { status: 200 });

  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}