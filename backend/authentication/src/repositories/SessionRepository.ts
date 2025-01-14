import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import { TokenType } from "../shared/enums/TokenType";
import { ISession } from "../interfaces/ISession";

interface CreateTokenRegisterInDBProps {
  userId: number;
  tokenType: TokenType;
  acessToken: string;
  refreshToken: string;
  acessTokenExpiresDate: Date;
  refreshTokenExpiresDate: Date | null;
  OTPCode: number;
  OTPExpiresDate: Date;
}

export class SessionRepository {
  async create({
    userId,
    tokenType,
    acessToken,
    acessTokenExpiresDate,
    refreshToken,
    refreshTokenExpiresDate,
    OTPCode,
    OTPExpiresDate,
  }: CreateTokenRegisterInDBProps): Promise<boolean> {
    const SQLQuery =
      "INSERT INTO sessions (user_id, acess_token, refresh_token, acess_token_expires_at,  refresh_token_expires_at, token_type, otp_code, otp_code_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const [results] = await pool.query<ResultSetHeader>(SQLQuery, [
      userId,
      acessToken,
      refreshToken,
      acessTokenExpiresDate,
      refreshTokenExpiresDate,
      tokenType,
      OTPCode,
      OTPExpiresDate,
    ]);

    if (results.affectedRows) {
      return results.affectedRows > 0;
    }

    return false;
  }

  async getActiveSession(refreshToken: string): Promise<ISession | null> {
    const SQLQuery =
      "SELECT * FROM sessions WHERE refresh_token = ? AND revoked = false";

    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [refreshToken]);

    if (rows.length > 0) {
      return rows[0] as ISession;
    }

    return null;
  }

  async getAcessToken(userId: number, acessToken: string) {
    const dateNow = new Date();
    const SQLQuery =
      "SELECT * FROM sessions WHERE acess_token_expires_at > ? AND user_id = ? AND acess_token = ? AND revoked = false";

    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [
      dateNow,
      userId,
      acessToken,
    ]);

    if (rows.length > 0) {
      return rows[0] as ISession;
    }

    return null;
  }

  async getByOTP(OTPCode: number) {
    try {
      const dateNow = new Date();
      
      const SQLQuery =
      "SELECT * FROM sessions WHERE otp_code = ? AND otp_code_expires_at > ?";
      
      const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [
        OTPCode,
        dateNow
      ]);
      
      if (rows.length > 0 && rows[0].acess_token && rows[0].id) {
        return { acessToken: rows[0].acess_token, sessionId: rows[0].id };
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  async updateAmazonUserId(sessionId: number, amazonUserId: string) {
    const SQLQuery = "UPDATE sessions SET amazon_user_id = ? WHERE id = ?";

    try {
      const [result] = await pool.query<ResultSetHeader>(SQLQuery, [
        amazonUserId,
        sessionId,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }

  async getLongLifeTokenByAmazonUserId(
    amazonUserId: string
  ): Promise<string | null> {
    try {
      const SQLQuery =
        "SELECT * FROM sessions WHERE amazon_user_id = ? AND token_type = ?";
      const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [
        amazonUserId,
        TokenType.LongLife,
      ]);

      if (rows.length > 0 && rows[0].acess_token) {
        return rows[0].acess_token;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
