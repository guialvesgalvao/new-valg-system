import { RowDataPacket } from "mysql2";
import { ISession } from "../interfaces/ISession";
import pool from "../config/db";

export class SessionRepository {

  async getAcessToken(userId: number, acessToken: string) {
    const SQLQuery = `SELECT * FROM sessions WHERE acess_token_expires_at > CURRENT_DATE AND user_id = ? AND acess_token = ? AND revoked = false`;
    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [userId, acessToken]);

    if (rows.length > 0) {
      return rows[0] as ISession;
    }

    return null;
  }
}
