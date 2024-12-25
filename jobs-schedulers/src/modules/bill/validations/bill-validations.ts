import { z } from "zod";

export const Bill = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  dueDate: z.date(),
  status: z.enum(["Pending", "Overdue"]),
  isGeneratedByRecurrence: z.boolean(),
  user: z.string(),
  modifiedAt: z.date(),
  createdAt: z.date()
});

export const CreateBill = z.object({
  name: z.string().min(1).max(255),
  amount: z.number().min(0.01),
  dueDate: z.date(),
  status: z.enum(["Pending", "Overdue"]),
  isGeneratedByRecurrence: z.boolean(),
  user: z.string()
});

export type BillType = z.infer<typeof Bill>;
export type CreateBillType = z.infer<typeof CreateBill>;
