import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import Professor from "@/models/Professor.model";
import Student from "@/models/Student.model";
import Grid from "@/models/Grid.model";

function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;

  // Set a fixed date: Jan 1, 2000
  const fixedDate = new Date(2000, 0, 1, hours, minutes, 0, 0);
  //                year, month (0-indexed), day, hr, min, sec, ms

  return fixedDate;
}

function getDay(i) {
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i];
}

function getStart(j){
  return saveTime(["8:30:am","9:30:am","10:30:am","11:30:am","12:30:pm","1:30:pm","2:30:pm","3:30:pm","4:30:pm","5:30:pm"][j]);
}
function getEnd(j){
  return saveTime(["9:30:am","10:30:am","11:30:am","12:30:pm","1:30:pm","2:30:pm","3:30:pm","4:30:pm","5:30:pm","6:30:pm"][j]);
}
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
      lectures,
      tutorials,
      practicals,
      room,
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
      !lectures ||
      !room ||
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
      schedule:new Array,
      forSemester:forSemester,
      studentYear:studentYear,
      lectures:lectures,
      tutorials:tutorials,
      practicals:practicals,
      room:room,
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
    //This will be the space to insert the schedule day wise slots into the course data.
    const allGrids=await Grid.find({});
    for(const grid of allGrids){
      console.log(grid.year,grid.semester);
    }
    console.log(forSemester,studentYear,typeof studentYear);
      const courseGrid=await Grid.findOne({year:String(studentYear),semester:(forSemester)});
    if(!courseGrid){
      return NextResponse.json({
        success:false,
        message:"Course grid is not yet made",
      },{status:404});
    }
    const matchingSlots=new Array;
    for(let i=0;i<courseGrid.grid.length;i++){
      for(let j=0;j<courseGrid.grid[i].length;j++){
        if(slots.includes(courseGrid.grid[i][j].slot)){
          const day=getDay(i);
          const start=getStart(j);
          const end=getEnd(j);
          const newTiming={
            start:start,
            end:end,
            day:day,
            room:room
          }
          matchingSlots.push(newTiming);
        }
      }
    }
    // console.log(matchingSlots);
    newCourse.schedule=matchingSlots;
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
