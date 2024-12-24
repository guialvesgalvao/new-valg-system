import { validateBill } from '../../../services/validateBill'
import { unstructuredBills } from '../../mocks/bills'
import { describe, expect } from '@jest/globals';

describe('Testes para a função que verifica se a conta inserida, é válida', () => {

    describe('Casos de sucesso', () => {

        test('Recebe uma conta somente com os campos obrigatórios e deve retornar positivo', () => {
            expect(validateBill(unstructuredBills[3])).toBeTruthy()
        })

        test('Recebe uma conta com os campos obrigatórios e um extra e deve retornar positivo', () => {
            expect(validateBill(unstructuredBills[4])).toBeTruthy()
        })
    })

    describe('Casos de erro', () => {

        test('Recebe uma conta sem um campo obrigatórios e deve retornar uma messagem com os valores pendentes', () => {
            expect(validateBill(unstructuredBills[0])).toBe('A conta informada não possui nome')
            expect(validateBill(unstructuredBills[1])).toBe('A conta informada não possui valor')
            expect(validateBill(unstructuredBills[2])).toBe('A conta informada não possui data de vencimento')
        })

        test('Recebe uma conta sem dois campos obrigatórios e deve retornar uma messagem com os valores pendentes', () => {
            expect(validateBill(unstructuredBills[5])).toBe('A conta informada não possui valor, data de vencimento')
            expect(validateBill(unstructuredBills[6])).toBe('A conta informada não possui data de vencimento, nome')
            expect(validateBill(unstructuredBills[7])).toBe('A conta informada não possui valor, nome')
        })
    })
})