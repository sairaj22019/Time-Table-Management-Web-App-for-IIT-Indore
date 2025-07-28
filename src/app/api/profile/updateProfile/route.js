
 
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, username } = body;

    if (!userId || !username) {
      return NextResponse.json({ error: "User ID and username are required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.username = username;
    await user.save();

    return NextResponse.json({ message: "Username updated successfully" }, { status: 200 });

  } catch (err) {
    console.error("Error updating username:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

