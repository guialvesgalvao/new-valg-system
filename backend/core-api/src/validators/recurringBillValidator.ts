import { recurringBillsSchema } from "../schemas/recurringBillSchema";

export function recurringBillValidator(data: unknown): string | null {
  const validate = recurringBillsSchema.safeParse(data);

  if (validate.error) {
    return validate.error.errors.map((err) => err.message).join(", ");
  }

  return null;
}
