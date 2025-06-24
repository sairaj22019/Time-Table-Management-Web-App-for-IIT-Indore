// import { NextResponse } from "next/server"
// import Course from "@/models/Course.model" // Adjust the path to your Course model
// import { connectDB } from "@/dbConnection/ConnectDB" // Adjust the path to your MongoDB connection

// export async function GET() {
//   try {
//     await connectDB()

//     const courses = await Course.find({})
//       .populate("enrolledStudents", "name email") // Populate student details if needed
//       .lean()

//     // Transform the data to match frontend expectations
//     const transformedCourses = courses.map((course, index) => ({
//       id: course._id.toString(),
//       name: course.title,
//       code: course.courseCode,
//       enrolledStudents: course.enrolledStudents?.length || 0,
//       academicYear: "2024-2025", // You might want to derive this from forSemester or add it to schema
//       semester: course.forSemester,
//       instructor: course.profName?.[0] || "Not Assigned",
//       coordinator: course.courseCoordinator || "Not Assigned",
//       department: "General", // You might want to add department field to your schema
//       credits: course.credits,
//       timings:
//         course.schedule?.map((scheduleItem) => ({
//           day: scheduleItem.day,
//           time:
//             scheduleItem.start && scheduleItem.end
//               ? `${new Date(scheduleItem.start).toLocaleTimeString("en-US", {
//                   hour: "numeric",
//                   minute: "2-digit",
//                   hour12: true,
//                 })} - ${new Date(scheduleItem.end).toLocaleTimeString("en-US", {
//                   hour: "numeric",
//                   minute: "2-digit",
//                   hour12: true,
//                 })}`
//               : "Time TBD",
//           room: scheduleItem.room || "Room TBD",
//         })) || [],
//     }))

//     return NextResponse.json({
//       success: true,
//       courses: transformedCourses,
//     })
//   } catch (error) {
//     console.error("Error fetching courses:", error)
//     return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import Course from "@/models/Course.model" // Adjust the path to your Course model
import { connectDB } from "@/dbConnection/ConnectDB" // Adjust the path to your MongoDB connection

export async function GET() {
  try {
    await connectDB()

    // First get courses without population to get the raw count
    const courses = await Course.find({}).lean()

    // Use exact schema field names without transformation
    const coursesData = courses.map((course) => ({
      id: course._id.toString(),
      title: course.title,
      courseCode: course.courseCode,
      slots: course.slots || [],
      schedule: course.schedule || [],
      forSemester: course.forSemester,
      prof: course.prof || [],
      profName: course.profName || [],
      courseCoordinator: course.courseCoordinator || "Not Assigned",
      profEmail: course.profEmail || [],
      credits: course.credits,
      enrolledStudents: course.enrolledStudents || [],
      // Fix: Use the raw enrolledStudents array length (before population)
      enrolledStudentsCount: course.enrolledStudents ? course.enrolledStudents.length : 0,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      courses: coursesData,
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 })
  }
}

