import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDb } from "@/lib/db.connection";
import { catchError, response } from "@/lib/helperfunction";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { createUser } from "@/services/user.service";
import { SignJWT } from "jose";

export async function POST(req: Request) {
    try {
        // DB connect
        await connectDb();

        // body parse
        const body = await req.json();

        // service call
        const user = await createUser(body);

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const token = await new SignJWT({ userId: user._id, })
            .setIssuedAt()
            .setExpirationTime("1h")
            .setProtectedHeader({ alg: "HS256" })
            .sign(secret)

        await sendVerificationEmail("Verify Your Email", user.email, emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))

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