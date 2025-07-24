
import { connectDB } from "@/dbConnection/ConnectDB";
import Professor from "@/models/Professor.model";
import { NextRequest,NextResponse } from "next/server";
import Course from '@/models/Course.model';
import User from "@/models/User.model";
import Grid from "@/models/Grid.model";
import SendMessagePage from "@/app/professor/sendMessage/page";

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
        const currentSem=prof?.teachingClasses[0]?.forSemester || "";
        const gridOfTheSemester=await Grid.findOne({semester:currentSem});
        let lunchBreakSlot
        if(!gridOfTheSemester) lunchBreakSlot = 4;
        else{
            if(gridOfTheSemester.grid[0][4].slot=="LB"){
                lunchBreakSlot=4
            }else{
                lunchBreakSlot=5
            }
        }
        
        return NextResponse.json({
            success:true,
            message:"Courses fetched successfully",
            data:prof.teachingClasses,
            lunchBreakSlot:lunchBreakSlot,
            currentSem:currentSem,
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