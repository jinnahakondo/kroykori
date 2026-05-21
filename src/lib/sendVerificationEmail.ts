import { emailVerificationLink } from "@/email/emailVerificationLink";
import { generateToken } from "./generateToken";
import { sendMail } from "./sendMail";



type SendVerificationProps = {
    userId: string;
    email: string;
};

export const sendVerificationEmail = async ({
    userId,
    email,
}: SendVerificationProps) => {
    const token = await generateToken({
        payload: {
            userId,
        },
        expiresIn: "1h",
    });

    const verificationUrl =
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`;

    await sendMail(
        "Verify Your Email",
        email,
        emailVerificationLink(verificationUrl)
    );

    return token;
};