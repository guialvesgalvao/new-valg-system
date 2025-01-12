import { AuthRepository } from "../repositories/auth-repository";
import { BaseService } from "./base-service";

class AuthService extends BaseService<AuthRepository> {
  /**
   * Realiza login do usuário.
   * @param email - Endereço de e-mail do usuário.
   * @param password - Senha do usuário.
   * @returns Dados do usuário autenticado.
   */
  async login(email: string, password: string) {
    try {
      this._validateEmail(email);
      this._validatePassword(password);

      return await this.repository.login(email, password);
    } catch (error) {
      throw this.getErrorMessage(error, "Login failed");
    }
  }

  /**
   * Registra um novo usuário.
   * @param email - Endereço de e-mail do usuário.
   * @param password - Senha do usuário.
   * @param confirmPassword - Confirmação da senha.
   * @returns Dados do usuário registrado.
   */
  async register(email: string, password: string, confirmPassword: string) {
    try {
      this._validateEmail(email);
      this._validatePassword(password);
      this._validatePasswordMatch(password, confirmPassword);

      return await this.repository.register(email, password);
    } catch (error) {
      throw this.getErrorMessage(error, "Registration failed");
    }
  }

  /**
   * Realiza logout do usuário.
   * @returns Confirmação do logout.
   */
  async logout() {
    try {
      return await this.repository.logout();
    } catch (error) {
      throw this.getErrorMessage(error, "Logout failed");
    }
  }

  /**
   * Envia um e-mail para recuperação de senha.
   * @param email - Endereço de e-mail do usuário.
   * @returns Confirmação do envio do e-mail.
   */
  async forgotPassword(email: string) {
    try {
      this._validateEmail(email);
      return await this.repository.forgotPassword(email);
    } catch (error) {
      throw this.getErrorMessage(error, "Password recovery failed");
    }
  }

  private _validateEmail(email: string): void {
    if (!email) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  private _validatePassword(password: string): void {
    if (!password) {
      throw new Error("Password is required");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
  }

  private _validatePasswordMatch(
    password: string,
    confirmPassword: string
  ): void {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
  }
}

export { AuthService };
