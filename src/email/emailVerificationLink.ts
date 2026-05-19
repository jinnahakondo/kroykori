export const emailVerificationLink = (link: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; color: #333333;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f9fc; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                        
                        <!-- Header / Brand Accent -->
                        <tr>
                            <td style="background-color: #1a73e8; padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">Kroykori</h1>
                            </td>
                        </tr>

                        <!-- Body Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin: 0 0 16px 0; color: #111111; font-size: 22px; font-weight: 600;">Verify your email address</h2>
                                <p style="margin: 0 0 24px 0; color: #5f6368; font-size: 16px; line-height: 1.6;">
                                    Thank you for joining Kroykori! To complete your registration and secure your account, please click the button below to verify your email address. This link will expire in 24 hours.
                                </p>

                                <!-- Action Button -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                                    <tr>
                                        <td align="center">
                                            <a href="${link}" target="_blank" style="display: inline-block; background-color: #1a73e8; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 6px; box-shadow: 0 2px 5px rgba(26, 115, 232, 0.25);">
                                                Verify Email Address
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 12px 0; color: #5f6368; font-size: 14px; line-height: 1.5;">
                                    If the button above doesn't work, copy and paste this URL into your web browser:
                                </p>
                                <p style="margin: 0; color: #1a73e8; font-size: 13px; word-break: break-all; line-height: 1.4;">
                                    <a href="${link}" target="_blank" style="color: #1a73e8; text-decoration: underline;">${link}</a>
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