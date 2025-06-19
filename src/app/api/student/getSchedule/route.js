// // // // import { connectDB } from "@/dbConnection/ConnectDB";
// // // // import Grid from "@/models/Grid.model";
// // // // import { NextResponse, NextRequest } from "next/server";
// // // // import User from "@/models/User.model";
// // // // import Student from "@/models/Student.model";

// // // // export async function POST(req) {
// // // //   try {
// // // //     await connectDB();
// // // //   } catch (error) {
// // // //     console.log(error);
// // // //     return NextResponse.json(
// // // //       {
// // // //         success: false,
// // // //         message: "Unable to connect to database",
// // // //         error: error,
// // // //       },
// // // //       { stauts: 500 }
// // // //     );
// // // //   }

// // // //   try {
// // // //     const { studentEmail, currentSem, year } = await req.json();

// // // //     const grid = await Grid.findOne({ year: year, semester: currentSem });
// // // //     if (!grid) {
// // // //       return NextResponse.json({
// // // //         success: false,
// // // //         message: "Check with the admin for page details (Grid problem)",
// // // //       });
// // // //     }

// // // //     const user = await User.findOne({ email: studentEmail });
// // // //     if (!user) {
// // // //       return NextResponse.json(
// // // //         {
// // // //           success: false,
// // // //           message: "User with the given mailID does not exist",
// // // //         },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     const student = await Student.findOne({ userId: user._id });
// // // //     if (!student) {
// // // //       return NextResponse.json(
// // // //         {
// // // //           success: false,
// // // //           message: "Student with the given Mail ID does not exist",
// // // //         },
// // // //         { status: 404 }
// // // //       );
// // // //     }
// // // //     if(student.scheduleGrid!=null){
// // // //       return NextResponse.json({
// // // //         success:true,
// // // //         message:"Student schedule fetched successfully",
// // // //         schedule:student.scheduleGrid,
// // // //       },{stauts:200});
// // // //     }
// // // //     await student.populate({
// // // //       path: "enrolledClasses",
// // // //       match: { year: year, semester: currentSem },
// // // //     });

// // // //     const personalGrid = JSON.parse(JSON.stringify(grid.grid)); // Deep copy to avoid mutating DB object

// // // //     for (const course of student.enrolledClasses) {
// // // //       for (let i = 0; i < personalGrid.length; i++) {
// // // //         for (let j = 0; j < personalGrid[i].length; j++) {
// // // //           if (course.slots.includes(personalGrid[i][j])) {
// // // //             personalGrid[i][j] = course.courseCode;
// // // //           }
// // // //         }
// // // //       }
// // // //     }

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       message: "Student timetable generated",
// // // //       timetable: personalGrid,
// // // //     });
// // // //   } catch (error) {
// // // //     console.log(error);
// // // //     return NextResponse.json(
// // // //       {
// // // //         success: false,
// // // //         message: "Internal server error",
// // // //         error: error,
// // // //       },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // import { connectDB } from "@/dbConnection/ConnectDB";
// // // import Grid from "@/models/Grid.model";
// // // import { NextResponse } from "next/server";
// // // import User from "@/models/User.model";
// // // import Student from "@/models/Student.model";

// // // export async function POST(req) {
// // //   // Database connection
// // //   try {
// // //     await connectDB();
// // //   } catch (error) {
// // //     console.error("Database connection error:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: "Database connection failed" },
// // //       { status: 500 }
// // //     );
// // //   }

// // //   // Request processing
// // //   try {
// // //     const { studentEmail, currentSem, year } = await req.json();

// // //     // Validate input
// // //     if (!studentEmail || !currentSem || !year) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Missing required fields" },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Grid verification
// // //     const grid = await Grid.findOne({ year, semester: currentSem });
// // //     if (!grid) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Academic grid not configured" },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     // User verification
// // //     const user = await User.findOne({ email: studentEmail });
// // //     if (!user) {
// // //       return NextResponse.json(
// // //         { success: false, message: "User not found" },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     // Student verification
// // //     const student = await Student.findOne({ userId: user._id });
// // //     if (!student) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Student record not found" },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     // Return existing schedule if available
// // //     if (student.scheduleGrid) {
// // //       return NextResponse.json({
// // //         success: true,
// // //         message: "Existing schedule found",
// // //         schedule: student.scheduleGrid,
// // //       }, { status: 200 });
// // //     }

