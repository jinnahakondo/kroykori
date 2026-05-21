import { connectDb } from "@/lib/db.connection";
import { catchError, response } from "@/lib/helperfunction";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { createUser } from "@/services/user.service";


export async function POST(req: Request) {
    try {
        // DB connect
        await connectDb();

        // body parse
        const body = await req.json();

        // service call
        const user = await createUser(body);

        await sendVerificationEmail({
            userId: String(user._id),
            email: user.email
        })

        return response({
            success: true,
            message: "Registration successful. Please check your email to verify your account.",
            statusCode: 201,
            data: user,
        });

    } catch (error: any) {
        return catchError(error, "Failed to create user");
    }
}