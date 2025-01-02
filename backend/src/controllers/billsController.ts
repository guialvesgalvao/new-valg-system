import { Request, Response } from "express";
import pool from "../config/db";
import { transformBillToText } from "../services/transformBillToText";
import { IBill, IBillDBSchema } from "../shared/interfaces/IBill";
import { billFormatter } from "../shared/formatters/billsFormatter";
import { transformTextInBill } from "../services/transformTextInBill";
import { validateBill } from "../services/validateBill";
import { getBillMetadataToUpdate } from "../services/getBillMetadataToUpdate";
import { findBillIdWithOpenAI } from "../services/findBillIdWithOpenAI";
import { validateQueryParams } from "../shared/utils/validateQueryParams";

async function getBills(req: Request, res: Response): Promise<void> {
  const { isOverdue, returnMode } = req.query;

  try {
    validateQueryParams(
      { isOverdue: isOverdue as string, returnMode: returnMode as string },
      {
        isOverdue: (value) => value === "true" || value === undefined,
        returnMode: (value) => value === "text" || value === undefined,
      }
    );

    const SQLQuery = isOverdue === "true" ? "SELECT * FROM bills WHERE due_date < CURRENT_DATE" : "SELECT * FROM bills";

    const [rows] = await pool.query(SQLQuery);
    const bills = billFormatter(rows as IBillDBSchema[]);

    if (returnMode !== "text") {
      res.status(200).json(bills);
      return;
    }

    const transformedBills = transformBillToText(bills);
    res.status(200).json(transformedBills);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function createBill(req: Request, res: Response) {
  const { dataType, data } = req.body;

  try {
    if (!data || !dataType) {
      res.status(400).json({ error: "os parâmetros 'dataType' e 'data' são obrigatórios" });
      return;
    }

    const bill = dataType === "text" ? await transformTextInBill(data) : data;

    const billValidator = validateBill(bill);

    if (typeof billValidator == "string") {
      res.status(400).json({ error: billValidator });
      return;
    }

    const SQLQuery = `
        INSERT INTO bills (name, amount, due_date, status, is_generated_by_recurrence, user)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    await pool.query(SQLQuery, [
      bill.name,
      bill.amount,
      bill.due_date,
      bill.status || "",
      bill.isRecurring ? 1 : 0,
      "default_user",
    ]);

    res.status(201).json({ message: "Conta criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar a conta informada" });
  }
}

async function updateBill(req: Request, res: Response) {
  const { data } = req.body;
  try {
    if (!data.id) {
      res.status(400).json({ error: "É obrigatório utilizar informar o ID da conta." });
      return;
    }

    const [existingBill] = await pool.query("SELECT * FROM bills WHERE id = ?", [data.id]);

    if ((existingBill as IBill[]).length === 0) {
      res.status(404).json({ error: "Conta não encontrada." });
      return;
    }

    const { fieldsToUpdate, metadataValues } = getBillMetadataToUpdate(data);

    if (fieldsToUpdate.length === 0) {
      res.status(400).json({ error: "Nenhum campo foi informado para atualização." });
      return;
    }

    const SQLUpdateQuery = `UPDATE bills SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    await pool.query(SQLUpdateQuery, [...metadataValues, data.id]);

    res.status(201).json({ message: "Conta atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro durante o processo de atualização da conta" });
  }
}

async function deleteBill(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "É necessário informar um ID da conta que será deletada" });
    return;
  }

  try {
    const [existingBill] = await pool.query("SELECT * FROM bills WHERE id = ?", [id]);

    if ((existingBill as IBill[]).length === 0) {
      res.status(404).json({ error: "Conta não encontrada." });
      return;
    }

    const SQLQuery = `DELETE FROM bills WHERE id = ${id}`;

    await pool.query(SQLQuery);

    res.status(200).json({ message: "Conta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function findBillId(req: Request, res: Response) {
  const { data } = req.body;

  if (!data || data.trim() === "") {
    res.status(400).json({ error: "É necessário informar o parâmetro data com o texto do usuário" });
    return;
  }

  try {
    const billId = await findBillIdWithOpenAI(data);

    res.status(200).json({ message: billId });
  } catch (error) {
    res.status(500).json({ error: "Não foi possível determinar o ID da conta a partir da fala informada." });
  }
}

export { getBills, createBill, updateBill, deleteBill, findBillId };
