import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", loginUser);

authRouter.post("/register", registerUser);

export { authRouter }


