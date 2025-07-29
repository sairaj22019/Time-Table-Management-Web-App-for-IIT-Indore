import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Slot from "@/models/slot.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);
  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;
  const istDate = new Date(2000, 0, 1, hours, minutes, 0, 0);
  return new Date(istDate.getTime()-(5.5*60*60*1000));
}


function getAllSlots() {
  const baseTimes = [
    "8:30:am", "9:30:am", "10:30:am", "11:30:am", "12:30:pm",
    "1:30:pm", "2:30:pm", "3:30:pm", "4:30:pm", "5:30:pm"
  ];
  const slots = [];
  for (let i = 0; i < baseTimes.length - 1; i++) {
    slots.push({
      start: saveTime(baseTimes[i]),
      end: saveTime(baseTimes[i + 1])
    });
  }
  return slots;
}

export async function POST(req) {
  try {
    await connectDB();

    const { day, room } = await req.json();

    if (!day || !room) {
      return NextResponse.json({
        success: false,
        message: "Please provide both day and room",
      }, { status: 400 });
    }

    const allCourses = await Course.find({});
    const allSlots = await Slot.find({ room });

    const occupied = [];

    for (const course of allCourses) {
      for (const sch of course.schedule) {
        if (sch.day === day && sch.room === room) {
          occupied.push({
            start: new Date(sch.start).getTime(),
            end: new Date(sch.end).getTime(),
          });
        }
      }
    }

    for (const slot of allSlots) {
      const slotDay = slot.day;
      if (slotDay === day) {
        occupied.push({
          start: new Date(slot.start).getTime(),
          end: new Date(slot.end).getTime(),
        });
      }
    }

    const slots = getAllSlots();
    const freeSlots = slots.filter(slot => {
      return !occupied.some(occ =>
        slot.start.getTime() === occ.start &&
        slot.end.getTime() === occ.end
      );
    });

    const responseFormatted = freeSlots.map(s => ({
      start: s.start.toTimeString().substring(0, 5),
      end: s.end.toTimeString().substring(0, 5)
    }));

    return NextResponse.json({
      success: true,
      message: `Available time slots on ${day} for room ${room}`,
      freeSlots: responseFormatted,
    }, { status: 200 });

  } catch (error) {
    console.error("Internal error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error
    }, { status: 500 });
  }
}
