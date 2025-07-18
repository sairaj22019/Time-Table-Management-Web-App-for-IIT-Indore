import { connectDB } from "@/dbConnection/ConnectDB";
import Slot from "@/models/slot.model";
import { NextResponse } from "next/server";

// Map day names to JS day numbers
const dayNameToNumber = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

// Get the next date for a given day name
function getNextDateOfDay(dayName) {
  const today = new Date();
  const targetDay = dayNameToNumber[dayName];
  const currentDay = today.getDay();
  const diff = (targetDay - currentDay + 7) % 7 || 7;

  const result = new Date(today);
  result.setDate(today.getDate() + diff);
  result.setHours(0, 0, 0, 0); // midnight

  return result;
}

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error connecting to database",
      error: error,
    }, { status: 500 });
  }

  try {
    const { start, end, day, room } = await req.json();

    if (!start || !end || !day || !room) {
      return NextResponse.json({
        success: false,
        message: "Provide all the required fields",
      }, { status: 400 });
    }

    const date = getNextDateOfDay(day);

    const newSlot = new Slot({
      day,
      date,         // Date of next occurrence of day
      start: new Date(start), // Ensure start is a valid Date
      end: new Date(end),
      room,
    });

    await newSlot.save();

    return NextResponse.json({
      success: true,
      message: "Slot booked successfully",
      slot: newSlot,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error,
    }, { status: 500 });
  }
}
