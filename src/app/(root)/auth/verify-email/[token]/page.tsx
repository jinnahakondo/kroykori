import VerifyEmail from '@/components/VerifyEmail';
import React from 'react'

export default async function VerifyEmailPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;
    return (
        <div>
            <VerifyEmail token={token} />
        </div>
    )
}
