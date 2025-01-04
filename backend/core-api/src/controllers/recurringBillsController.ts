import { Request, Response } from "express";
import pool from "../config/db";
import { transformBillToText } from "../services/transformBillToText";
import { IBill, IBillDBSchema, IUnvalidatedBills } from "../shared/interfaces/IBill";
import { billFormatter } from "../shared/formatters/billsFormatter";
import { transformTextInBill } from "../services/transformTextInBill";
import { validateBill } from "../services/validateBill";
import { getObjectMetadata } from "../services/getObjectMetadata";
import { findBillIdWithOpenAI } from "../services/findBillIdWithOpenAI";
import { validateQueryParams } from "../shared/utils/validateQueryParams";
import { recurringBillsValidator } from "../validations/recurringBillsValidator";
import { recurringBillsFormatter } from "../shared/formatters/recurringBillsFormatter";
import { IRecurringBillDBSchema } from "../shared/interfaces/IRecurringBill";

async function getRecurringBills(req: Request, res: Response): Promise<void> {
  try {
    const SQLQuery = "SELECT * FROM bill_recurrences";

    const [rows] = await pool.query(SQLQuery);
    const recurringBills = recurringBillsFormatter(rows as IRecurringBillDBSchema[]);

    res.status(200).json(recurringBills);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function createRecurringBill(req: Request, res: Response) {
  const { data } = req.body;

  if (!data) {
    res.status(400).json({ error: "É necessário informar o parâmetro 'data' com o array de contas à ser criada" });
    return;
  }

  try {
    const recurringBillValidator = recurringBillsValidator.safeParse(data);

    if (recurringBillValidator.error) {
      res.status(400).json({ error: recurringBillValidator.error });
      return;
    }

    const SQLQuery = `
        INSERT INTO bill_recurrences (name, average_amount, day_of_due, end_date, user, enabled)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    await pool.query(SQLQuery, [
      data.name,
      data.averageAmount,
      data.dayOfDue,
      data.endDate,
      data.enabled,
      "default_user"
    ]);

    res.status(201).json({ message: "Conta recorrente criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar a conta recorrente informada" });
  }
}

async function updateRecurringBill(req: Request, res: Response) {
  const { data } = req.body;
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: "Id para atualização não informado" });
    return;
  }

  if (!data) {
    res.status(400).json({ error: "É necessário informar o parâmetro 'data' com o array de contas à ser atualizada" });
    return;
  }

  try {
    const [existingBill] = await pool.query("SELECT * FROM bill_recurrences WHERE id = ?", [id]);

    if ((existingBill as IBill[]).length === 0) {
      res.status(404).json({ error: "Conta recorrente não encontrada." });
      return;
    }

    const fieldMap = {
      name: "name",
      amount: "amount",
      due_date: "due_date",
      status: "status",
      isRecurring: []
    };
  

    const { fieldsToUpdate, metadataValues } = getObjectMetadata<IUnvalidatedBills>(data, fieldMap);

    if (fieldsToUpdate.length === 0) {
      res.status(400).json({ error: "Nenhum campo foi informado para atualização." });
      return;
    }

    const SQLUpdateQuery = `UPDATE bill_recurrences SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    await pool.query(SQLUpdateQuery, [...metadataValues, data.id]);

    res.status(201).json({ message: "Conta recorrente atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro durante o processo de atualização da conta recorrente" });
  }
}

async function deleteRecurringBill(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      error: "É necessário informar um ID da conta recorrente que será deletada"
    });
    return;
  }

  try {
    const [existingBill] = await pool.query("SELECT * FROM bill_recurrences WHERE id = ?", [id]);

    if ((existingBill as IBill[]).length === 0) {
      res.status(404).json({ error: "Conta não encontrada." });
      return;
    }

    const SQLQuery = `DELETE FROM bill_recurrences WHERE id = ${id}`;

    await pool.query(SQLQuery);

    res.status(200).json({ message: "Conta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getRecurringBills, createRecurringBill, updateRecurringBill, deleteRecurringBill };
