import { IUnvalidatedBills } from "../../shared/interfaces/IBill"

export const structuredBills = [
  {
    name: 'Conta de luz',
    amount: 100,
    dueDate: new Date('2024-01-13T14:22:47.229Z')
  },
  {
    name: 'Sabesp',
    amount: 3500,
    dueDate: new Date('2024-01-18T14:22:47.229Z')
  },
  {
    name: 'Comgás',
    amount: 10.50,
    dueDate: new Date('2024-06-30T14:22:47.229Z')
  },
  {
    name: 'Cartão de crédito',
    amount: 10000.35,
    dueDate: new Date('2025-06-30T14:22:47.229Z')
  },
]

export const unstructuredBills: IUnvalidatedBills[] = [
  {
    amount: 3500,
    due_date: new Date('2024-01-18T00:00:00.000Z')
  },
  {
    name: 'Conta de luz',
    due_date: new Date('2024-01-13T00:00:00.000Z')
  },
  {
    name: 'Comgás',
    amount: 10.50,
  },
  {
    name: 'Cartão de crédito',
    amount: 10000.35,
    due_date: new Date('2025-06-30T00:00:00.000Z')
  },
  {
    name: 'Cartão de crédito',
    amount: 10000.35,
    due_date: new Date('2025-06-30T00:00:00.000Z'),
    isRecurring: true
  },
  {
    name: 'Cartão de crédito',
  },
  {
    amount: 10000.35,
  },
  {
    due_date: new Date('2025-06-30T00:00:00.000Z'),
  },
]

export const billsInSQLQuery = [
  "SELECT * FROM bills WHERE amount = 3500 AND due_date = '2024-01-18T00:00:00.000Z';", // objectContas[0]
  "SELECT * FROM bills WHERE name = 'Conta de luz' AND due_date = '2024-01-13T00:00:00.000Z';", // objectContas[1]
  "SELECT * FROM bills WHERE name = 'Comgás' AND amount = 10.5;", // objectContas[2]
  "SELECT * FROM bills WHERE name = 'Cartão de crédito' AND amount = 10000.35 AND due_date = '2025-06-30T00:00:00.000Z';", // objectContas[3]
  "SELECT * FROM bills WHERE name = 'Cartão de crédito';", // objectContas[5]
  "SELECT * FROM bills WHERE amount = 10000.35;", // objectContas[6]
  "SELECT * FROM bills WHERE due_date = '2025-06-30T00:00:00.000Z';" // objectContas[7]
]

export const billsInNaturalLanguage = [
  'conta de três mil e quinhentos reais com vencimento em 18 de janeiro de 2024', // objectContas[0]
  'conta de três mil e quinhentos reais com vencimento em 18 de janeiro', // objectContas[0]
  'conta de 3500 com vencimento em 18 de janeiro', // objectContas[0]
  'Conta de luz que vence em 13 de janeiro de 2024', // objectContas[1]
  'Comgás no valor de 3500 reais',  // objectContas[2]
  'Cartão de crédito no valor de 10000 reais e 35 centavos com vencimento em 30 de junho de 2025', // objectContas[3]
  'Cartão de crédito no valor de 10000 reais e 35 centavos com vencimento em 30 de junho de 2025 e é recorrente', // objectContas[4]
  'O nome da conta é Cartão de crédito', // objectContas[5]
  'O valor da conta é 10000 reais e 35 centavos', // objectContas[6]
  'A data de vencimento da conta é 30 de junho de 2025', // objectContas[7]
  'Teste de string aleátória'
]