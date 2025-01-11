import { Router } from "express";
import {
  getRecurringBills,
  createRecurringBill,
  updateRecurringBill,
  deleteRecurringBill
} from "../controllers/recurringBillsController";
import { authenticateToken } from "../middlewares/authenticateToken";

const recurringBillsRouter = Router();

recurringBillsRouter.get("/", authenticateToken, getRecurringBills);

recurringBillsRouter.post("/", authenticateToken, createRecurringBill);

recurringBillsRouter.patch("/:id", authenticateToken, updateRecurringBill);

recurringBillsRouter.delete("/:id", authenticateToken, deleteRecurringBill);

export { recurringBillsRouter };
