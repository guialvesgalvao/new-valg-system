import { Router } from "express";
import { loginUser, createUser, updateAmazonUserId, getLongLifeTokenByAmazonUserId } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", createUser);
authRouter.patch("/register-amazonuserid", updateAmazonUserId);
authRouter.get("/get-amazon-userid-by-amazonuserid", getLongLifeTokenByAmazonUserId);

export { authRouter };
