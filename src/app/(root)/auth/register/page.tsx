"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Logo from '@/components/application/Logo';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zSchema } from '@/lib/zod.schema';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { website_login } from '@/routes/website.routes';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Register = () => {

    const [isTypePassword, setIsTypePassword] = useState(true)

    const router = useRouter()

    // pic email password form zod schema
    const formSchema = zSchema.pick({
        name: true,
        email: true,
        password: true,
        confirmPassword: true
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    // type decleration
    type RegisterFormValues = z.infer<typeof formSchema>;

    // react hook form configuration
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    // login submit handler 
    const handleRegisterSubmit = async (data: RegisterFormValues) => {
        const result = await axiosInstance.post("/api/users", data)
        if (result.data.success) {
            router.push(website_login)
        }
    }

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <Logo />
                <CardTitle className='text-2xl text-center'>Login to your account</CardTitle>
                <CardDescription className='text-center'>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleRegisterSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor='name'>Name</FieldLabel>
                            <Input type='text' placeholder='Jinnah Akondo' {...register("name")} />
                            {errors.name && (
                                <p className="text-xs font-medium text-destructive mt-1">{errors.name.message}</p>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-xs font-medium text-destructive mt-1">{errors.email.message}</p>
                            )}
                        </Field>

                        <Field >
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                            </div>
                            <div>
                                <Input
                                    id="password"
                                    type={isTypePassword ? "password" : "text"}
                                    placeholder='******'
                                    className="pr-10"
                                    {...register("password")}
                                />

                            </div>
                            {errors.password && (
                                <p className="text-xs font-medium text-destructive mt-1">{errors.password.message}</p>
                            )}
                        </Field>

                        <Field >
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                            </div>
                            <div className='relative'>
                                <Input
                                    id="password"
                                    type={isTypePassword ? "password" : "text"}
                                    placeholder='******'
                                    className="pr-10"
                                    {...register("confirmPassword")}
                                />

                                <button
                                    type="button"
                                    onClick={() => setIsTypePassword(!isTypePassword)}
                                    className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {isTypePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs font-medium text-destructive mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </Field>

                        <Field>
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                            <Button
                                onClick={() => signIn("google")}
                                variant="outline"
                                type="button"
                                className="w-full mt-2">
                                Login with Google
                            </Button>
                            <FieldDescription className="text-center mt-4">
                                Already have an account? <a href={website_login}>Log in</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};

export default Register;
