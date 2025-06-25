import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connectDB } from "@/dbConnection/ConnectDB";
import{ sendVerificationEmail} from "@/helpers/sendOTPEmail";
import { generateOTP } from "@/helpers/generateOTP";
export async function POST(request){
    await connectDB()

    try {
        const {email , password} = await request.json()

        const ExistingUserByEmail = await User.findOne({email})
        const verifyOtp = generateOTP();

        if(ExistingUserByEmail){
            if(ExistingUserByEmail.isVerified){
                return Response.json({
                    success : false,
                    message : "User already exists with this email",
                },{status:400})
            }else{
                ExistingUserByEmail.password = password
                ExistingUserByEmail.verifyOtp = verifyOtp
                ExistingUserByEmail.verifyOtpExpiry = new Date(Date.now() + 3600000)
                await ExistingUserByEmail.save()
            }
        }else{
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)

            const newUser = new User({
                    email,
                    password,
                    googleProvider:false,
                    verifyOtp,
                    verifyOtpExpiry:expiryDate,
                    isVerified : false,
            })
            await newUser.save()
        }

        // send verification email
        const EmailResponse = await sendVerificationEmail(email,verifyOtp)
        if(!EmailResponse.success){
            return Response.json({
                success : false,
                message : EmailResponse.message,
            },{status:500})
        }

        return Response.json({
                success : true,
                message : "User Registered Successfully. Please Verify your email",
            },{status:201})

    } catch (error) {
        console.error("Error registering user" , error)
        return Response.json(
            {
                success : false,
                message : "Error registering user"
            },
            {
                status:500
            }
        )
    }
}