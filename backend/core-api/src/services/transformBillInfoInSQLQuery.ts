import { IUnvalidatedBills } from "../shared/interfaces/IBill";

export function transformBillInfoInSQLQuery({ name, due_date, amount }: IUnvalidatedBills) {
    const filters: Array<string> = [];

    if (name) filters.push(`name = '${name}'`)
    if (amount) filters.push(`amount = ${amount}`)
    if (due_date) filters.push(`due_date = '${due_date.toISOString()}'`)

    return `SELECT * FROM bills WHERE ${filters.join(' AND ')};`
}