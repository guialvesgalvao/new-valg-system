import { z } from "zod";
import { ERROR_VALIDATION_MESSAGES } from "./strings-validation";

const emailSchema = z
  .string({
    required_error: ERROR_VALIDATION_MESSAGES.email.required,
  })
  .email(ERROR_VALIDATION_MESSAGES.email.invalid);

export const forgotPasswordValidation = z.object({
  email: emailSchema,
});

export type ForgotPasswordValidationType = z.infer<
  typeof forgotPasswordValidation
>;
