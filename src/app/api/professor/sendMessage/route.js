import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Notification from "@/models/Notification.model";
import { NextResponse } from "next/server";
import Student from "@/models/Student.model";

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
        const {courseId,message}=await req.json();
        if(!courseId || !message) {
            return NextResponse.json({
                success:false,
                message:"Please send the necessary fields",
            },{status:400});
        }
        const course =await Course.findById(courseId);
        if(!course){
            return NextResponse.json({
                success:false,
                message:"Course with the given ID does not exist",
            },{status:404});
        }
        const newNotification=new Notification({
            message:message,
            type:"general message",
        })
        await newNotification.save();
        await course.populate("enrolledStudents");
        for(const student of course.enrolledStudents){
            student.notifications.push(newNotification._id);
            await student.save();
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