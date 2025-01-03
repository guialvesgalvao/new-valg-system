import { Router } from "express";
import { getBills, createBill, updateBill, deleteBill, findBillId } from "../controllers/billsController";

const billsRouter = Router();

billsRouter.get("/", getBills);

billsRouter.post("/", createBill);

billsRouter.put("/", updateBill);

billsRouter.delete("/:id", deleteBill);

billsRouter.post("/finder/", findBillId);

export { billsRouter }


