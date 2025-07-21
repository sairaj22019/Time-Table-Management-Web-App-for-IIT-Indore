// import { connectDB } from "@/dbConnection/ConnectDB";
// import { NextResponse } from "next/server";
// import User from "@/models/User.model";
// import Student from "@/models/Student.model";
// import Notification from "@/models/Notification.model";
// import Professor from "@/models/Professor.model";
// import Course from "@/models/Course.model";
// import Poll from "@/models/Polls.model"
// export async function POST(req) {
//   try {
//     await connectDB();
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       message: "Unable to connect to Database",
//       error: error,
//     }, { status: 500 });
//   }

//   try {
//     const { studentEmail } = await req.json();
//     if (!studentEmail) {
//       return NextResponse.json({
//         success: false,
//         message: "Please provide the student email",
//       }, { status: 400 });
//     }

//     const user = await User.findOne({ email: studentEmail });
//     if (!user) {
//       return NextResponse.json({
//         success: false,
//         message: "No user found",
//       }, { status: 404 });
//     }
//     console.log("userrrrrrr" , user)

//     const student = await Student.findOne({ userId: user._id });

//     if (!student) {
//       return NextResponse.json({
//         success: false,
//         message: "No student found with the given Mail ID",
//       }, { status: 404 });
//     }

//     console.log("studenttttttttt" , student)


//     // Optionally, populate 'message' if notification type is 'poll'
//     for (const item of student.notifications) {
//       const notif = item.notification;
//       console.log("notiffffffffff",notif)
//       if (notif && notif.type === "poll") {
//         await notif.populate({path:"message",model:"Poll"}); // populate poll object into `message`
//       }
//       if(notif){
//         await notif.populate({path:"prof",model:"Professor"});
//         const userId=notif.prof.userId;
//         // console.log("userId", userId)
//         const user=await User.findById(userId);
//         // console.log("user" , user)
//         // console.log("notif",notif)
//         if(user){
//           notif.prof=user;
//         }
//         // console.log("notif2",notif)
//         await notif.populate({path:"course",model:"Course"});

//         // console.log("notification",notif)
//       }

//     }
    

//     return NextResponse.json({
//       success: true,
//       message: "Student notifications fetched successfully",
//       student: student.notifications,
//     }, { status: 200 });

//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: "Internal server error",
//       error: error,
//     }, { status: 500 });
//   }
// }



import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Notification from "@/models/Notification.model";
import Professor from "@/models/Professor.model";
import Course from "@/models/Course.model";
import Poll from "@/models/Polls.model"
// import { no } from "zod/dist/types/v4/locales";
export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Unable to connect to Database",
      error: error,
    }, { status: 500 });
  }

  try {
    const { studentEmail } = await req.json();
    // console.log(studentEmail);
    if (!studentEmail) {
      return NextResponse.json({
        success: false,
        message: "Please provide the student email",
      }, { status: 400 });
    }

    const user = await User.findOne({ email: studentEmail });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "No user found",
      }, { status: 404 });
    }
    // console.log(user)
    const student = await Student.findOne({ userId: user._id })
      .populate({
        path: "notifications.notification",
        model: "Notification"
      });
      console.log(student)
    if (!student) {
      return NextResponse.json({
        success: false,
        message: "No student found with the given Mail ID",
      }, { status: 404 });
    }

    // Optionally, populate 'message' if notification type is 'poll'
    for (const item of student.notifications) {
      const notif = item.notification;
      if (notif && notif.type === "poll") {
        // await notif.populate({path:"message",model:"Poll"}); // populate poll object into `message`
        notif.message=await Poll.findOne({_id:notif.message});
        // console.log(notif.message)
      }
      if(notif!=null){
        // await notif.populate({path:"prof",model:"Professor"});
        if(notif.prof!=null){
          notif.prof=await Professor.findOne({_id:notif.prof});
          const userId=notif.prof.userId;
          const user=await User.findById(userId);
          notif.prof=user;
        }
        // await notif.populate({path:"course",model:"Course"});
        if(notif.course!=null){
          notif.course=await Course.findOne({_id:notif.course});
        }
      }

    }
    

    return NextResponse.json({
      success: true,
      message: "Student notifications fetched successfully",
      student: student.notifications,
    }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error,
    }, { status: 500 });
  }
}
