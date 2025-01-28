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

export interface LoginRepositoryResponse {
  accessToken: string;
}

class AuthRepository extends BaseRepository {
  async login(data: LoginRepositoryParams) {
    const { email, password } = data;

    try {
      return await this.api.post<LoginRepositoryResponse>("/login", {
        email,
        password,
      });
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao realizar login.");
    }
  }

  async register(data: RegisterRepositoryParams) {
    const { name, phone, email, password } = data;

    try {
      return await this.api.post<void>("/register", {
        name,
        celNumber: phone,
        email,
        password,
      });
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao registrar o usuário.");
    }
  }

  async logout() {
    try {
      return await this.api.post("/logout");
    } catch (error) {
      throw this.createErrorMessage(error, "Erro ao realizar logout.");
    }
  }

  async forgotPassword(email: string) {
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
}

export { AuthRepository };
