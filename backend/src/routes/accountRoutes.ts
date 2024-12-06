import { Router } from "express";
import { getAccount, createAccount, updateAccount, deleteAccount } from "../controllers/accountController";

const router = Router();

router.get("/", getAccount);

router.post("/", createAccount);

router.put("/:id", updateAccount);

router.delete("/:id",deleteAccount);

export default router


