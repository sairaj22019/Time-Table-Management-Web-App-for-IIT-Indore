import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import { NextResponse } from "next/server";

const generateAllSlots = () => {
  const baseDate = new Date("2000-01-01T08:30:00.000+05:30");
  const slots = [];
  for (let i = 0; i < 15; i++) {
    const slot = new Date(baseDate.getTime() + i * 60 * 60 * 1000);
    const hours = slot.getHours().toString().padStart(2, '0');
    const minutes = slot.getMinutes().toString().padStart(2, '0');
    slots.push(`${hours}:${minutes}`);
  }
  return slots;
};

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error,
    }, { status: 500 });
  }

  try {
    const { room, days } = await req.json(); 

    if (!room || !Array.isArray(days) || days.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Room and at least one day are required",
      }, { status: 400 });
    }

    const allSchedules = await Course.find({});
    const allSlots = generateAllSlots();

    const emptySlotsByDay = {};

    for (const day of days) {
      const occupied = new Set();

      for (const course of allSchedules) {
        for (const schedule of course.schedule) {
          if (schedule.room === room && schedule.day === day) {
            const istDate = new Date(schedule.start.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
            const hour = istDate.getHours();
            const minute = istDate.getMinutes();
            const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            occupied.add(timeStr);
          }
        }
      }

      const empty = allSlots.filter(slot => !occupied.has(slot));
      emptySlotsByDay[day] = empty;
    }

    return NextResponse.json({
      success: true,
      message: "Empty slots fetched successfully",
      emptySlots: emptySlotsByDay,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error,
    }, { status: 500 });
  }
}