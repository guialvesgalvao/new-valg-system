import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import { TokenType } from "../shared/enums/TokenType";
import { ISession } from "../interfaces/ISession";

interface CreateTokenRegisterInDBProps {
  userId: number;
  tokenType: TokenType;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresDate: Date;
  refreshTokenExpiresDate: Date | null;
  OTPCode: number;
  OTPExpiresDate: Date;
}

export class SessionRepository {
  async create({
    userId,
    tokenType,
    accessToken,
    accessTokenExpiresDate,
    refreshToken,
    refreshTokenExpiresDate,
    OTPCode,
    OTPExpiresDate,
  }: CreateTokenRegisterInDBProps): Promise<boolean> {
    const SQLQuery =
      "INSERT INTO sessions (user_id, access_token, refresh_token, access_token_expires_at,  refresh_token_expires_at, token_type, otp_code, otp_code_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const [results] = await pool.query<ResultSetHeader>(SQLQuery, [
      userId,
      accessToken,
      refreshToken,
      accessTokenExpiresDate,
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

  async getAccessToken(userId: number, accessToken: string) {
    const dateNow = new Date();
    const SQLQuery =
      "SELECT * FROM sessions WHERE access_token_expires_at > ? AND user_id = ? AND access_token = ? AND revoked = false";

    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [
      dateNow,
      userId,
      accessToken,
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
      
      if (rows.length > 0 && rows[0].access_token && rows[0].id) {
        return { accessToken: rows[0].access_token, sessionId: rows[0].id };
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

      if (rows.length > 0 && rows[0].access_token) {
        return rows[0].access_token;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
