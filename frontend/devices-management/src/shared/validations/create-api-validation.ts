import { z } from "zod";
import { ERROR_CREATE_API_MESSAGES } from "./strings-validation";

const nameSchema = z
  .string({
    required_error: ERROR_CREATE_API_MESSAGES.name.required,
  })
  .min(3, {
    message: ERROR_CREATE_API_MESSAGES.name.minLength,
  })
  .max(100, {
    message: ERROR_CREATE_API_MESSAGES.name.maxLength,
  });

const descriptionSchema = z
  .string()
  .max(1000, {
    message: ERROR_CREATE_API_MESSAGES.description.maxLength,
  })
  .optional();

export const createApiValidation = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export type CreateApiValidationType = z.infer<typeof createApiValidation>;
