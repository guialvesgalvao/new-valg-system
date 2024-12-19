import { IUnvalidatedBills } from "../shared/interfaces/IBill";

export function transformAccountInfoInSQLQuery({ name, dueDate, amount }: IUnvalidatedBills) {
    const filters: Array<string> = [];

    if (name) filters.push(`name = '${name}'`)
    if (amount) filters.push(`amount = ${amount}`)
    if (dueDate) filters.push(`due_date = '${dueDate.toISOString()}'`)

    return `SELECT * FROM accounts WHERE ${filters.join(' AND ')};`
}