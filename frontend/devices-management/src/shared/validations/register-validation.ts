import { z } from "zod";
import { ERROR_VALIDATION_MESSAGES } from "./strings-validation";

const nameSchema = z
  .string({
    required_error: ERROR_VALIDATION_MESSAGES.name.required,
  })
  .min(2, ERROR_VALIDATION_MESSAGES.name.minLength);

const phoneSchema = z
  .string()
  .optional();

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

export const registerValidation = z
  .object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: ERROR_VALIDATION_MESSAGES.confirmPassword.mismatch,
    path: ["confirmPassword"],
  });

// Tipagem inferida do esquema de validação
export type RegisterValidationType = z.infer<typeof registerValidation>;
