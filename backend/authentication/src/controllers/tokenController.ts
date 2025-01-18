import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenType } from "../shared/enums/TokenType";
import { Token } from "../models/Token";
import { SessionRepository } from "../repositories/SessionRepository";
import { JWT_LONG_SECRET } from "..";

async function createLongLifeToken(req: Request, res: Response): Promise<void> {
  const userId = res.locals.userId;

  try {
    const token = new Token(userId);
    const session = new SessionRepository();

    const {
      accessToken,
      refreshToken,
      accessTokenExpiresDate,
      refreshTokenExpiresDate,
      OTPCode,
      OTPExpiresDate,
    } = token.create(TokenType.LongLife);

    const createRegisterInDB = await session.create({
      userId,
      tokenType: TokenType.LongLife,
      accessToken,
      refreshToken,
      accessTokenExpiresDate,
      refreshTokenExpiresDate,
      OTPCode,
      OTPExpiresDate,
    });

    if (createRegisterInDB) {
      res.status(201).json({ accessToken, OTPCode, OTPExpiresDate });
      return;
    }

    res.status(500).json({ error: "Erro ao gerar o token" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar o token" });
  }
}

async function refreshToken(req: Request, res: Response): Promise<void> {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.status(500).json({ error: "Refresh Token não informado" });
    return;
  }

  try {
    const sessions = new SessionRepository();
    const userSession = await sessions.getActiveSession(refreshToken);

    if (!userSession) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const decodedJWT = jwt.verify(refreshToken, JWT_LONG_SECRET) as JwtPayload;

    if (!decodedJWT.userId) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const token = new Token(decodedJWT.userId);

    const newAccessToken = await token.updateAccessToken(userSession.id);

    if (newAccessToken) {
      res.status(200).json({ token: newAccessToken });
      return;
    }

    res
      .status(500)
      .json({ error: "Não foi possível atualizar o token de accesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível atualizar o token de accesso" });
  }
}

export { refreshToken, createLongLifeToken };
