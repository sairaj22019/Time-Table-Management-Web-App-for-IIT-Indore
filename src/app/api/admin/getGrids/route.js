import { connectDB } from "@/dbConnection/ConnectDB";
import Grid from "@/models/Grid.model";
import { NextResponse,NextRequest } from "next/server";

export async function GET(req){
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Error connecting to database",
            error:error
        },{status:500})
    }
    try {
        const allGrids=await Grid.find({})
        return NextResponse.json({
            success:true,
            message:"All grids fetched successfully",
            grids:allGrids
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal server error",
            error:error
        },{status:500})
    }
}