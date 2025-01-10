import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SessionRepository } from "../repositories/SessionRepository";
import { ICustomRequest } from "../interfaces/ICustomRequest";


export async function authenticateToken(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Token não encontrado" });
    return;
  }

  const [bearer, acessToken] = authHeader.split(" ");

  if (bearer !== "Bearer" || !acessToken) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }

  const userId = await validateAccessToken(acessToken);

  if (!userId) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }

  req.userId = userId;

  next();
}

async function validateAccessToken(accessToken: string): Promise<number | null> {
  const session = new SessionRepository();

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_LONG_SECRET ?? "") as JwtPayload;

    const { userId } = decoded;

    if (!userId) return null;

    const validateToken = await session.getAcessToken(userId, accessToken);

    if (!validateToken) return null;

    return userId;
  } catch (err) {
    return null;
  }
}
