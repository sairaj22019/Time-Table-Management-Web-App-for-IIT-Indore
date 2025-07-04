import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User.model";
import { connectDB } from "@/dbConnection/ConnectDB";

export async function POST(req) {
  try {
    const { oldPassword, newPassword, userId } = await req.json();

    if (!oldPassword || !newPassword || !userId) {
      return NextResponse.json(
        { error: "oldPassword, newPassword, and userId are required"},
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
    }

    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // user.password = hashedPassword;
    user.password = newPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
