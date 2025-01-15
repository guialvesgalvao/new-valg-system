import BaseRepository from "./base-repository";

export interface RegisterRepositoryParams {
  name: string;
  phone?: string;
  email: string;
  password: string;
}

export interface LoginRepositoryParams {
  email: string;
  password: string;
}

class AuthRepository extends BaseRepository {
  async login<T>(data: LoginRepositoryParams): Promise<T> {
    const { email, password } = data;

    try {
      return await this.api.post<T>("/login", { email, password });
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao realizar login.");
    }
  }

  async register<T>(data: RegisterRepositoryParams): Promise<T> {
    const { name, phone, email, password } = data;

    try {
      return await this.api.post<T>("/register", {
        name,
        celNumber: phone,
        email,
        password,
      });
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao registrar o usuário.");
    }
  }

  async logout(): Promise<void> {
    try {
      return await this.api.post("/logout");
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao realizar logout.");
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      return await this.api.post("/forgot-password", { email });
    } catch (error) {
      throw this.createErrorMessage(
        error,
        "Erro ao solicitar recuperação de senha."
      );
    }
  }

  async refreshToken(): Promise<void> {
    try {
      await this.api.post("/refresh-token");
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao atualizar o token.");
    }
  }

  async getLongLiveToken(): Promise<void> {
    try {
      return await this.api.post("/long-live-token");
    } catch (error) {
      throw this.createErrorMessage(
        error,
        "Erro ao obter o token de longa duração."
      );
    }
  }
}

export { AuthRepository };
