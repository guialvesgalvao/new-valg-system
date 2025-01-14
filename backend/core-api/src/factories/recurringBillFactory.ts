import { IRecurringBill, IRecurringBillDBSchema } from "../shared/interfaces/IRecurringBill";

export function recurringBillsFactory(recurringBills: IRecurringBillDBSchema[]): IRecurringBill[] {
  const recurringBillFormatted = recurringBills.map(
    ({ id, name, average_amount, day_of_due, end_date, enabled, modified_at, created_at }) => {
      return {
        id: id,
        name: name, 
        averageAmount: average_amount,
        dayOfDue: day_of_due,
        endDate: end_date,
        enabled: enabled,
        modifiedAt: modified_at,
        createdAt: created_at
      };
    }
  );

  return recurringBillFormatted
}
