import { connectDb } from "@/lib/db.connection";
import { response } from "@/lib/helperfunction";
import { zSchema } from "@/lib/zod.schema";
import OtpModel from "@/models/otp.model";



export async function POST(request: Request) {
    try {
        await connectDb();
        const payload = await request.json();

        const validationSchema = zSchema.pick({
            email: true,
            otp: true,
        })

        const validateData = validationSchema.safeParse(payload)

        if (!validateData.success) {
            return response({
                success: false,
                message: "Invalid data",
                statusCode: 400,
                error: validateData.error,
            });
        }

        const { email, otp } = validateData.data;

        const getOtpData = await OtpModel.findOne({ email, otp })
        if (!getOtpData) {
            return response({
                success: false,
                message: "Invalid Or Expired OTP",
                statusCode: 404,
            });
        }

        return response({
            success: true,
            message: "OTP verified successfully",
            statusCode: 200,
        })


    } catch (error: any) {
        return response({
            success: false,
            message: error.message || "Something went wrong",
            statusCode: 500,
        });
    }
}