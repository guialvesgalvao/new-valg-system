import { ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { TokenType } from "../shared/enums/TokenType";
import { generateDateForExpire } from "../shared/helpers/generateDateForExpire";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SessionRepository } from "../repositories/SessionRepository";
import { JWT_LONG_SECRET, OTP_SECRET } from "..";
import { DEFAULT_ACCESS_TOKEN_DURATION, LOG_LIFE_ACCESS_TOKEN_DURATION, OTP_DURATION, REFRESH_TOKEN_DURATION } from "../config/defaultConfigs";
import { totp } from 'otplib'
export class Token {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;

    this.create = this.create.bind(this);
    this.updateAccessToken = this.updateAccessToken.bind(this);
  }

  create(tokenType: TokenType) {
    const accessTokenExpiresDate =
      tokenType === TokenType.LongLife
        ? generateDateForExpire(LOG_LIFE_ACCESS_TOKEN_DURATION)
        : generateDateForExpire(DEFAULT_ACCESS_TOKEN_DURATION);

    const refreshTokenExpiresDate =
      tokenType === TokenType.LongLife
        ? null
        : generateDateForExpire(REFRESH_TOKEN_DURATION);

    const OTPExpiresDate = generateDateForExpire(OTP_DURATION);
    const OTPCode = parseInt(totp.generate(OTP_SECRET));

    const accessToken = jwt.sign(
      { userId: this.userId, tokenType: "accessToken" },
      JWT_LONG_SECRET
    );

    const refreshToken = jwt.sign(
      { userId: this.userId, tokenType: "refreshToken" },
      JWT_LONG_SECRET
    );

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresDate,
      refreshTokenExpiresDate,
      OTPCode,
      OTPExpiresDate
    };
  }

  async updateAccessToken(sessionId: number): Promise<string> {
    try {
      const accessTokenExpiresDate = generateDateForExpire(15);

      const accessToken = jwt.sign({ userId: this.userId }, JWT_LONG_SECRET);

      const SQLQuery = `
        UPDATE sessions
        SET access_token = ?, access_token_expires_at = ?
        WHERE id = ?
      `;

      const [result] = await pool.query<ResultSetHeader>(SQLQuery, [
        accessToken,
        accessTokenExpiresDate,
        sessionId,
      ]);

      if (result.affectedRows === 0) {
        throw new Error(`Session Id not found, ID = ${sessionId}.`);
      }

      return accessToken;
    } catch (error) {
      throw new Error("Não foi possível criar o token no banco de dados");
    }
  }

  async validateAccessToken(accessToken: string): Promise<number | null> {
    try {
      const decoded = jwt.verify(accessToken, JWT_LONG_SECRET) as JwtPayload;

      if (!decoded.userId) return null;

      const session = new SessionRepository();

      console.log("token Recebido aqui 2", accessToken, this.userId);

      const validateToken = await session.getAccessToken(
        decoded.userId,
        accessToken
      );
      console.log("token Recebido aqui 2", validateToken);

      if (!validateToken) return null;

      return decoded.userId;
    } catch (error) {
      return null;
    }
  }
}
