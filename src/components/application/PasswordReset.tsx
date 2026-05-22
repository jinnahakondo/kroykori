"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zSchema } from '@/lib/zod.schema'
import { Button } from '../ui/button'

const formSchema = zSchema.pick({
    password: true,
    confirmPassword: true
})

type ResetPasswordFormValues = z.infer<typeof formSchema>

export default function PasswordReset() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const handleResetPassword = async (data: ResetPasswordFormValues) => {
        // data.code, data.password are safe and validated here
        console.log(data)
    }

    return (
        <div className='flex items-center justify-center min-h-100 w-full p-4'>
            <Card className='w-full max-w-sm shadow-lg border-muted/50'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl'>Reset Password</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(handleResetPassword)} className='space-y-4'>

                        {/* New Password Field */}
                        <Field>
                            <FieldLabel htmlFor='password'>New Password</FieldLabel>
                            <Input
                                type='password'
                                id='password'
                                placeholder='••••••••'
                                {...register("password")}
                            />
                            {errors.password && (
                                <span className="text-sm text-destructive font-medium">
                                    {errors.password.message}
                                </span>
                            )}
                        </Field>

                        {/* Confirm Password Field */}
                        <Field>
                            <FieldLabel htmlFor='confirmPassword'>Confirm New Password</FieldLabel>
                            <Input
                                type='password'
                                id='confirmPassword'
                                placeholder='••••••••'
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <span className="text-sm text-destructive font-medium">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </Field>

                        <Button type='submit' className='w-full' disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Reset Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}