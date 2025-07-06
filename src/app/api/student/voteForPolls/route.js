import { connectDB } from "@/dbConnection/ConnectDB";
import Notification from "@/models/Notification.model";
import Poll from "@/models/Polls.model";
import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to Database",
        error: error,
      },
      { status: 500 }
    );
  }
  try {
    const { option, notificationId, userEmail } = await req.json();
    if (!option || !notificationId || !userEmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Atleast one option must be selected (or) the notification ID is not provided",
        },
        { status: 400 }
      );
    }
    const userObject = await User.findOne({ email: userEmail });
    const studentObject=await Student.findOne({userId:userObject._id});
    if (!studentObject) {
      return NextResponse.json(
        {
          success: false,
          message: "Student is not found",
        },
        { status: 404 }
      );
    }
    let notificationToBeUsed;
    let index=-1;
    for(let i=0;i<studentObject.notifications.length;i++){
        if(studentObject.notifications[i]){
          if(studentObject.notifications[i].notification){
            console.log(studentObject.notifications[i].notification,studentObject.notifications[i].isRead)
            if(notificationId==studentObject.notifications[i]._id.toString()){
              index=2;
              notificationToBeUsed=studentObject.notifications[i].notification;
              break;
            }
          }
        }
      }
    const notification=await Notification.findById(notificationToBeUsed);
    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid notification ID",
        },
        { status: 404 }
      );
    }
    if (notification.type !== "poll") {
      return NextResponse.json(
        {
          success: false,
          message: "U should not hit API endpoints as you wish mannn",
        },
        { status: 400 }
      );
    }
    const poll = await Poll.findById(notification.message);
    if (!poll) {
      return NextResponse.json(
        {
          success: false,
          message: "Poll not found",
        },
        { status: 404 }
      );
    }
    for(let i=0;i<poll.votes.length;i++){
        if(poll.votes[i].voter.toString()==studentObject._id){
            poll.votes.splice(i,1);
            break;
        }
    }
    //I am avoiding the check of the userId cause i know they will be verified by the frontnend sessions.
    //I am also avoiding the check of user option cause i know that the frontend will not allow any funny business with the option selection.
    poll.votes.push({ option, time: new Date(), voter: studentObject._id });
    //THis will store the ID of the student who voted in for the poll;
    await poll.save();
    return NextResponse.json(
      {
        success: true,
        message: "Vote casted successfully",
        poll:poll,
      },
      { status: 200 }
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
