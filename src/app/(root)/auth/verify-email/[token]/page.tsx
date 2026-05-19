import React from 'react'

export default async function VerifyEmail({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;
    console.log("Received token:",token);
    return (
        <div>VerifyEmail</div>
    )
}
