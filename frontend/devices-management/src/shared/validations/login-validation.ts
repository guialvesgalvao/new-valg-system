import { z } from "zod";
import { ERROR_VALIDATION_MESSAGES } from "./strings-validation";

const emailSchema = z
  .string({
    required_error: ERROR_VALIDATION_MESSAGES.email.required,
  })
  .email(ERROR_VALIDATION_MESSAGES.email.invalid);

const passwordSchema = z
  .string({
    required_error: ERROR_VALIDATION_MESSAGES.password.required,
  })
  .min(8, ERROR_VALIDATION_MESSAGES.password.minLength);

export const loginValidation = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginValidationType = z.infer<typeof loginValidation>;
