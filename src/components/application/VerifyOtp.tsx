"use client"

import { RefreshCwIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { zSchema } from "@/lib/zod.schema"
import axiosInstance from "@/lib/axios"
import { showErrorToast, showSuccessToast } from "@/lib/Toast"
import { useRouter } from "next/navigation"
import { website_reset_password } from "@/routes/website.routes"


export function VerifyOtp({ email }: { email: string }) {

  const router = useRouter()

  // Infer schema types properly
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  })

  type FormValues = z.infer<typeof formSchema>

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email,
    },
  })

  const handleOtpVerification = async (data: FormValues) => {
    try {
      const response = await axiosInstance.post('/api/auth/verify-otp', data)

      if (response.status === 200) {
        showSuccessToast("Otp verification success")
        router.push(`${website_reset_password}?email=${data.email}`)
      }
    } catch (error: any) {
      showErrorToast(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-100 w-full p-4">
      <Card className="w-full max-w-md shadow-lg border-muted/50">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="tracking-tight text-2xl font-bold">
            OTP Verification
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            A one-time password has been sent to <br />
            <span className="font-semibold text-foreground break-all">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleOtpVerification)} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <label
                htmlFor="otp"
                className="text-sm font-medium text-muted-foreground text-center"
              >
                Enter the 6-digit code below to verify
              </label>

              <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="gap-2">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="rounded-md border border-input text-base font-semibold shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              {errors.otp && (
                <p className="text-sm font-medium text-destructive text-center animate-in fade-in-50 duration-200">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                className="text-sm font-semibold text-primary transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
              >
                Resend Code
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-medium transition-transform active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}