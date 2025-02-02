import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SessionRepository } from "../repositories/SessionRepository";
import { JWT_LONG_SECRET } from "..";

export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Token não encontrado" });
    return;
  }

  const [bearer, accessToken] = authHeader.split(" ");

  if (bearer !== "Bearer" || !accessToken) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }

  const userId = await validateAccessToken(accessToken);

  if (!userId) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }

  res.locals.userId = userId;

  next();
}

async function validateAccessToken(accessToken: string): Promise<number | null> {
  const session = new SessionRepository();

  try {
    const decoded = jwt.verify(accessToken, JWT_LONG_SECRET) as JwtPayload;

    const { userId } = decoded;

    if (!userId) return null;

    const validateToken = await session.getAccessToken(userId, accessToken);

    if (!validateToken) return null;

    return userId;
  } catch (err) {
    return null;
  }
}
