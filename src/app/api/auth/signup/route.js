import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendOTPEmail";
import { generateOTP } from "@/helpers/generateOTP";

export async function POST(request){
    await connectDB()

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
<<<<<<< HEAD
                ExistingUserByEmail.verifyOtp = verifycode
=======
                ExistingUserByEmail.verifyOtp = verifyOtp
>>>>>>> main
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
    }
}