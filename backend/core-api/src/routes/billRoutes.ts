import { Router } from "express";
import { getBills, createBill, updateBill, deleteBill, findBillId } from "../controllers/billsController";
import { authenticateToken } from "../middlewares/authenticateToken";

const billsRouter = Router();

billsRouter.get("/", authenticateToken, getBills);

billsRouter.post("/",authenticateToken, createBill);

billsRouter.patch("/",authenticateToken, updateBill);

billsRouter.delete("/:id",authenticateToken, deleteBill);

billsRouter.post("/finder/",authenticateToken, findBillId);

export { billsRouter }


