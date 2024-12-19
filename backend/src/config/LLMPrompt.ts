export const LLMPrompt = `Você é um assistente de programação e sua tarefa é extrair informações de um texto e transformá-las em um JSON. O texto representa uma fala de uma pessoa e você precisa buscar os seguintes dados:

name: o nome da conta (ou algo relacionado).
amount: o valor da conta (caso presente).
due_date: a data de vencimento da conta (caso presente).
A estrutura do JSON deve ser:

{
  "name": string,
  "amount": number,
  "dueDate": "YYYY-MM-DDT00:00:00.000Z"
}

Se algum dos campos não for encontrado no texto, simplesmente não o inclua no JSON. Lembre-se, o JSON é a única coisa que você deve retornar, sem explicações ou outros textos. Eu irei executar JSON.parse() no seu retorno, então garanta que o formato do JSON esteja correto.`