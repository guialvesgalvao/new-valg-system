import { ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { TokenType } from "../shared/enums/TokenType";
import { generateDateForExpire } from "../shared/helpers/generateDateForExpire";
import jwt, { DecodedToken } from "jsonwebtoken";
import { SessionRepository } from "../repositories/SessionRepository";
import { JWT_LONG_SECRET } from "..";

export class Token {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;

    this.create = this.create.bind(this);
    this.updateAcessToken = this.updateAcessToken.bind(this);
  }

  create(tokenType: TokenType) {
    const acessTokenExpiresDate =
      tokenType === TokenType.LongLife ? null : generateDateForExpire(15);
    const refreshTokenExpiresDate =
      tokenType === TokenType.LongLife
        ? generateDateForExpire(60 * 24 * 365 * 5)
        : generateDateForExpire(60 * 24 * 7);

    const acessToken = jwt.sign(
      { userId: this.userId },
      JWT_LONG_SECRET,
      {
        expiresAt: acessTokenExpiresDate,
      }
    );

    const refreshToken = jwt.sign(
      { userId: this.userId },
      JWT_LONG_SECRET,
      {
        expiresAt: refreshTokenExpiresDate,
      }
    );

    return {
      acessToken,
      refreshToken,
      acessTokenExpiresDate,
      refreshTokenExpiresDate,
    };
  }

  async updateAcessToken(sessionId: number): Promise<string> {
    try {
      const acessTokenExpiresDate = generateDateForExpire(15);

      const acessToken = jwt.sign(
        { userId: this.userId },
        JWT_LONG_SECRET,
        {
          expiresAt: acessTokenExpiresDate,
        }
      );

      const SQLQuery = `
        UPDATE sessions
        SET acess_token = ?, acess_token_expires_at = ?
        WHERE id = ?
      `;

      const [result] = await pool.query<ResultSetHeader>(SQLQuery, [
        acessToken,
        acessTokenExpiresDate,
        sessionId,
      ]);

      if (result.affectedRows === 0) {
        throw new Error(`Session Id not found, ID = ${sessionId}.`);
      }

      return acessToken;
    } catch (error) {
      throw new Error(
        "Não foi possível criar o token no banco de dados");
    }
  }

  async validateAcessToken(acessToken: string): Promise<number | null> {
    const session = new SessionRepository();
    
    const validate = jwt.verify(
      acessToken,
      JWT_LONG_SECRET,
      async (err, decoded) => {
        if (err) return null;

        const { userId } = decoded as DecodedToken;

        if (!userId) return null;

        const validateToken = await session.getAcessToken(userId, acessToken)

        if(!validateToken) return null

        return userId
      }
    );

    return validate;
  }
}
