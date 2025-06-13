import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connectDB } from "@/dbConnection/ConnectDB";
import{ sendVerificationEmail} from "@/helpers/sendOTPEmail";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.log("Error connecting to DB");
    return NextResponse.json(
      { message: "Error connecting to DB", success: false, error: error },
      { status: 500 }
    );
  }

<<<<<<< HEAD
  try {
    const { name, email, password, role } = await req.json();
    console.log(name,email,password,role);
    const existingUser = await User.findOne({ email: email });
    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { message: "User already exists.", success: false },
          { status: 400 }
        );
      } else {
        existingUser.password = password;
        existingUser.verifycode = verifycode;
        existingUser.verifycodeExpiry = new Date(Date.now() + 3600000);
      }
    } else {
      const newUser = new User({
        username: name,
        email: email,
        password: password,
        isVerified: false,
        verifyOtp: verifycode,
        verifyOtpExpiry: new Date(Date.now() + 3600000),
        role: role,
      });
      await newUser.save();
      // return NextResponse.json(
      //   { message: "User created successfully", success: true },
      //   { status: 200 }
      // );
=======
    try {
        const {username , email , password , role} = await request.json()
        const ExistingUserVerifiedByUsername = await User.findOne({
            username,
            isVerified:true,
        })
        if(ExistingUserVerifiedByUsername){
            return Response.json(
                {
                    success:false,
                    message:"Username is already taken",
                },
                {
                    status: 400
                }
            )
        }
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
                    username,
                    email,
                    password,
                    googleProvider:false,
                    verifyOtp,
                    verifyOtpExpiry:expiryDate,
                    isVerified : false,
                    role
            })
            await newUser.save()
        }

        // send verification email
        const EmailResponse = await sendVerificationEmail(email,username,verifyOtp)
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
>>>>>>> origin/main
    }
    const EmailResponse = await sendVerificationEmail(
      email,
      name,
      verifycode
    );
    if (!EmailResponse.success) {
      return NextResponse.json(
        {success: false, message: EmailResponse.message},
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true , message: "User Registered Successfully. Please Verify your email" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error registering user",
        success: false,
        error: error,
      },

      { status: 500 }
    );
  }
}