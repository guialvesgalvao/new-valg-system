import { z } from "zod";

export const registerValidation = z
  .object({
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
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterValidationType = z.infer<typeof registerValidation>;
