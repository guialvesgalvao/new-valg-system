import { describe, test, expect } from '@jest/globals'
import { defaultErrorInvalid, defaultMissingFieldsError, fakeBillVoiceCorrect, fakeBillVoiceWrong} from '../../mocks/accounts/api-responses'
import { getAccount } from '../../../controllers/accountController'
const fakeBillJson = {
    name: 'Eletropaulo',
    amount: 40,
    due_date: new Date(2024, 11, 20),
    status: 'pagamento pendente'
}

describe("Testes para validar funcionamento de função que recebe ", () => {
    describe("Casos de sucesso", () => {
        test('Deve retornar o mesmo array de objetos que foi inserido', () => {
            expect(getAccount([fakeBillJson] as any, {} as any)).toEqual([fakeBillJson])
        })

        test('Deve receber um texto em linguagem natural e retornar um JSON baseado com as informações extraidas', () => {
            expect(parseToJson(fakeBillVoiceCorrect)).toEqual([fakeBillJson])
        })

        test('Deve retornar um array vazio', () => {
            expect(parseToJson([])).toEqual([])
        })
    });

    describe("Casos de erro", () => {
        test('Deve informar que os dados recebidos não são válidos', () => {
            const req = { body: {
                data: null,
                responseMode: 'json'
            }}

            expect(getAccount(req, {} as any)).toEqual({ error: defaultErrorInvalid })
        })

        test('Deve retornar uma string de erro, informando que não foi possível obter todos os valores da conta', () => {
            expect(getAccount({fakeBillVoiceWrong} as any, {} as any)).toThrow(defaultMissingFieldsError)
        })
        
        test('Deve retornar uma string de erro, informando que não foi possível obter todos os valores da conta, podendo existir a informação de campos que faltaram', () => {
            expect(getAccount({fakeBillVoiceWrong} as any, {} as any)).toContain(defaultMissingFieldsError)
        })
    })

});

describe('Validação para função de transformar linguagem natural em JSON', () => {

    describe('Casos de sucesso', () => {
        test('Recebe um texto em linguagem natural e transforma em JSON corretamente', () => {
            expect(transformLLMToJSON(fakeBillVoiceCorrect).toEqual(fakeBillJson))
        })
    })

})
