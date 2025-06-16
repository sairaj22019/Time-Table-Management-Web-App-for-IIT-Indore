import { connectDB } from "@/dbConnection/ConnectDB";
import { NextRequest,NextResponse } from "next/server";
import { FcSalesPerformance } from "react-icons/fc";
import { _success } from "zod/v4/core";

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
        // const {day}
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Internal server error",
            error:error,
        })
    }
}