const  { parseToJson, transformLLMToJSON } = require("./function")

const fakeBillVoiceCorrect = 'Adicione uma conta que se chama: Eletropaulo, no valor de 40 reais e que vence dia 20/12'
const fakeBillVoiceWrong = 'Adicione uma conta que se chama: Sabesp, que vence dia 15/11'

const defaultMissingFieldsError = 'Não foi possível identificar todos os dados necessários da conta'
const defaultErrorInvalid = 'A entrada inserida foi inválida'

const fakeBillJson = {
    name: 'Eletropaulo',
    amount: 40,
    due_date: new Date(2024, 11, 20),
    status: 'pagamento pendente'
}


describe("Testes para validar funcionamento de função que recebe ", () => {
    describe("Casos de sucesso", () => {
        test('Deve retornar o mesmo array de objetos que foi inserido', () => {
            expect(parseToJson([fakeBillJson])).toEqual([fakeBillJson])
        })

        test('Deve receber um texto em linguagem natural e retornar um JSON baseado com as informações extraidas', () => {
            expect(parseToJson(fakeBillVoiceCorrect)).toEqual([fakeBillJson])
        })

        test('Deve retornar um array vazio', () => {
            expect(parseToJson([])).toEqual([])
        })
    });

    describe("Casos de erro", () => {
        test('Deve retornar uma string de erro, informando que não foi possível obter todos os valores da conta', () => {
            expect(parseToJson(fakeBillVoiceWrong)).toThrow(defaultMissingFieldsError)
        })

        test('Deve retornar uma string de erro, informando que não foi possível obter todos os valores da conta, podendo existir a informação de campos que faltaram', () => {
            expect(parseToJson(fakeBillVoiceWrong)).toThrow(defaultMissingFieldsError)
        })

        test('Caso a entrada seja um número deve retornar uma string de erro', () => {
            expect(parseToJson(54)).toThrow(defaultErrorInvalid)
        })

        test('Caso a entrada seja um objeto ao invés de um array, deve retornar uma string de erro', () => {
            expect(parseToJson(fakeBillJson)).toThrow(defaultErrorInvalid)
        })

        test('Caso a entrada seja null ou undefined deve retornar uma string de erro', () => {
            expect(parseToJson(fakeBillJson)).toThrow(defaultErrorInvalid)
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
