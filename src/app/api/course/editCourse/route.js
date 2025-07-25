
import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";
import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Professor from "@/models/Professor.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;

  return new Date(2000, 0, 1, hours, minutes, 0, 0);
}

export async function POST(req) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const {
      id,
      title,
      courseCode,
      slots,
      lectures,
      tutorials,
      practicals,
      forSemester,
      profName,
      courseCoordinator,
      profEmail,
      students,
      credits,
      schedule,
    } = reqBody;

    const editedCourse = await Course.findById(id);
    if (!editedCourse) {
      return NextResponse.json(
        {
          success: false,
          message: "Course with the given ID does not exist",
        },
        { status: 400 }
      );
    }

    // Convert and update schedule
    if (schedule) {
      for (let i = 0; i < schedule.length; i++) {
        schedule[i].start = saveTime(schedule[i].start);
        schedule[i].end = saveTime(schedule[i].end);
      }
      editedCourse.schedule = schedule;
    }

    // Update only changed fields
    const fieldsToUpdate = [
      "title",
      "courseCode",
      "slots",
      "forSemester",
      "lectures",
      "tutorials",
      "practicals",
      "profName",
      "courseCoordinator",
      "profEmail",
      "credits",
    ];

    for (const field of fieldsToUpdate) {
      if (reqBody[field] && JSON.stringify(reqBody[field]) !== JSON.stringify(editedCourse[field])) {
        editedCourse[field] = reqBody[field];
      }
    }

    // Recalculate prof references
    editedCourse.prof = Array(profEmail.length);
    for (let i = 0; i < profEmail.length; i++) {
      const user = await User.findOne({ email: profEmail[i] });
      if (user) {
        const prof = await Professor.findOne({ userId: user._id });
        editedCourse.prof[i] = prof ? prof._id : null;
      } else {
        editedCourse.prof[i] = null;
      }
    }

    // Handle student updates
    const oldEnrolled = editedCourse.enrolledStudents.map(id => id.toString());
    const newEnrolled = new Set();

    // Dept + year based
    for (const dept of students.departments) {
      const deptStudents = await Student.find({
        department: dept,
        year: students.year,
      }).select('_id');
      deptStudents.forEach(s => newEnrolled.add(s._id.toString()));
    }

    // Roll number based
    for (const roll of students.rollnos) {
      const s = await Student.findOne({ rollno: roll }).select('_id');
      if (s) newEnrolled.add(s._id.toString());
    }

    // Remove course from students no longer enrolled
    const toRemove = oldEnrolled.filter(id => !newEnrolled.has(id));
    await Student.updateMany(
      { _id: { $in: toRemove } },
      { $pull: { enrolledClasses: editedCourse._id } }
    );

    // Add course to new students
    const toAdd = Array.from(newEnrolled).filter(id => !oldEnrolled.includes(id));
    await Student.updateMany(
      { _id: { $in: toAdd } },
      { $push: { enrolledClasses: editedCourse._id } }
    );

    // Update enrolledStudents field in course
    editedCourse.enrolledStudents = Array.from(newEnrolled);

    await editedCourse.save();

    return NextResponse.json(
      {
        success: true,
        message: "Course edited successfully",
        course: editedCourse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}