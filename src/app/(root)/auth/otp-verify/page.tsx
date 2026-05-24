import { VerifyOtp } from '@/components/application/VerifyOtp'
import React from 'react'

export default async function OtpVerify({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams
    const email = resolvedParams.email as string

    return (
        <div>
            <VerifyOtp email={email} />
        </div>
    )
}
