import { RowDataPacket } from "mysql2";
import { ISession } from "../interfaces/ISession";
import pool from "../config/db";

export class SessionRepository {

  async getAccessToken(userId: number, accessToken: string) {
    const SQLQuery = `SELECT * FROM sessions WHERE access_token_expires_at > CURRENT_DATE AND user_id = ? AND access_token = ? AND revoked = false`;
    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [userId, accessToken]);

    if (rows.length > 0) {
      return rows[0] as ISession;
    }

    return null;
  }
}
