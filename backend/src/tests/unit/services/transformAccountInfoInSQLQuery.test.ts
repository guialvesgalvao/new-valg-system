import { unstructuredBills, accountsInSQLQuery } from "../../mocks/bills"
import { transformAccountInfoInSQLQuery } from '../../../services/transformAccountInfoInSQLQuery'

describe('Função para transformar dados de objetos em SQL Query', () => {

    describe('Casos de busca', () => {

        test('Transforma contas com valor e data de validade em uma SQL Query', () => {
            expect(transformAccountInfoInSQLQuery(unstructuredBills[0])).toBe(accountsInSQLQuery[0])
        })

        test('Transforma contas com nome e data de validade em uma SQL Query', () => {
            expect(transformAccountInfoInSQLQuery(unstructuredBills[1])).toBe(accountsInSQLQuery[1])
        })

        test('Transforma contas com nome e valor em uma SQL Query', () => {
            expect(transformAccountInfoInSQLQuery(unstructuredBills[2])).toBe(accountsInSQLQuery[2])
        })

        test('Transforma contas com nome, valor e data de validade em uma SQL Query', () => {
            expect(transformAccountInfoInSQLQuery(unstructuredBills[3])).toBe(accountsInSQLQuery[3])
        })

        test('Transforma contas somente com nome em uma SQL Query', () => {
            expect(transformAccountInfoInSQLQuery(unstructuredBills[5])).toBe(accountsInSQLQuery[4])
        })

        test('Transforma contas somente com valor em uma SQL Query', () => {
            expect(transformAccountInfoInSQLQuery(unstructuredBills[6])).toBe(accountsInSQLQuery[5])
        })

        test('Transforma contas somente com data de validade em uma SQL Query', () => {
            expect(transformAccountInfoInSQLQuery(unstructuredBills[7])).toBe(accountsInSQLQuery[6])
        })
    })

})