import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome é obrigatório" })
    .max(255, { message: "O nome deve conter até 255 caracteres ou menos" }),
  email: z
    .string()
    .email({ message: "Formato de email inválido" })
    .max(255, { message: "O email deve conter até 255 caracteres ou menos" }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória" })
    .max(255, { message: "A senha deve conter até 255 caracteres ou menos" }),
  cel_number: z
    .string()
    .max(20, { message: "O número de telefone deve conter até 20 caracteres ou menos" })
    .optional()
});