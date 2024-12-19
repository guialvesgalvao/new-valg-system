import { Router } from "express";
import { getBills, createBill, updateBill, deleteBill } from "../controllers/billsController";

const billsRouter = Router();

billsRouter.get("/", getBills);

billsRouter.post("/", createBill);

billsRouter.put("/:id", updateBill);

billsRouter.delete("/:id",deleteBill);

export { billsRouter }


