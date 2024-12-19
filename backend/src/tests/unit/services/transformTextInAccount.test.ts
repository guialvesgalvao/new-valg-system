import axios from 'axios';
import { transformTextInAccount } from '../../../services/transformTextInAccount';
import { accountsInNaturalLanguage, unstructuredBills } from '../../mocks/bills';
import { strings } from '../../../shared/consts/defaultStringsResponses';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Função que transforma um texto em um JSON', () => {

    describe('Casos de sucesso', () => {
        beforeEach(() => {
            // Simula o comportamento do axios.post
            mockedAxios.post.mockResolvedValue({
                data: {
                    choices: [
                        {
                            message: {
                                content: JSON.stringify(unstructuredBills[0]),
                            },
                        },
                    ],
                },
            });
        });

        test('Recebe um texto informando valor (por extenso) e data de vencimento (com ano de vencimento)', async () => {
            const result = await transformTextInAccount(accountsInNaturalLanguage[0]);
            expect(result).toEqual(unstructuredBills[0]);
        });
    });

    describe('Casos de erro', () => {
        beforeEach(() => {
            mockedAxios.post.mockResolvedValue({
                data: {
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({ error: true }),
                            },
                        },
                    ],
                },
            });
        });

        test('Recebe um texto em linguagem natural no qual não consegue transformar em objeto', async () => {
            await expect(transformTextInAccount(accountsInNaturalLanguage[10]))
                .rejects
                .toThrow(strings.cantTransformNLInBill);
        });
    });
});