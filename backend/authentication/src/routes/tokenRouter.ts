import { Router } from "express";
import { refreshToken, createLongLifeToken } from "../controllers/tokenController";

const tokenRouter = Router();

tokenRouter.post("/long-life", createLongLifeToken);
tokenRouter.post("/refresh", refreshToken);

export { tokenRouter }


