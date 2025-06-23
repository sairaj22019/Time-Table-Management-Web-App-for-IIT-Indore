import { connectDB } from "@/dbConnection/ConnectDB";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import Student from "@/models/Student.model";
import Course from "@/models/Course.model";

export async function POST(req) {
    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error connecting to database",
            error: error.message,
        }, { status: 500 });
    }

    try {
        const { studentEmail } = await req.json();

        if (!studentEmail) {
            return NextResponse.json({
                success: false,
                message: "Student email is required",
            }, { status: 400 });
        }

        const user = await User.findOne({ email: studentEmail });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid email address provided",
            }, { status: 404 });
        }

        const student = await Student.findOne({ userId: user._id });
        if (!student) {
            return NextResponse.json({
                success: false,
                message: "Student with the given email does not exist",
            }, { status: 404 });
        }

        await student.populate("enrolledClasses");

        return NextResponse.json({
            success: true,
            message: "Student data fetched successfully",
            courses: student.enrolledClasses,
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching student data",
            error: error.message,
        }, { status: 500 });
    }
}
