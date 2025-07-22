import {resend} from '@/lib/resendEmail'
import VerificationEmail from '../../emails/VerificationEmail';

export async function sendVerificationEmail(email,verifyCode){
    try {
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: "svarshithreddy9121@gmail.com",
        subject: 'verification Code',
        react: VerificationEmail({otp:verifyCode}),
        });
        return {success:true,message:"Verification email send successfully"}
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success:false,message:"failed to send verification email"}

    }
}
