import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";
import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";
import Student from "@/models/Student.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(':');
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  if (meridian === 'pm' && hours !== 12) hours += 12;
  if (meridian === 'am' && hours === 12) hours = 0;

  // Set a fixed date: Jan 1, 2000
  const fixedDate = new Date(2000, 0, 1, hours, minutes, 0, 0); 
  //                year, month (0-indexed), day, hr, min, sec, ms

  return fixedDate;
}

async function addCourseToStudents(students, courseId, rollNumbers) {
  const allStudentIds = new Set();

  // Step 1: By department + year
  for (let i = 0; i < students.departments.length; i++) {
    const dept = students.departments[i];
    const year = students.year;

    try {
      const updatedStudents = await Student.find({
        department: dept,
        year: year,
        enrolledClasses: { $ne: courseId },
      });

      const ids = updatedStudents.map((s) => s._id);
      ids.forEach(id => allStudentIds.add(id));

      await Student.updateMany(
        { _id: { $in: ids } },
        { $push: { enrolledClasses: courseId } }
      );
    } catch (err) {
      console.error(`Error updating department ${dept} (year ${year}):`, err);
    }
  }

  // Step 2: By roll numbers
  for (let i = 0; i < rollNumbers.length; i++) {
    const roll = rollNumbers[i];
    try {
      const student = await Student.findOne({
        rollno: roll,
        enrolledClasses: { $ne: courseId },
      });

      if (student) {
        allStudentIds.add(student._id);
        await Student.updateOne(
          { _id: student._id },
          { $push: { enrolledClasses: courseId } }
        );
      }
    } catch (err) {
      console.error(`Error updating roll number ${roll}:`, err);
    }
  }

  // Step 3: Push all collected student IDs into the Course.enrolledStudents
try {
  await Course.updateOne(
    { _id: courseId },
    {
      $addToSet: {
        enrolledStudents: { $each: Array.from(allStudentIds) },
      },
    }
  );
} catch (err) {
  console.error("Error updating course with enrolled students:", err);
}

}

export async function POST(req) {
  try {
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
        {
          status: 500,
        }
      );
    }
    try {
      //Here i am only giving option to edit schedule room that's it;
      const { id, schedule, students, profName, profEmail} = await req.json();

      for (let i = 0; i < schedule.length; i++) {
        schedule[i].start = saveTime(schedule[i].start);
        schedule[i].end = saveTime(schedule[i].end);
        schedule[i].day = schedule[i].day;
      }
      const editedCourse=await Course.findById(id);
      if(!editedCourse){
        return NextResponse.json({
            success:false,
            message:"Course with the given ID does not exist",
        },{
            status: 400,
        })
      }
      editedCourse.schedule=schedule;
      editedCourse.prof=Array(profName.length);
      for(let i=0;i<profEmail.length;i++){

      const user = await User.findOne({ email: profEmail });
  
      if (user) {
        const prof= await Professor.findOne({ userId: user._id });
        if (!prof) {
          editedCourse.prof[i] = null;
        } else {
          editedCourse.prof[i] = prof._id;
        }
      } 
    }
    await addCourseToStudents(students,editedCourse._id,students.rollnos);
      
      return NextResponse.json({
        success:true,
        message:"Course edited successfully",
        course:editedCourse
      },{
        status:200,
      })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server error",
        },{
            status:500,
        })
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
