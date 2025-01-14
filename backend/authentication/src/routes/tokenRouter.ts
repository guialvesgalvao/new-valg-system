import { Router } from "express";
import { refreshToken, createLongLifeToken } from "../controllers/tokenController";
import { validateAcessToken } from "../middlewares/validateAcessToken";

const tokenRouter = Router();

tokenRouter.post("/long-life", validateAcessToken, createLongLifeToken);
tokenRouter.post("/refresh", refreshToken);

export { tokenRouter }


