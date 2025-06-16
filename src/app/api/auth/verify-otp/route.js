import { connectDB } from "@/dbConnection/ConnectDB";
import User from "@/models/User.model";

export async function POST(request) {
  await connectDB();
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return Response.json(
        {
          success: false,
          message: "Email and OTP are required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "User is already verified",
        },
        { status: 400 }
      );
    }

    if (
      user.verifyOtp !== otp ||
      !user.verifyOtpExpiry ||
      new Date() > user.verifyOtpExpiry
    ) {
      return Response.json(
        {
          success: false,
          message: "Invalid or expired OTP",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyOtp = undefined;
    user.verifyOtpExpiry = undefined;

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Email verified successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying OTP",
      },
      { status: 500 }
    );
  }
}
