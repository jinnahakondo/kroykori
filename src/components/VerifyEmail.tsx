"use client";

import axiosInstance from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
    CheckCircle2,
    Loader2,
    MailCheck,
    XCircle,
} from "lucide-react";

type TStatus = "loading" | "success" | "error";

export default function VerifyEmail({ token }: { token: string }) {
    const [status, setStatus] = useState<TStatus>("loading");
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axiosInstance.post(
                    "/api/auth/verify-email",
                    { token }
                );

                setStatus("success");

                setMessage(
                    response?.data?.message ||
                    "Email verified successfully"
                );
            } catch (error: any) {
                setStatus("error");

                setMessage(
                    error?.response?.data?.message ||
                    "Verification failed. Invalid or expired token."
                );
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md border shadow-xl">
                <CardContent className="flex flex-col items-center p-8 text-center">

                    {/* Icon */}
                    <div className="mb-6">
                        {status === "loading" && (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            </div>
                        )}

                        {status === "success" && (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>
                        )}

                        {status === "error" && (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                                <XCircle className="h-10 w-10 text-red-500" />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">
                        {status === "loading" && "Verifying Email"}
                        {status === "success" && "Email Verified"}
                        {status === "error" && "Verification Failed"}
                    </h1>

                    {/* Message */}
                    <p className="mb-8 text-muted-foreground">
                        {message}
                    </p>

                    {/* Action Button */}
                    {status === "success" && (
                        <Button asChild className="w-full">
                            <Link
                                href="/login"
                                className="flex items-center gap-2"
                            >
                                <MailCheck className="h-4 w-4" />
                                Go to Login
                            </Link>
                        </Button>
                    )}

                    {status === "error" && (
                        <Button
                            asChild
                            variant="destructive"
                            className="w-full"
                        >
                            <Link href="/register">
                                Back to Register
                            </Link>
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}