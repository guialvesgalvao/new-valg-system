import { unstructuredBills, billsInSQLQuery } from "../../mocks/bills"
import { transformBillInfoInSQLQuery } from '../../../services/transformBillInfoInSQLQuery'
import { describe, expect } from '@jest/globals';


describe('Função para transformar dados de objetos em SQL Query', () => {

    describe('Casos de busca', () => {

        test('Transforma contas com valor e data de validade em uma SQL Query', () => {
            expect(transformBillInfoInSQLQuery(unstructuredBills[0])).toBe(billsInSQLQuery[0])
        })

        test('Transforma contas com nome e data de validade em uma SQL Query', () => {
            expect(transformBillInfoInSQLQuery(unstructuredBills[1])).toBe(billsInSQLQuery[1])
        })

        test('Transforma contas com nome e valor em uma SQL Query', () => {
            expect(transformBillInfoInSQLQuery(unstructuredBills[2])).toBe(billsInSQLQuery[2])
        })

        test('Transforma contas com nome, valor e data de validade em uma SQL Query', () => {
            expect(transformBillInfoInSQLQuery(unstructuredBills[3])).toBe(billsInSQLQuery[3])
        })

        test('Transforma contas somente com nome em uma SQL Query', () => {
            expect(transformBillInfoInSQLQuery(unstructuredBills[5])).toBe(billsInSQLQuery[4])
        })

        test('Transforma contas somente com valor em uma SQL Query', () => {
            expect(transformBillInfoInSQLQuery(unstructuredBills[6])).toBe(billsInSQLQuery[5])
        })

        test('Transforma contas somente com data de validade em uma SQL Query', () => {
            expect(transformBillInfoInSQLQuery(unstructuredBills[7])).toBe(billsInSQLQuery[6])
        })
    })

})