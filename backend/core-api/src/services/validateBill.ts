import { IUnvalidatedBills } from "../shared/interfaces/IBill";

export function validateBill({ amount, dueDate, name }: IUnvalidatedBills): string | null {
  const missingFields: Array<string> = [];
  if (!amount) missingFields.push("valor");
  if (!dueDate) missingFields.push("data de vencimento");
  if (!name) missingFields.push("nome");

  if (missingFields.length === 0) return null;

  return `A conta informada não possui ${missingFields.join(", ")}`;
}
