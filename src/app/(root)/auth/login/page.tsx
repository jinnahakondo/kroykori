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
import { website_register } from '@/routes/website.routes';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const Login = () => {

    const [isTypePassword, setIsTypePassword] = useState(true)

    const router: AppRouterInstance = useRouter();

    // pic email password form zod schema
    const formSchema = zSchema.pick({
        email: true,
    }).extend({ password: z.string().min(3, "Please enter your password") })

    // type decleration
    type LoginFormValues = z.infer<typeof formSchema>;

    // react hook form configuration
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // login submit handler 
    const handleLoginSubmit = async (data: LoginFormValues) => {
        // console.log("Form Submitted Successfully:", data);
        const res = await signIn("credentials", { email: data.email, password: data.password, redirect: false })
        if (res?.ok) {
            router.push(res?.url || '/')
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
                <form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <FieldGroup>
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
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <div className='relative'>
                                <Input
                                    id="password"
                                    type={isTypePassword ? "password" : "text"}
                                    placeholder='******'
                                    className="pr-10"
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    onClick={() => setIsTypePassword(!isTypePassword)}
                                    className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {isTypePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs font-medium text-destructive mt-1">{errors.password.message}</p>
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
                                Don&apos;t have an account? <a href={website_register}>Sign up</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;
