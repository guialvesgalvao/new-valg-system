import { z } from "zod";

export const recurringBillsSchema = z.object({
  name: z.string().min(1, "É necessário informar um nome para a conta"),
  averageAmount: z.number().int().positive(),
  dayOfDue: z.number().min(1, "O dia mínimo precisa ser 1").max(31, "O dia máximo deve ser 31"),
  endDate: z.string(),
  enabled: z.boolean().optional()
});