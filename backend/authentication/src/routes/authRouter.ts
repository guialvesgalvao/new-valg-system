import { Router } from "express";
import { loginUser, createUser } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", createUser);

export { authRouter };
