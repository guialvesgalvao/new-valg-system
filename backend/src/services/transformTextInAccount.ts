import axios from 'axios'
import { promptToTransformTextInObject } from '../config/LLMPrompt';
import dotenv from 'dotenv';

dotenv.config();

export async function transformTextInAccount(userSpeech: string): Promise<string> {
    try {
        const requestBody = {
            max_tokens: 200,
            temperature: 0,
            messages: [
                { role: "system", content: promptToTransformTextInObject },
                { role: "user", content: userSpeech }
            ]
        };

        const headers = {
            'Content-Type': 'application/json',
            'api-key': process.env.AZURE_OPEN_AI_APIKEY,
        }

        const response = await axios.post(process.env.AZURE_OPEN_AI_ENDPOINT ?? '', requestBody, { headers });
        const res = JSON.parse(response.data.choices[0].message.content)
        return res

    } catch (error) {
        throw new Error('Não foi possível extrair os dados')
    }
}
