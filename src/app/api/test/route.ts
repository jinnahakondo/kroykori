import { connectDb } from "@/lib/db.connection";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDb()
    return NextResponse.json({ message: "connected" })
}