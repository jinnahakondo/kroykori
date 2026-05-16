import UserModel from "@/models/user.model";
import { TUser } from "@/types/user.types";
import { zSchema } from "@/lib/zod.schema";

export const createUser = async (payload: TUser) => {
    // validation
    const validationSchema = zSchema.pick({
        name: true,
        email: true,
        password: true,
    });

    const validateData = validationSchema.safeParse(payload);

    if (!validateData.success) {
        throw new Error("Invalid input fields");
    }

    const { name, email, password } = validateData.data;

    // check exists
    const isExist = await UserModel.exists({ email });

    if (isExist) {
        throw new Error("User already exists");
    }

    // create user
    const user = await UserModel.create({
        name,
        email,
        password,
    });

    return user;
};