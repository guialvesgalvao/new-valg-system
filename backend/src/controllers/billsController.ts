import { Request, Response } from "express";
import pool from "../config/db";
import { transformAccountToText } from "../services/transformAccountToText";
import { IBillDBSchema } from "../shared/interfaces/IBill";
import { billFormatter } from "../shared/formatters/billsFormatter";

async function getBills(req: Request, res: Response): Promise<void> {
  const { isOverdue, returnMode } = req.query;

  const SQLQuery = isOverdue === "true" ? "SELECT * FROM bills WHERE due_date < CURRENT_DATE" : "SELECT * FROM bills";

  try {
    const [rows] = await pool.query(SQLQuery);
    const bills = billFormatter(rows as IBillDBSchema[]);

    if (returnMode !== "text") {
      res.status(200).json(bills);
      return;
    }

    const transformedAccounts = transformAccountToText(bills);
    res.status(200).json(transformedAccounts);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function createBill(req: Request, res: Response) {
  // identifica se a conta está em texto em JSON
  // se JSON transformTextInAccount
  const {} = req.body;
  //valida a conta

  //cria conta no banco

  //retorna status code e conta atualizada com sucesso
  try {
    console.log("getBill");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateBill(req: Request, res: Response) {
  //identificar o método chamado
  //se possui os parâmetros de busca necessários ou é um texto
  // se texto, tenta transformar o texto em objeto de busca
  // transformAccountInfoInSQLQuery
  //busca os dados e atualiza
  //se método de entrada foi texto, atribui como paga
  //retorna status code e conta atualizada com sucesso
  try {
    console.log("getBill");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteBill(req: Request, res: Response) {
  //identificar método chamado
  //se possui os parâmetros de busca necessários ou é um texto
  // se texto, tenta transformar o texto em objeto de busca
  // transformAccountInfoInSQLQuery
  //busca os dados e deleta
  //retorna status code e conta deletada com sucesso
  try {
    console.log("getBill");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getBills, createBill, updateBill, deleteBill };

// const createBillSchema = z.object({
//   name: z.string().nonempty(),
//   age: z.number().int().positive(),
//   lol: z.string(),
// });

// export type FolderColumnSchemaType = z.infer<typeof createBillSchema>;
