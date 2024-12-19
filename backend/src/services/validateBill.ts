import { IUnvalidatedBills } from "../shared/interfaces/IBill";

export function validateBill({ amount, due_date, name }: IUnvalidatedBills): boolean {
  const missingFields: Array<string> = [];

  if (!amount) missingFields.push("valor");
  if (!due_date) missingFields.push("data de vencimento");
  if (!name) missingFields.push("nome");

  if (missingFields.length === 0) return true;

  throw new Error(`A conta informada não possui ${missingFields.join(", ")}`);
}
