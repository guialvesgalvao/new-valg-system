import { z } from "zod";

export const registerValidation = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
    })
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string({
      required_error: "Email Address is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string({
      required_error: "Confirm Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});

export type RegisterValidationType = z.infer<typeof registerValidation>;
