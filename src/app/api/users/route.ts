import { connectDb } from "@/lib/db.connection";
import { response } from "@/lib/helperfunction";
import { createUser } from "@/services/user.service";

export async function POST(req: Request) {
    try {
        // DB connect
        await connectDb();

        // body parse
        const body = await req.json();

        // service call
        const user = await createUser(body);

        return response({
            success: true,
            message: "User created successfully",
            statusCode: 201,
            data: user,
        });

    } catch (error: any) {
        return response({
            success: false,
            message: error.message || "User creation failed",
            statusCode: 500,
        });
    }
}