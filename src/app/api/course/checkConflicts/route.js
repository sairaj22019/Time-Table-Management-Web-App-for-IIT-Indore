// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/dbConnection/ConnectDB";
// import Course from "@/models/Course.model";

// function saveTime(timeString) {
//   let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
//   let hours = parseInt(hourStr, 10);
//   let minutes = parseInt(minuteStr, 10);

//   if (meridian === "pm" && hours !== 12) hours += 12;
//   if (meridian === "am" && hours === 12) hours = 0;

//   // Set a fixed date: Jan 1, 2000
//   const fixedDate = new Date(2000, 0, 1, hours, minutes, 0, 0);
//   //                year, month (0-indexed), day, hr, min, sec, ms

//   return fixedDate;
// }

// function isOverlap(scheduleA, scheduleB) {
//   console.log(scheduleA.start.getTime()==scheduleB.start.getTime());
//   if (scheduleA.day == scheduleB.day && scheduleA.room == scheduleB.room) {
//     if 
//       (scheduleA.start.getTime() == scheduleB.start.getTime()) {
//       return true; 
//     }
//   }

//   return false;
// }

// async function checkCollision(schedules) {
//   try {
//     const allCourses = await Course.find({});
//     const collisions = [];

//     for (const existingCourse of allCourses) {
//       for (const existingSchedule of existingCourse.schedule) {
//         for (const newSchedule of schedules) {
//           if (isOverlap(existingSchedule, newSchedule)) {
//             collisions.push({
//               courseId: existingCourse._id,
//               title: existingCourse.title,
//               conflictingSchedule: existingSchedule,
//             });
//           }
//         }
//       }
//     }

//     return collisions;
//   } catch (error) {
//     console.error("Error checking collisions:", error);
//     return [];
//   }
// }

// export async function POST(req) {
//   try {
//     try {
//       connectDB();
//     } catch (error) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Error connecting to Database",
//           error: error,
//         },
//         {
//           status: 500,
//         }
//       );
//     }
//     try {
//       const { schedule } = await req.json();
//       if (!schedule) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "All the required fileds are not sent",
//           },
//           {
//             status: 400,
//           }
//         );
//       }
//       for (let i = 0; i < schedule.length; i++) {
//         schedule[i].start = saveTime(schedule[i].start);
//         schedule[i].end = saveTime(schedule[i].end);
//         schedule[i].day = schedule[i].day;
//       }
//       const collisions = await checkCollision(schedule);
//       if (collisions.length != 0) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Multiple conflicts detected in different courses",
//             collisions: collisions,
//           },
//           {
//             status: 400,
//           }
//         );
//       }
//       return NextResponse.json(
//         {
//           success: true,
//           message: "No conflicts detected",
//         },
//         {
//           status: 200,
//         }
//       );
//     } catch (error) {}
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error",
//         error: error,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);
  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;
  return new Date(2000, 0, 1, hours, minutes, 0, 0);
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
    const { days } = await req.json();

    if (!days || !Array.isArray(days)) {
      return NextResponse.json({
        success: false,
        message: "Please provide an array of days",
      }, { status: 400 });
    }

    const allCourses = await Course.find({});
    const dayWiseFreeSlots = {};

    for (const day of days) {
      const occupied = [];

      for (const course of allCourses) {
        for (const sch of course.schedule) {
          if (sch.day === day) {
            occupied.push({
              start: new Date(sch.start).getTime(),
              end: new Date(sch.end).getTime()
            });
          }
        }
      }

      const allSlots = getAllSlots();
      const freeSlots = allSlots.filter(slot => {
        return !occupied.some(occ =>
          slot.start.getTime() === occ.start && slot.end.getTime() === occ.end
        );
      });

      dayWiseFreeSlots[day] = freeSlots.map(s => ({
        start: s.start.toTimeString().substring(0, 5),
        end: s.end.toTimeString().substring(0, 5)
      }));
    }

    return NextResponse.json({
      success: true,
      message: "Available time slots for the given days",
      freeSlots: dayWiseFreeSlots
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