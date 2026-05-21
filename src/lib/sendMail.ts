import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transportOptions: SMTPTransport.Options = {
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
};

const transporter = nodemailer.createTransport(transportOptions);

export const sendMail = async (subject: string, receiver: string, body: string) => {
    const mailOptions = {
        from: `Kroykori <${process.env.NODEMAILER_USER}>`,
        to: receiver,
        subject,
        html: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};