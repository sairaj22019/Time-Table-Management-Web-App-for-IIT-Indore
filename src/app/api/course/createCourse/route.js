import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import Professor from "@/models/Professor.model";
import Student from "@/models/Student.model";

async function addCourseToStudents(students, courseId, rollNumbers) {
  try {
    let s = [];

    // Step 1: Add students by department and year
    for (const department of students.departments) {
      const allStudents = await Student.find({
        department: department,
        year: students.year,
      });

      for (const student of allStudents) {
        if (!student.enrolledClasses.includes(courseId)) {
          student.enrolledClasses.push(courseId);
          await student.save();
          s.push(student._id);
        }
      }
    }

    // Step 2: Add students by roll number
    for (const rollno of rollNumbers) {
      const student = await Student.findOne({ rollno: rollno });

      if (student && !student.enrolledClasses.includes(courseId)) {
        student.enrolledClasses.push(courseId);
        await student.save();
        s.push(student._id);
      }
    }

    return s;
  } catch (error) {
    console.error("Error in addCourseToStudents:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in registering students",
      },
      {
        status: 401,
      }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to database",
        error: error,
      },
      { status: 500 }
    );
  }
  try {
    const {
      title,
      courseCode,
      slots,
      forSemester,
      studentYear,
      profName,
      courseCoordinator,
      profEmail,
      students,
      credits
    } = await req.json();
    if (
      !title ||
      !courseCode ||
      !slots ||
      !forSemester ||
      !studentYear ||
      !profName ||
      !courseCoordinator ||
      !profEmail ||
      !students ||
      !credits
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide all the necessary fields",
        },
        { status: 400 }
      );
    }
    const newCourse = new Course({
      title: title,
      courseCode: courseCode,
      slots: slots,
      forSemester:forSemester,
      studentYear:studentYear,
      profName: profName,
      courseCoordinator: courseCoordinator,
      profEmail: profEmail,
      prof: Array(profName.length),
      credits:credits,
    });
    for (let i = 0; i < profEmail.length; i++) {
      const user = await User.findOne({ email: profEmail[i] });

      if (user) {
        const prof = await Professor.findOne({ userId: user._id });
        if (!prof) {
          newCourse.prof[i] = null;
        } else {
          newCourse.prof[i] = prof._id;
        }
      }
    }
    await newCourse.save();
    newCourse.enrolledStudents = await addCourseToStudents(
      students,
      newCourse._id,
      students.rollnos
    );
    for (const profid of newCourse.prof) {
      const prof = await Professor.findById(profid);
      if (!prof) continue;
      prof.teachingClasses.push(newCourse._id);
      await prof.save();
    }
    await newCourse.save();
    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        course: newCourse,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error,
      },
      { status: 500 }
    );
  }
}
