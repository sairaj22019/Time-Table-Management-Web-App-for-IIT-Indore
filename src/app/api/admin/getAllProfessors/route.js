import { NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";

export async function GET() {
  try {

    await connectDB();

    const professors = await User.find({ role: "professor" }, "username email");

    // Return as JSON
    return NextResponse.json({ success: true, data: professors });
  } catch (error) {
    console.error("Error fetching professors:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch professors" }, { status: 500 });
  }
}
