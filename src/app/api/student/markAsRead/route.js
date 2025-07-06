import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import Student from "@/models/Student.model";
import  User  from "@/models/User.model";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
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
    const { studentEmail, notificationList } = await req.json();
    console.log(typeof notificationList)
    console.log(studentEmail,notificationList);
    if (!studentEmail || !notificationList) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide all the necessary fields",
        },
        { status: 400 }
      );
    }
    const userObject=await User.findOne({email:studentEmail});
    const student = await Student.findOne({userId:userObject._id });
    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    
      let index=-1;
      for(let i=0;i<student.notifications.length;i++){
        if(student.notifications[i]){
          if(student.notifications[i].notification){
            console.log(student.notifications[i].notification,student.notifications[i].isRead)
            if(notificationList==student.notifications[i]._id.toString()){
              index=2;
              student.notifications[i].isRead=true;
              break;
            }
          }
        }
      }
      if(index===-1){
        return NextResponse.json({
          success:false,
          message:"Error marking the message as read"
        })
      }
    

    await student.save();

    return NextResponse.json({
      success: true,
      message: "Marked notifications as read",
    }, { status: 200 });

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
