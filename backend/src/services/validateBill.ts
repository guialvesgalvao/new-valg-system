import { IUnvalidatedBills } from '../shared/interfaces/IBill'

export function validateBill ({ amount, dueDate, name}: IUnvalidatedBills): boolean | string {
    const missingFields: Array<string> = [];

    if(!amount) missingFields.push('valor')
    if(!dueDate) missingFields.push('data de vencimento')
    if(!name) missingFields.push('nome')

    if(missingFields.length === 0) return true

    return `A conta informada não possui ${missingFields.join(', ')}`
}