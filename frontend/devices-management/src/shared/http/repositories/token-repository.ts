import BaseRepository from "./base-repository";

export interface CreateLongLifeResponse {
  accessToken: string;
  OTPCode: number;
  OTPExpiresDate: string;
}

export interface RefreshTokenResponse {
  token: string;
}

class TokenRepository extends BaseRepository {
  async refreshToken(token?: string) {
    try {
      if (!token) {
        return await this.api.post<RefreshTokenResponse>("/refresh");
      }

      return await this.api.post<RefreshTokenResponse>("/refresh", {
        refreshToken: token,
      });
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao atualizar o token.");
    }
  }

  async createLongLife() {
    try {
      return await this.api.post<CreateLongLifeResponse>("/long-life");
    } catch (error) {
      throw this.createErrorMessage(
        error,
        "Erro ao obter o token de longa duração."
      );
    }
  }
}

export { TokenRepository };
