import { connectDB } from "@/dbConnection/ConnectDB";
import Professor from "@/models/Professor.model";
import { NextRequest,NextResponse } from "next/server";
import Course from '@/models/Course.model';
import User from "@/models/User.model";

export async function POST(req){
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Error connecting to database",
            error:error,
        });
    }
    try {
        const {profEmail}=await req.json();
        const user=await User.findOne({email:profEmail});
         if(!user){
            return NextResponse.json({
                success:false,
                message:"Professor does not exist with the given Mail ID",
            })
        }
        const prof=await Professor.findOne({userId:user._id});
        if(!prof){
            return NextResponse.json({
                success:false,
                message:"Professor does not exist with the given Mail ID",
            })
        }
        await prof.populate('teachingClasses');
        return NextResponse.json({
            success:true,
            message:"Courses fetched successfully",
            data:prof.teachingClasses,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server error",
            error:error,
        })
    }
} 

