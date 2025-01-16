import BaseRepository from "./base-repository";

export interface CreateLongLifeResponse {
  accessToken: string;
  OTPCode: number;
  OTPExpiresDate: string;
}

class TokenRepository extends BaseRepository {
  async refreshToken(): Promise<void> {
    try {
      return await this.api.post("/refresh-token");
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
