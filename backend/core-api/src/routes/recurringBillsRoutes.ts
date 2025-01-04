import { Router } from "express";
import {
  getRecurringBills,
  createRecurringBill,
  updateRecurringBill,
  deleteRecurringBill
} from "../controllers/recurringBillsController";

const recurringBillsRouter = Router();

recurringBillsRouter.get("/", getRecurringBills);

recurringBillsRouter.post("/", createRecurringBill);

recurringBillsRouter.patch("/:id", updateRecurringBill);

recurringBillsRouter.delete("/:id", deleteRecurringBill);

export { recurringBillsRouter };
