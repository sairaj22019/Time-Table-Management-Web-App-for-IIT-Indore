import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Notification from "@/models/Notification.model";
import { NextResponse } from "next/server";
import Student from "@/models/Student.model";
import Professor from "@/models/Professor.model";
import User from "@/models/User.model";

export async function POST(req){
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Unable to connect to database",
            error:error,
        },{status:500});
    }
    try {
        const {courseId,profEmail,message}=await req.json();
        if(!courseId || !message || !profEmail) {
            return NextResponse.json({
                success:false,
                message:"Please send the necessary fields",
            },{status:400});
        }
        const course = await Course.findById(courseId);
        if(!course){
            return NextResponse.json({
                success:false,
                message:"Course with the given ID does not exist",
            },{status:404});
        }
        const userObject=await User.findOne({email:profEmail})
        const profObject=await Professor.findOne({userId:userObject._id});
        const newNotification=new Notification({
            message:message,
            prof:profObject._id,
            type:"general message",
            course:courseId,
        })
        await newNotification.save();
        await course.populate("enrolledStudents");
        for(const student of course.enrolledStudents){
            student.notifications.push({notification:newNotification._id,isRead:false});
            await student.save();
        }
        await course.populate("prof");
        for(const prof of course.prof){
            prof.notifications.push({notification:newNotification._id,isRead:false});
            await prof.save();
        }
        return NextResponse.json({
            success:true,
            message:"Message sent successfully",
            notification:newNotification,
            course:course,
        },{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server error",
            error:error,
        },{status:500});
    }
}