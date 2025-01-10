import { RowDataPacket } from "mysql2";
import pool from "../config/db";
import { TokenType } from "../shared/enums/TokenType";
import { ISession } from "../interfaces/ISession";

interface CreateTokenRegisterInDBProps {
  userId: number;
  tokenType: TokenType;
  acessToken: string;
  refreshToken: string;
  acessTokenExpiresDate: Date | null;
  refreshTokenExpiresDate: Date;
}

export class SessionRepository {
  async create({
    userId,
    tokenType,
    acessToken,
    acessTokenExpiresDate,
    refreshToken,
    refreshTokenExpiresDate,
  }: CreateTokenRegisterInDBProps): Promise<void> {
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
      throw new Error("Não foi possível criar o token no banco de dados");
    }
  }

  async getActiveSession(refreshToken: string): Promise<ISession | null> {
    const SQLQuery = `SELECT * FROM sessions WHERE refresh_token = ? AND revoked = false`;

    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [refreshToken]);

    if (rows.length > 0) {
      return rows[0] as ISession;
    }

    return null;
  }

  async getAcessToken(userId: number, acessToken: string) {
    const SQLQuery = `SELECT * FROM sessions WHERE acess_token_expires_at > CURRENT_DATE AND user_id = ? AND acess_token = ? AND revoked = false`;
    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [
      userId,
      acessToken,
    ]);

    if (rows.length > 0) {
      return rows[0] as ISession;
    }

    return null;
  }
}
