import { structuredBills } from "../../mocks/bills"
import { transformAccountToText } from '../../../services/transformAccountToText'

describe('Válida funcionalidade de transformar uma conta em linguagem natural', () => {

    describe('Casos de sucesso', () => {

      test('Recebe um array com 3 contas vencidas e deve retornar um texto em linguagem natural', () => {
        expect(transformAccountToText(structuredBills.slice(0, 3))).toBe('Você tem 3 contas em aberto. 1º Conta de luz vencida, no valor de 100 reais e com vencimento em 13 de janeiro de 2024, 2º Sabesp vencida, no valor de 3500 reais e com vencimento em 18 de janeiro de 2024, 3º Comgás vencida, no valor de 10 reais e 50 centavos e com vencimento em 30 de junho de 2024')
      })
  
      test('Recebe um array com 1 conta vencida e deve retornar um texto em linguagem natural', () => {
        expect(transformAccountToText([structuredBills[2]])).toBe('Você tem 1 conta em aberto. Comgás vencida, no valor de 10 reais e 50 centavos e com vencimento em 30 de junho de 2024')
      })
  
      test('Recebe um array com 1 em aberto e deve retornar um texto em linguagem natural', () => {
        expect(transformAccountToText([structuredBills[3]])).toBe('Você tem 1 conta em aberto. Cartão de crédito em aberto, no valor de 10000 reais e 35 centavos e com vencimento em 30 de junho de 2025')
      })
  
      test('Recebe um array vazio', () => {
        expect(transformAccountToText([])).toBe('Você não possui contas em aberto')
      })
    })
  })