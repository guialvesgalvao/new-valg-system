import { Request, Response } from "express";
import { RecurringBillService } from "../services/RecurringBillService";
import { RecurringBillRepository } from "../repositories/RecurringBillRepository";

async function getRecurringBills(req: Request, res: Response) {
  const userId = res.locals.userId;
  const service = new RecurringBillService(userId);

  try {
    const recurringBills = await service.get();

    res.status(200).json(recurringBills);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function createRecurringBill(req: Request, res: Response) {
  const { data } = req.body;
  const userId = res.locals.userId;
  const service = new RecurringBillService(userId);

  if (!data) {
    res.status(400).json({ error: "É necessário informar o parâmetro 'data' com o array de contas à ser criada" });
    return;
  }

  try {
    const createBill = await service.create(data);

    if (createBill) {
      res.status(400).json({ error: createBill });
    }

    res.status(201).json({ message: "Conta recorrente criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar a conta recorrente informada" });
  }
}

async function updateRecurringBill(req: Request, res: Response) {
  const { data } = req.body;
  const { id } = req.query;
  const userId = res.locals.userId;
  const service = new RecurringBillService(userId);
  const repository = new RecurringBillRepository(userId);

  if (!parseInt(id as string)) {
    res.status(400).json({ error: "Id para atualização não informado" });
    return;
  }

  if (!data) {
    res.status(400).json({ error: "É necessário informar o parâmetro 'data' com o array de contas à ser atualizada" });
    return;
  }

  try {
    const checkBillExist = await repository.checkRecurringBillExist(parseInt(id as string));

    if (!checkBillExist) {
      res.status(404).json({ error: "Conta recorrente não encontrada." });
      return;
    }

    const updateBill = await service.updateRecurringBillMetadata(data, parseInt(id as string));
    if (updateBill) {
      res.status(201).json({ message: "Conta recorrente atualizada com sucesso!" });
      return;
    }

    res.status(500).json({ error: "Erro durante o processo de atualização da conta recorrente" });
  } catch (error) {
    res.status(500).json({ error: "Erro durante o processo de atualização da conta recorrente" });
  }
}

async function deleteRecurringBill(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;
  const repository = new RecurringBillRepository(userId);

  if (!id) {
    res.status(400).json({
      error: "É necessário informar o ID da conta recorrente que será deletada"
    });
    return;
  }

  try {
    const checkBillExist = await repository.checkRecurringBillExist(parseInt(id));

    if (!checkBillExist) {
      res.status(404).json({ error: "Conta não encontrada." });
      return;
    }

    const deleteRecurringBill = await repository.delete(parseInt(id));

    if (deleteRecurringBill) {
      res.status(200).json({ message: "Conta deletada com sucesso" });
      return;
    }

    res.status(500).json({ error: "Erro no processo de exclusão da conta" });
  } catch (error) {
    res.status(500).json({ error: "Erro no processo de exclusão da conta" });
  }
}

export { getRecurringBills, createRecurringBill, updateRecurringBill, deleteRecurringBill };
