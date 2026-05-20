import { connectDb } from "@/lib/db.connection";
import { response } from "@/lib/helperfunction";
import UserModel from "@/models/user.model";
import { jwtVerify } from "jose";

export async function POST(request: Request) {
    try {
        await connectDb();

        const { token } = await request.json();

        if (!token) {
            return response({
                success: false,
                message: "Invalid token",
                statusCode: 400,
            });
        }

        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        );

        const decoded = await jwtVerify(token, secret);

        const userId = decoded.payload.userId;

        const verifiedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                isEmailVerified: true,
            },
            {
                new: true,
            }
        );

        // user not found
        if (!verifiedUser) {
            return response({
                success: false,
                message: "User not found",
                statusCode: 404,
            });
        }

        return response({
            success: true,
            message: "Email verification successful",
            statusCode: 200,
            data: verifiedUser,
        });

    } catch (error: any) {
        return response({
            success: false,
            message: error.message || "Something went wrong",
            statusCode: 500,
        });
    }
}