import { strings } from '../shared/consts/defaultStringsResponses'
import { months } from '../shared/consts/months';
import { IBill } from '../shared/interfaces/IBill';

export function transformAccountToText(bills: Array<IBill>, isOnlyOverdueBills?: boolean): string {
    if (bills.length === 0) return strings.withoutBillsOpen

    const billStatus = isOnlyOverdueBills ? 'em aberto' : getPluralSuffix('vencida', bills.length)

    const billsStringMapped = bills.map((bill, index) => generateBillString(bill, index + 1, bills.length > 1))

    return `Você tem ${bills.length} ${getPluralSuffix('conta', bills.length)} ${billStatus}. ${billsStringMapped.join(', ')}`
}

function generateBillString(bill: IBill, index: number, hasMoreThanOneBill: boolean) {
    const { name, amount, dueDate } = bill

    return `${hasMoreThanOneBill ? index + 'º ' : ''}${name} ${isBillOverdue(bill.dueDate) ? 'vencida' : 'em aberto'}, no valor de ${generateBillAmountInNaturalLanguage(amount)} e com vencimento em ${generateBillDueDateInNaturalLanguage(dueDate)}`
}

function isBillOverdue(billDueDate: Date): boolean {
    const dateNow = new Date();

    return billDueDate < dateNow;
}

function generateBillAmountInNaturalLanguage(billAmount: number): string {
    const integerPart = Math.trunc(billAmount)
    const rawCentsPart = (billAmount % 1) * 100
    const centsPart = parseInt(rawCentsPart.toFixed())

    return `${integerPart} ${getPluralSuffix('reai', integerPart, 'l')}${centsPart !== 0 ? ' e ' + centsPart + getPluralSuffix(' centavo', centsPart) : ''}`
}

function getPluralSuffix(text: string, value: number, suffixSubstitute?: string): string {
    return (value > 1) ? `${text}s` : text + (suffixSubstitute ?? '');
}

function generateBillDueDateInNaturalLanguage(dueDate: Date): string {

    const day = dueDate.getDate();
    const monthIndex = dueDate.getMonth();
    const year = dueDate.getFullYear();
    const monthString = months[monthIndex]

    return `${day + ' de ' + monthString + ' de ' + year}`
}
