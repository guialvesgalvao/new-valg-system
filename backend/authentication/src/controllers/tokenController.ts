import { Request, Response } from "express";
import pool from "../config/db";
import jwt from "jsonwebtoken";
import { TokenType } from "../shared/enums/TokenType";
import { generateDateForExpire } from "../shared/helpers/generateDateForExpire";

interface CreateTokenRegisterInDBProps {
  userId: number;
  tokenType: TokenType;
  acessToken: string;
  refreshToken: string;
  acessTokenExpiresDate: Date | null;
  refreshTokenExpiresDate: Date;
}

async function createTokenRegisterInDB({
  userId,
  tokenType,
  acessToken,
  acessTokenExpiresDate,
  refreshToken,
  refreshTokenExpiresDate,
}: CreateTokenRegisterInDBProps) {
  try {
    const SQLQuery = `
    INSERT INTO sessions (user_id, acess_token, refresh_token, acess_token_expires_at,  refresh_token_expires_at, token_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
    await pool.query(SQLQuery, [
      userId,
      acessToken,
      refreshToken,
      acessTokenExpiresDate,
      refreshTokenExpiresDate,
      tokenType,
    ]);

  } catch (error) {
    throw new Error('Não foi possível criar o token no banco de dados',error)
  }
}

interface CreateTokenParams {
  userId: number;
  tokenType: TokenType;
}

function createToken({ userId, tokenType }: CreateTokenParams) {
  const acessTokenExpiresDate =
    tokenType === TokenType.LongLife ? null : generateDateForExpire(15);
  const refreshTokenExpiresDate =
    tokenType === TokenType.LongLife
      ? generateDateForExpire(60 * 24 * 365 * 5)
      : generateDateForExpire(60 * 24 * 7);

  const acessToken = jwt.sign(
    { id: userId }, 
      process.env.JWT_LONG_SECRET, 
    {
      expiresAt: acessTokenExpiresDate,
    }
);

  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_LONG_SECRET, {
    expiresAt: refreshTokenExpiresDate,
  });

  return {
    acessToken,
    refreshToken,
    acessTokenExpiresDate,
    refreshTokenExpiresDate,
  };
}

async function createLongLifeToken(req: Request, res: Response): Promise<void> {
  const { userId } = req.body
  
  try {
    const { acessToken, refreshToken, acessTokenExpiresDate, refreshTokenExpiresDate } = createToken({ userId, tokenType: TokenType.LongLife})
    await createTokenRegisterInDB({ userId, tokenType: TokenType.LongLife, acessToken, refreshToken, acessTokenExpiresDate, refreshTokenExpiresDate })

    res.status(201).json({ token: acessToken });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar o token" });
  }
}

async function refreshToken(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body;
  
  try {
    const SQLQuery = `
    SELECT * FROM sessions WHERE refresh_token = ${refreshToken} AND revoked = false
  `;
    res.status(200).json({ message: "Usuário logado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}


export {refreshToken, createLongLifeToken };
