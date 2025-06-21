
import { connectDB } from "@/dbConnection/ConnectDB";
import Professor from "@/models/Professor.model";
import { NextRequest,NextResponse } from "next/server";
import Course from '@/models/Course.model';

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
        const {profId}=await req.json();
        if(!profId){
            return NextResponse.json({
                success:false,
                message:"Provide the prof ID for fetching the class data",
            })
        }
        const prof=await Professor.findById(profId);
        if(!prof){
            return NextResponse.json({
                success:false,
                message:"Professor does not exist with the given ID",
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
