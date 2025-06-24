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


