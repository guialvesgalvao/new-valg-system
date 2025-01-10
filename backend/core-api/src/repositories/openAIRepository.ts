import axios from 'axios'
import dotenv from 'dotenv';
import { IBill } from '../shared/interfaces/IBill';

dotenv.config();

interface IOpenAIRepositoryProps {
    maxTokens?: number;
    systemPrompt: string;
    userPrompt: string;
}

export async function openAIRepository({ maxTokens, systemPrompt, userPrompt }: IOpenAIRepositoryProps): Promise<IBill> {
    try {
        const requestBody = {
            max_tokens: maxTokens ?? 200,
            temperature: 0,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
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
