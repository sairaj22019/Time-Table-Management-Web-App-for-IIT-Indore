import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Notification from "@/models/Notification.model";
import Poll from "@/models/Polls.model";
import Professor from "@/models/Professor.model";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import { NextRequest,NextResponse } from "next/server";
async function addPollToProfessor(newPoll,newNotificationId) {
    try {
        const prof=await Professor.findById(newPoll.prof);
        prof.activePolls.push(newPoll._id);
        prof.notifications.push(newNotificationId);
        prof.save();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function addPollToStudents(newPoll,newNotificationId){
    try {
        const course=await Course.findById(newPoll.course).populate("enrolledStudents");
        for(const student of course.enrolledStudents){
            student.notifications.push(newNotificationId);
            student.save();
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
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

export async function POST(req){
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Error connecting to database",
            error:error,
        })
    }
    try {
        const {options,course,profEmail,reason,context}=await req.json();
        if(!options || !course || !profEmail || !reason || !context){
            return NextResponse.json({
                success:false,
                message:"Please provide all the necessay fields",
            },{status:400});
        }
        const newPoll= new Poll({
            options:new Array(options.length),
            course:null,
            prof:null,
            reason:reason,
            context:context,
        })
        for(const option of options){
            option.start=saveTime(option.start);
            option.end=saveTime(option.end);
            option.day=option.day;
            option.date=option.date;//Send this to me as a Javascript date object
            option.room=option.room;
            newPoll.options.push(option);
        }
        const findUser=await User.findOne({email:profEmail});
        const findProf=await Professor.findOne({userId:findUser._id})
        if(findProf){
            newPoll.prof=findProf._id;
        }else{
            return NextResponse.json({
                success:false,
                message:"Unauthorised professor cannt create polls",
            },{status:404})
        }
        const findCourse=await Course.findOne({courseCode:course});
        if(!findCourse){
            return NextResponse.json({
                success:false,
                message:"Course with the given code does not exist",
            },{status:400});
        }else{
            newPoll.course=findCourse._id;
        }
        await newPoll.save();
         const newNotification=new Notification({
            message:newPoll._id,
            type:"poll",
        })
        await newNotification.save();
        addPollToProfessor(newPoll,newNotification._id);
        addPollToStudents(newPoll,newNotification._id);
        return NextResponse.json({
            success:true,
            message:"Poll created successfully",
            poll:newPoll
        },{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server error",
            error:error,
        })
    }
}