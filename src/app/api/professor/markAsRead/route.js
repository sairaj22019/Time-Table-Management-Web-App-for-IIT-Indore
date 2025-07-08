import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import Professor from "@/models/Professor.model";
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
    const { profEmail, notificationList } = await req.json();
    console.log(typeof notificationList)
    console.log(profEmail,notificationList);
    if (!profEmail || !notificationList) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide all the necessary fields",
        },
        { status: 400 }
      );
    }
    const userObject=await User.findOne({email:profEmail});
    const professor = await Professor.findOne({userId:userObject._id });
    if (!professor) {
      return NextResponse.json(
        {
          success: false,
          message: "professor not found",
        },
        { status: 404 }
      );
    }

    
      let index=-1;
      for(let i=0;i<professor.notifications.length;i++){
        if(professor.notifications[i]){
          if(professor.notifications[i].notification){
            console.log(professor.notifications[i].notification,professor.notifications[i].isRead)
            if(notificationList==professor.notifications[i]._id.toString()){
              index=2;
              professor.notifications[i].isRead=true;
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
    

    await professor.save();

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
