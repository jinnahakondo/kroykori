export const otpVerificationEmail = (otp: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; color: #333333;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f9fc; padding: 40px 20px;">
            <tr>
                <td align="center">
                    
                    <!-- Main Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">

                        <!-- Header -->
                        <tr>
                            <td style="background-color: #1a73e8; padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">
                                    Kroykori
                                </h1>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding: 40px 30px;">

                                <h2 style="margin: 0 0 16px 0; color: #111111; font-size: 22px; font-weight: 600;">
                                    Verify your account
                                </h2>

                                <p style="margin: 0 0 24px 0; color: #5f6368; font-size: 16px; line-height: 1.6;">
                                    Use the OTP code below to verify your email address and complete your account setup. This code will expire in 10 minutes.
                                </p>

                                <!-- OTP Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                                    <tr>
                                        <td align="center">
                                            <div style="
                                                display: inline-block;
                                                background-color: #f1f3f4;
                                                padding: 18px 32px;
                                                border-radius: 10px;
                                                font-size: 32px;
                                                font-weight: 700;
                                                letter-spacing: 8px;
                                                color: #1a73e8;
                                            ">
                                                ${otp}
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 12px 0; color: #5f6368; font-size: 14px; line-height: 1.5;">
                                    Please do not share this code with anyone for security reasons.
                                </p>

                                <p style="margin: 24px 0 0 0; color: #9aa0a6; font-size: 14px; line-height: 1.5;">
                                    If you did not request this email, you can safely ignore it.
                                </p>

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 0 30px 40px 30px; text-align: center;">
                                <hr style="border: 0; border-top: 1px solid #e8eaed; margin: 0 0 20px 0;">

                                <p style="margin: 0 0 8px 0; color: #9aa0a6; font-size: 12px;">
                                    &copy; 2026 Kroykori. All rights reserved.
                                </p>

                                <p style="margin: 0; color: #9aa0a6; font-size: 12px;">
                                    Dhaka, Bangladesh
                                </p>
                            </td>
                        </tr>

                    </table>
                    <!-- End Main Container -->

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};