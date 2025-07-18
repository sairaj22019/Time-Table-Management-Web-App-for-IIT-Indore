import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import Course from "@/models/Course.model";
import Slot from "@/models/slot.model";

// Generate 1-hour slots between 8:30 and 18:30 for 6 days
function generateTimeSlots() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const startHour = 8;
  const startMinute = 30;
  const slotCount = 10;

  const slots = [];

  for (const day of days) {
    for (let i = 0; i < slotCount; i++) {
      const start = new Date(0, 0, 0, startHour + i, startMinute);
      const end = new Date(0, 0, 0, startHour + i + 1, startMinute);

      const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        });

      slots.push({
        day,
        start: formatTime(start),
        end: formatTime(end),
        isAvailable: true,
      });
    }
  }

  return slots;
}

// Match slot with schedule or slot entry
function isSameSlot(slotA, entry) {
  const startDate = new Date(entry.start);
  const formattedStart = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });

  return slotA.day === entry.day && slotA.start === formattedStart;
}

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database connection error",
      error: error.message,
    }, { status: 500 });
  }

  try {
    const { room } = await req.json();
    if (!room) {
      return NextResponse.json({
        success: false,
        message: "Room name is required",
      }, { status: 400 });
    }

    const [allCourses, allSlots] = await Promise.all([
      Course.find({}),
      Slot.find({})
    ]);

    const fullSlotGrid = generateTimeSlots();

    // Update based on Course.schedule
    for (const course of allCourses) {
      for (const sched of course.schedule) {
        if (sched.room === room) {
          fullSlotGrid.forEach((slot) => {
            if (isSameSlot(slot, sched)) {
              slot.isAvailable = false;
            }
          });
        }
      }
    }

    // Update based on Slot model
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // format: "YYYY-MM-DD"

for (const entry of allSlots) {
  if (entry.room === room) {
    const entryDate = new Date(entry.date).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

    if (entryDate === today) {
      fullSlotGrid.forEach((slot) => {
        if (isSameSlot(slot, entry)) {
          slot.isAvailable = false;
        }
      });
    }
  }
}


    return NextResponse.json({
      success: true,
      message: "Room details retrieved successfully",
      slots: fullSlotGrid,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error processing room slots",
      error: error.message,
    }, { status: 500 });
  }
}
