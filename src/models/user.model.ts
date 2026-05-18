import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        provider: {
            type: String,
            enum: ["credential", "google",],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            select: false,
        },

        address: {
            type: String,
            trim: true,
        },

        phoneNumber: {
            type: String,
            trim: true,
        },

        image: {
            type: String,
            trim: true
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// hash password before save
userSchema.pre("save", async function () {
    // only hash if password modified
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10);
});

// compare password method
userSchema.methods.comparePassword =
    async function (
        plainPassword: string
    ) {
        return await bcrypt.compare(
            plainPassword,
            this.password
        );
    };


const UserMOdel =
    mongoose.models.User || mongoose.model("User", userSchema);

export default UserMOdel;