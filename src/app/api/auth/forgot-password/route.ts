import { otpVerificationEmail } from "@/email/otpVerificationEmail";
import { connectDb } from "@/lib/db.connection";
import { catchError, generateOtp, response } from "@/lib/helperfunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zod.schema";
import OtpModel from "@/models/otp.model";
import UserModel from "@/models/user.model";

export async function POST(request: Request) {
    try {
        await connectDb()
        const payload = await request.json();

        const validationSchema = zSchema.pick({ email: true })
        const validationData = validationSchema.safeParse({ email: payload.email })

        // if data is not valid
        if (!validationData.success) {
            return response({
                success: false,
                message: "Invalid or missing input feild",
                statusCode: 401
            })
        }
        const { email } = validationData.data

        const user = await UserModel.findOne({ email })

        //if user not found with the email
        if (!user) {
            return response({
                success: false,
                message: "User with this email does not exist",
                statusCode: 404
            })
        }

        // Delete existing OTPs for the email
        await OtpModel.deleteMany({ email })
        // generate new otp and save to database
        const otp = generateOtp()
        await OtpModel.create({ email, otp })

        const otpSendStatus = await sendMail("Password Reset OTP For KroyKori", email, otpVerificationEmail(otp))

        // if otp sending failed 
        if (!otpSendStatus.success) {
            return response({
                success: false,
                message: "Failed to send OTP email",
                statusCode: 500
            })
        }


        return response({
            success: true,
            message: "OTP sent to your email",
            statusCode: 200
        })
    } catch (error: any) {
        return catchError(error, "Faild to send otp")
    }
}
