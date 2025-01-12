import BaseRepository from "./base-repository";

class AuthRepository extends BaseRepository {
  async login<T>(email: string, password: string): Promise<T> {
    try {
      return await this.api.post<T>("/auth/login", { email, password });
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao realizar login.");
    }
  }

  async register<T>(email: string, password: string): Promise<T> {
    try {
      return await this.api.post<T>("/auth/register", {
        email,
        password,
      });
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao registrar o usuário.");
    }
  }

  async logout(): Promise<void> {
    try {
      return await this.api.post("/auth/logout");
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao realizar logout.");
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      return await this.api.post("/auth/forgot-password", { email });
    } catch (error) {
      throw this.createErrorMessage(
        error,
        "Erro ao solicitar recuperação de senha."
      );
    }
  }

  async refreshToken(): Promise<void> {
    try {
      await this.api.post("/auth/refresh-token");
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao atualizar o token.");
    }
  }

  async getLongLiveToken(): Promise<void> {
    try {
      return await this.api.post("/auth/long-live-token");
    } catch (error) {
      throw this.createErrorMessage(
        error,
        "Erro ao obter o token de longa duração."
      );
    }
  }
}

export { AuthRepository };
