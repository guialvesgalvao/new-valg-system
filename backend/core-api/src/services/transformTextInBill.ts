import dotenv from 'dotenv';
import { openAIRepository } from '../repositories/openAIRepository';
import { promptToTransformTextInObject } from '../config/LLMPrompt';
import { IBill } from '../shared/interfaces/IBill';

dotenv.config();

export async function transformTextInBill(userSpeech: string): Promise<IBill> {
    try {
        const getBill = await openAIRepository({ systemPrompt: promptToTransformTextInObject, userPrompt: userSpeech, maxTokens: 200})
        return getBill
    } catch (error) {
        throw new Error('Não foi possível extrair os dados')
    }
}
