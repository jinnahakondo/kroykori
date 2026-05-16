export type TUser = {
    _id: string;
    role?: "user" | "admin";
    name: string;
    email: string;
    password?: string;
    address?: string;
    phoneNumber?: string;
    avatar?: {
        url?: string;
    };
    isEmailVerified?: boolean;

    deletedAt?: Date | null;

    createdAt?: Date;
    updatedAt?: Date;
};