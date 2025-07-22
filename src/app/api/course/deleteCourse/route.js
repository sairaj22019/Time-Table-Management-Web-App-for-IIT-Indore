import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";
import { connectDB } from "@/dbConnection/ConnectDB";
import Student from "@/models/Student.model";
import Professor from "@/models/Professor.model";
import Notification from "@/models/Notification.model";
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
      const { id } = await req.json();
      if (!id) {
        return NextResponse.json(
          {
            success: false,
            message: "Provide the ID of the course to be deleted",
          },
          {
            status: 400,
          }
        );
      }
      await Notification.deleteMany({ course: id });
      const deletedCourse = await Course.findByIdAndDelete(id);
      if (!deletedCourse) {
        return NextResponse.json(
          {
            success: false,
            message:
              "No course exists with the given ID, please try again later",
          },
          {
            status: 400,
          }
        );
      }
      for(const student of deletedCourse.enrolledStudents){
        const s=await Student.findById(student);
        if(!s){
          continue;
        }else{
          const index=s.enrolledClasses.indexOf(deletedCourse._id);
          s.enrolledClasses.splice(index,1);
        }
        await s.save();
      }
      for(const prof of deletedCourse.prof){
        const p=await Professor.findById(prof);
        if(!p){
          continue;
        }else{
          const index=p.teachingClasses.indexOf(deletedCourse._id);
          p.teachingClasses.splice(index,1);
        }
        p.save();
      }
      

      return NextResponse.json(
        {
          success: true,
          message: "Course deleted successfully",
          data: deletedCourse,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to delete course",
          error: error,
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: error,
        message: "Internal server error unable to delete Course",
      },
      {
        status: 500,
      }
    );
  }
}
