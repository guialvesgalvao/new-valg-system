import { GenericBill } from "../interfaces/bills";

export function formatterBillRequestBody (bill: Array<GenericBill>) {
    
    const formatBill = bill.map((bill) => {
        return {
            name: bill.name,
            value: bill.value,
            dueDate: bill.dueDate,
            status: bill.status,
            priority: bill.priority,
            relationalCode: bill.relationalCode,
            created: bill.created,
            modified: bill.modified,
            recurrent: bill.recurrent
        }
    });
    
    return formatBill;
}