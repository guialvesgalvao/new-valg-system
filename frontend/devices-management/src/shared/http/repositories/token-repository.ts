import BaseRepository from "./base-repository";

export interface CreateLongLifeResponse {
  accessToken: string;
  OTPCode: number;
  OTPExpiresDate: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

class TokenRepository extends BaseRepository {
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      return await this.api.post<RefreshTokenResponse>("/refresh");
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao atualizar o token.");
    }
  }

  async createLongLife(): Promise<CreateLongLifeResponse> {
    try {
      return await this.api.post("/long-life");
    } catch (error) {
      throw this.createErrorMessage(
        error,
        "Erro ao obter o token de longa duração."
      );
    }
  }
}

export { TokenRepository };
