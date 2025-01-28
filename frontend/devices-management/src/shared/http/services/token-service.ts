import { TokenRepository } from "../repositories/token-repository";
import { BaseService } from "./base-service";

class TokenService extends BaseService<TokenRepository> {
  constructor(repository: TokenRepository) {
    super(repository);

    this.createLongLife = this.createLongLife.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async refreshToken(token?: string) {
    try {
      return await this.repository.refreshToken(token);
    } catch (error) {
      throw this.getErrorMessage(error, "Error updating token.");
    }
  }

  async createLongLife() {
    try {
      return await this.repository.createLongLife();
    } catch (error) {
      throw this.getErrorMessage(error, "Error getting long life token.");
    }
  }
}

export { TokenService };
