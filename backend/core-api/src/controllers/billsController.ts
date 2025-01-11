import { Request, Response } from "express";
import { transformBillToText } from "../services/transformBillToText";
import { IBill } from "../shared/interfaces/IBill";
import { transformTextInBill } from "../services/transformTextInBill";
import { validateBill } from "../services/validateBill";
import { findBillIdWithOpenAI } from "../services/findBillIdWithOpenAI";
import { BillService } from "../services/BillService";
import { BillRepository } from "../repositories/BillRepository";

async function getBills(req: Request, res: Response): Promise<void> {
  const { isOverdue, returnMode } = req.query;
  const userId = res.locals.userId;

  try {
    const billService = new BillService(userId);
    const bills = await billService.get(isOverdue === "true");

    if (returnMode !== "text") {
      res.status(200).json(bills);
      return;
    }

    const transformedBills = transformBillToText(bills);

    res.status(200).json(transformedBills);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível coletar as contas" });
  }
}

async function createBill(req: Request, res: Response) {
  const { dataType, data } = req.body;
  const userId = res.locals.userId;

  try {
    if (!data || !dataType) {
      res.status(400).json({ error: "os parâmetros 'dataType' e 'data' são obrigatórios" });
      return;
    }

    const bill: IBill = dataType === "text" ? await transformTextInBill(data) : data;

    const billValidator = validateBill(bill);

    if (billValidator) {
      res.status(400).json({ error: billValidator });
      return;
    }

    const billRepository = new BillRepository(userId);
    const createBill = await billRepository.create(bill);

    if (createBill) {
      res.status(201).json({ message: "Conta criada com sucesso!" });
      return;
    }

    res.status(500).json({ error: "Erro ao processar a conta informada" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar a conta informada" });
  }
}

async function updateBill(req: Request, res: Response) {
  const { data } = req.body;
  const userId = res.locals.userId;
  const billRepository = new BillRepository(userId);
  const billService = new BillService(userId);

  try {
    if (!data.id) {
      res.status(400).json({ error: "É obrigatório utilizar informar o ID da conta." });
      return;
    }
    const checkBillExist = await billRepository.checkBillExist(data.id);

    if (checkBillExist) {
      res.status(404).json({ error: "Conta não encontrada." });
      return;
    }

    const updateBill = await billService.updateBillMetadata(data, data.id);

    if (updateBill) {
      res.status(201).json({ message: "Conta atualizada com sucesso!" });
      return;
    }

    res.status(500).json({ error: "Erro durante o processo de atualização da conta" });
  } catch (error) {
    res.status(500).json({ error: "Erro durante o processo de atualização da conta" });
  }
}

async function deleteBill(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;
  const billRepository = new BillRepository(userId);

  try {
    const parsedId = parseInt(id);
    if (!parsedId) {
      res.status(400).json({ error: "É necessário informar um ID da conta que será deletada" });
      return;
    }

    const checkBillExist = await billRepository.checkBillExist(parsedId);

    if (checkBillExist) {
      res.status(404).json({ error: "Conta não encontrada." });
      return;
    }

    const deleteBill = await billRepository.delete(parsedId);

    if (deleteBill) {
      res.status(200).json({ message: "Conta deletada com sucesso" });
      return;
    }

    res.status(500).json({ error: "Erro durante o processo de exclusão da conta" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function findBillId(req: Request, res: Response) {
  const { data } = req.body;
  const userId = res.locals.userId;

  if (!data || data.trim() === "") {
    res.status(400).json({ error: "É necessário informar o parâmetro data com o texto do usuário" });
    return;
  }

  try {
    const billId = await findBillIdWithOpenAI(data, userId);

    res.status(200).json({ message: billId });
  } catch (error) {
    res.status(500).json({ error: "Não foi possível determinar o ID da conta a partir da fala informada." });
  }
}

export { getBills, createBill, updateBill, deleteBill, findBillId };
