import z from "zod";

export const zSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least 1 uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain at least 1 lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain at least 1 number"
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 special character"
      ),

    confirmPassword: z.string(),
     otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
  })

