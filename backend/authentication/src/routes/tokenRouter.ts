import { Router } from "express";
import { refreshToken, createLongLifeToken } from "../controllers/tokenController";
import { validateAccessToken } from "../middlewares/validateAccessToken";

const tokenRouter = Router();

tokenRouter.post("/long-life", validateAccessToken, createLongLifeToken);
tokenRouter.post("/refresh", refreshToken);

export { tokenRouter }


