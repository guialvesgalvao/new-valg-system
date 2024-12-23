import pool from "../config/db";
import { promptToFindBillId } from "../config/LLMPrompt";
import { openAIRepository } from "../repositories/openAIRepository";
import { IBillDBSchema } from "../shared/interfaces/IBill";

export async function findBillIdWithOpenAI(userText: string) {
  const openBills = await getOpenBills();
  const billsInNaturalLanguage = transformBillsToFindId(openBills);

  const createUserPrompt = joinBillOptionsWithPrompt(userText, billsInNaturalLanguage);
  const getOpenAIResonse = openAIRepository({ systemPrompt: promptToFindBillId, userPrompt: createUserPrompt, maxTokens: 1000})

  return getOpenAIResonse
}

export async function getOpenBills() {
  try {
    const SQLQuery = "SELECT * FROM bills WHERE due_date < CURRENT_DATE";
    const [rows] = await pool.query(SQLQuery);

    return rows as IBillDBSchema[];
  } catch (error) {
    throw new Error("Não foi possível obter as contas em aberto");
  }
}

export function transformBillsToFindId(bills: IBillDBSchema[]) {
  const mappedStrings = bills.map((bill) => {
    const naturalLanguageDuedate = new Date(bill.due_date).toLocaleDateString("pt-BR");

    return `${bill.name} no valor de ${bill.amount} reais, vencimento em ${naturalLanguageDuedate}, possui o ID ${bill.id}.`;
  });

  return mappedStrings.join("\n");
}

export function joinBillOptionsWithPrompt(userText: string, billsInNaturalLanguage: string) {
  return `
    ### Lista de Contas:
    ${billsInNaturalLanguage}

    ### Texto do Usuário:
    ${userText}
    `;
}