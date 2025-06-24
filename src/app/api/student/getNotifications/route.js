import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Notification from "@/models/Notification.model";

export async function POST(req){
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Unable to connect to Database",
            error:error,
        },{status:500});
    }
    try {
        const {studentEmail}=await req.json();
        if(!studentEmail) {
            return NextResponse.json({
                success:true,
                message:"Please provide the course ID",
            },{status:400});
        }
        const user=await User.findOne({email:studentEmail});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"No user found",
            },{status:404});
        }
        const student=await Student.findOne({userId:user._id});
        if(!student){
            return NextResponse.json({
                success:false,
                message:"No student found with the given Mail ID",
            },{status:404});
        }
        await student.populate("notifications");
        for(const item of student.notifications){
            if(item.type=="poll"){
                const n=await Notification.findById(item.message);
                item.message=n;
                await item.save();
            }
        }
        return NextResponse.json({
            success:true,
            message:"Student Notifications fetched successfully",
            student:student,
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