// // //     // Get current semester enrollments
// // //     await student.populate({
// // //       path: "enrolledClasses",
// // //       match: { year, semester: currentSem },
// // //     });

// // //     // Create timetable
// // //     const personalGrid = structuredClone(grid.grid); // More efficient deep clone
    
// // //     for (const course of student.enrolledClasses) {
// // //       for (const [i, row] of personalGrid.entries()) {
// // //         for (const [j, slot] of row.entries()) {
// // //           if (course.slots.includes(slot)) {
// // //             personalGrid[i][j] = course.courseCode;
// // //           }
// // //         }
// // //       }
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       message: "Timetable generated successfully",
// // //       timetable: personalGrid,
// // //     }, { status: 200 });

// // //   } catch (error) {
// // //     console.error("Processing error:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: "Internal server error" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { connectDB } from "@/dbConnection/ConnectDB";
// // import Grid from "@/models/Grid.model";
// // import { NextResponse } from "next/server";
// // import User from "@/models/User.model";
// // import Student from "@/models/Student.model";

// // export async function POST(req) {
// //   // 1. Connect to the database
// //   try {
// //     await connectDB();
// //   } catch (error) {
// //     console.error("Database connection error:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Unable to connect to database" },
// //       { status: 500 }
// //     );
// //   }

// //   // 2. Process the request
// //   try {
// //     const { studentEmail, currentSem, year } = await req.json();

// //     // Validate input
// //     if (!studentEmail || !currentSem || !year) {
// //       return NextResponse.json(
// //         { success: false, message: "Missing required fields" },
// //         { status: 400 }
// //       );
// //     }

// //     // 3. Find the grid for the current semester and year
// //     const grid = await Grid.findOne({ year, semester: currentSem });
// //     if (!grid) {
// //       return NextResponse.json(
// //         { success: false, message: "Check with the admin for page details (Grid problem)" },
// //         { status: 404 }
// //       );
// //     }

// //     // 4. Find the user by email
// //     const user = await User.findOne({ email: studentEmail });
// //     if (!user) {
// //       return NextResponse.json(
// //         { success: false, message: "User with the given mailID does not exist" },
// //         { status: 404 }
// //       );
// //     }

// //     // 5. Find the student by userId
// //     const student = await Student.findOne({ userId: user._id });
// //     if (!student) {
// //       return NextResponse.json(
// //         { success: false, message: "Student with the given Mail ID does not exist" },
// //         { status: 404 }
// //       );
// //     }

// //     // 6. If student already has a schedule, return it
// //     if (student.scheduleGrid) {
// //       return NextResponse.json(
// //         {
// //           success: true,
// //           message: "Student schedule fetched successfully",
// //           schedule: student.scheduleGrid,
// //         },
// //         { status: 200 }
// //       );
// //     }

// //     // 7. Populate enrolled classes for the current semester and year
// //     await student.populate({
// //       path: "enrolledClasses",
// //       match: { year, semester: currentSem },
// //     });

// //     // 8. Deep clone the grid to avoid mutating the original
// //     // Use JSON.parse(JSON.stringify()) for Mongoose objects
// //     const personalGrid = JSON.parse(JSON.stringify(grid.grid));
// //     console.log(student.enrolledClasses.length);
// //     // 9. Fill the grid with the student's courses
// //     for (const course of student.enrolledClasses) {
// //       for (let i = 0; i < personalGrid.length; i++) {
// //         for (let j = 0; j < personalGrid[i].length; j++) {
// //           if (course.slots.includes(personalGrid[i][j])) {
// //             personalGrid[i][j] = course.courseCode;
// //           }
// //         }
// //       }
// //     }

