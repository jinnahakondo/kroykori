import { VerifyOtp } from '@/components/application/VerifyOtp'
import React from 'react'

export default function Otp() {
    return (
        <div className='h-screen grid place-items-center'>
            <VerifyOtp email='mdjinnah@gmail.com' />
        </div>
    )
}
