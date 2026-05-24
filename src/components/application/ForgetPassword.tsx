"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { zSchema } from '@/lib/zod.schema'
import { useForm } from 'react-hook-form'
import axiosInstance from '@/lib/axios'

// 1. Define the type using Zod's infer feature
const formSchema = zSchema.pick({ email: true })
type ForgotPasswordFormValues = z.infer<typeof formSchema>

export default function ForgotPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ForgotPasswordFormValues>({ // 2. Pass the type to useForm
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })


    const handleSendOtp = async (data: ForgotPasswordFormValues) => {
        try {
            const response = await axiosInstance.post("/api/auth/forgot-password", data)
            console.log(response);
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='flex items-center justify-center min-h-100 w-full p-4'>
            <Card className='w-full max-w-sm shadow-lg border-muted/50'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl'>Forgot Password</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(handleSendOtp)} className='space-y-4'>
                        <Field>
                            <FieldLabel htmlFor='email'>Email</FieldLabel>
                            <Input
                                type='email'
                                id='email'
                                placeholder='Enter your email'
                                {...register("email")}
                            />

                            {errors.email && (
                                <span className="text-sm text-destructive font-medium">
                                    {errors.email.message}
                                </span>
                            )}
                        </Field>

                        <Button type='submit' className='w-full' disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send OTP"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}