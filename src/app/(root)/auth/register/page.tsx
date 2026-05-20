
"use client";

import Logo from "@/components/application/Logo";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import axiosInstance from "@/lib/axios";
import { zSchema } from "@/lib/zod.schema";
import { website_login } from "@/routes/website.routes";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { } from "sonner";
import z from "zod";
import { toast } from "sonner";

const Register = () => {
    const router = useRouter();

    // password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    // zod schema
    const formSchema = zSchema
        .pick({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
        })
        .refine(
            (data) => data.password === data.confirmPassword,
            {
                message: "Passwords do not match",
                path: ["confirmPassword"],
            }
        );

    // types
    type RegisterFormValues = z.infer<typeof formSchema>;

    // react hook form
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // submit handler
    const handleRegisterSubmit = async (data: RegisterFormValues) => {
        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
        }
        try {
            const result = await axiosInstance.post("/api/users", userData);

            if (result.data.success) {
                toast.success(
                    "Registration successful. Please verify your email."
                );
                router.push(website_login);
            }

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to create account"
            );
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <Logo />

                <CardTitle className="text-2xl text-center">
                    Create your account
                </CardTitle>

                <CardDescription className="text-center">
                    Enter your information below to create your
                    account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(
                        handleRegisterSubmit
                    )}
                >
                    <FieldGroup>
                        {/* Name */}
                        <Field>
                            <FieldLabel htmlFor="name">
                                Name
                            </FieldLabel>

                            <Input
                                id="name"
                                type="text"
                                placeholder="Jinnah Akondo"
                                {...register("name")}
                            />

                            {errors.name && (
                                <p className="text-xs font-medium text-destructive mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </Field>

                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>

                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                            />

                            {errors.email && (
                                <p className="text-xs font-medium text-destructive mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </Field>

                        {/* Password */}
                        <Field>
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="******"
                                    className="pr-10"
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <Eye size={18} />
                                    ) : (
                                        <EyeOff size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-xs font-medium text-destructive mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </Field>

                        {/* Confirm Password */}
                        <Field>
                            <FieldLabel htmlFor="confirmPassword">
                                Confirm Password
                            </FieldLabel>

                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="******"
                                    className="pr-10"
                                    {...register(
                                        "confirmPassword"
                                    )}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <Eye size={18} />
                                    ) : (
                                        <EyeOff size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <p className="text-xs font-medium text-destructive mt-1">
                                    {
                                        errors.confirmPassword
                                            .message
                                    }
                                </p>
                            )}
                        </Field>

                        {/* Buttons */}
                        <Field>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </Button>

                            <Button
                                onClick={() =>
                                    signIn("google")
                                }
                                variant="outline"
                                type="button"
                                className="w-full mt-2"
                            >
                                Continue with Google
                            </Button>

                            <FieldDescription className="text-center mt-4">
                                Already have an account?{" "}
                                <Link
                                    href={website_login}
                                    className="hover:underline"
                                >
                                    Log in
                                </Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};
export default Register;