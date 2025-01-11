import { z } from "zod";

export const forgotPasswordValidation = z.object({
  email: z
    .string({
      required_error: "Email Address is required",
    })
    .email("Invalid email address"),
});

export type ForgotPasswordValidationType = z.infer<
  typeof forgotPasswordValidation
>;
