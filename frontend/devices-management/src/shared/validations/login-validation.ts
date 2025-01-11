import { z } from "zod";

export const loginValidation = z.object({
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
});

export type LoginValidationType = z.infer<typeof loginValidation>;
