import { connectDB } from "@/dbConnection/ConnectDB";
import Grid from "@/models/Grid.model";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Unable to connect to database",
            error:error,
        },{status:500});
    }
    try {
        const {grid,semester,year}=await req.json();
        if(!grid || !semester || !year){
            return NextResponse.json({
                success:false,
                message:"Invalid request, please provide all the necessary fields",
            },{status:400});
        }
        const newGrid=new Grid({
            year:year,
            semester:semester,
            grid:grid,
        })
        await newGrid.save();
        return NextResponse.json({
            success:true,
            message:"Grid created successfully",
            grid:newGrid,
        },{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Interval server error",
            error:error,
        },{status:500})
    }
}