import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenType } from "../shared/enums/TokenType";
import { Token } from "../models/Token";
import { SessionRepository } from "../repositories/sessionRepository";
import { JWT_LONG_SECRET } from "..";

async function createLongLifeToken(req: Request, res: Response): Promise<void> {
  const userId = res.locals.userId;

  try {
    const token = new Token(userId);
    const session = new SessionRepository();

    const {
      acessToken,
      refreshToken,
      acessTokenExpiresDate,
      refreshTokenExpiresDate,
    } = token.create(TokenType.LongLife);

    await session.create({
      userId,
      tokenType: TokenType.LongLife,
      acessToken,
      refreshToken,
      acessTokenExpiresDate,
      refreshTokenExpiresDate,
    });

    res.status(201).json({ token: acessToken });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar o token" });
  }
}

async function refreshToken(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh Token não informado" });
    return;
  }

  try {
    const sessions = new SessionRepository()
    const userSession = await sessions.getActiveSession(refreshToken)
  
    if (!userSession) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }
    const decodedJWT = jwt.verify(refreshToken, JWT_LONG_SECRET);

    if (!decodedJWT.userId) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const token = new Token(decodedJWT.userId);

    const updateRefreshToken = token.updateAcessToken(userSession.id);

    res.status(200).json({ token: updateRefreshToken });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export { refreshToken, createLongLifeToken };