// //     // 10. Return the personalized timetable
// //     return NextResponse.json(
// //       {
// //         success: true,
// //         message: "Student timetable generated",
// //         timetable: personalGrid,
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Processing error:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Internal server error", error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { connectDB } from "@/dbConnection/ConnectDB";
// import Grid from "@/models/Grid.model";
// import { NextResponse } from "next/server";
// import User from "@/models/User.model";
// import Student from "@/models/Student.model";
// import Course from "@/models/Course.model";

// export async function POST(req) {
//   // 1. Connect to the database
//   try {
//     await connectDB();
//   } catch (error) {
//     console.error("Database connection error:", error);
//     return NextResponse.json(
//       { success: false, message: "Unable to connect to database" },
//       { status: 500 }
//     );
//   }

//   // 2. Process the request
//   try {
//     const { studentEmail, currentSem, year } = await req.json();

//     // Validate input
//     if (!studentEmail || !currentSem || !year) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // 3. Find the grid for the current semester and year
//     const grid = await Grid.findOne({ year, semester: currentSem }).lean();
//     if (!grid) {
//       return NextResponse.json(
//         { success: false, message: "Check with the admin for page details (Grid problem)" },
//         { status: 404 }
//       );
//     }

//     // 4. Find the user by email
//     const user = await User.findOne({ email: studentEmail });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User with the given mailID does not exist" },
//         { status: 404 }
//       );
//     }

//     // 5. Find the student by userId
//     const student = await Student.findOne({ userId: user._id });
//     if (!student) {
//       return NextResponse.json(
//         { success: false, message: "Student with the given Mail ID does not exist" },
//         { status: 404 }
//       );
//     }

//     // 6. Populate enrolled classes for the current semester and year, with full course data
//     await student.populate({
//       path: "enrolledClasses",
//       match: { year, semester: currentSem },
//       model: Course,
//     });

//     // 7. Build a slot-to-room map from the grid
//     const slotRoomMap = {};
//     grid.grid.forEach(row => {
//       row.forEach(cell => {
//         if (cell.slot) slotRoomMap[cell.slot] = cell.room;
//       });
//     });

//     // 8. Build the detailed schedule array
//     const detailedSchedule = [];
//     for (const course of student.enrolledClasses) {
//       const courseData = course.toObject ? course.toObject() : course;
//       for (const slot of course.slots) {
//         detailedSchedule.push({
//           slot,
//           courseCode: course.courseCode,
//           course: courseData,
//           room: slotRoomMap[slot] || "",
//         });
//       }
//     }

//     // 9. Return the detailed schedule
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Detailed student schedule generated",
//         schedule: detailedSchedule,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Processing error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { connectDB } from "@/dbConnection/ConnectDB";
import Grid from "@/models/Grid.model";
import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Course from "@/models/Course.model";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to connect to database" },
      { status: 500 }
    );
  }

  try {
    const { studentEmail, currentSem, year } = await req.json();

    // Validate input
    if (!studentEmail || !currentSem || !year) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the grid
    const grid = await Grid.findOne({ year, semester: currentSem }).lean();
    if (!grid) {
      return NextResponse.json(
        { success: false, message: "Academic grid not configured" },
        { status: 404 }
      );
    }

    // Find user and student
    const user = await User.findOne({ email: studentEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const student = await Student.findOne({ userId: user._id });
    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student record not found" },
        { status: 404 }
      );
    }
    console.log(student.enrolledClasses);
    // Get enrolled courses
    await student.populate({
      path: "enrolledClasses",
      match: { forSemester: currentSem },
      model: Course,
    });
    console.log(student);
    // Build slot-to-course mapping
    const slotCourseMap = {};
    student.enrolledClasses.forEach(course => {
      course.slots.forEach(slot => {
        slotCourseMap[slot] = course;
      });
    });

    // Generate detailed schedule for ALL grid slots
    const detailedSchedule = [];
    grid.grid.forEach(row => {
      row.forEach(cell => {
        const course = slotCourseMap[cell.slot];
        detailedSchedule.push({
          slot: cell.slot,
          room: cell.room || "",
          courseCode: course?.courseCode || "",
          course: course ? 
            (course.toObject ? course.toObject() : course) : 
            null
        });
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Complete timetable generated",
        schedule: detailedSchedule,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
