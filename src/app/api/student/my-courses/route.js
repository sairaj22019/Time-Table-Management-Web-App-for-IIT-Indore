import { connectDB } from "@/dbConnection/ConnectDB";
import Student from "@/models/Student.model";
import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Course.model";

export async function POST(req) {
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error connecting to database",
            error: error,
        }, { status: 500 });
    }

    try {
        const { studentId } = await req.json();

        if (!studentId) {
            return NextResponse.json({
                success: false,
                message: "Provide the student ID for fetching the class data",
            }, { status: 400 });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return NextResponse.json({
                success: false,
                message: "Student does not exist with the given ID",
            }, { status: 400 });
        }

        await student.populate('enrolledClasses');

        console.log("classes", student.enrolledClasses);

        return NextResponse.json({
            success: true,
            message: "Enrolled courses fetched successfully",
            data: student.enrolledClasses,
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error,
        }, { status: 500 });
    }
}