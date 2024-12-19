import { IBill, IBillDBSchema } from "../interfaces/IBill";

export function billFormatter(bills: Array<IBillDBSchema>): Array<IBill> {
    return bills.map(bill => {
        return {
            id: bill.id,
            name: bill.name,
            amount: bill.amount,
            dueDate: new Date(bill.due_date),
            status: bill.status,
            isRecurring: !!bill.is_generated_by_recurrence,
        }
    })
}