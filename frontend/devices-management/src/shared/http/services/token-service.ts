import {
  CreateLongLifeResponse,
  RefreshTokenResponse,
  TokenRepository,
} from "../repositories/token-repository";
import { BaseService } from "./base-service";

class TokenService extends BaseService<TokenRepository> {
  constructor(repository: TokenRepository) {
    super(repository);

    this.createLongLife = this.createLongLife.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      return await this.repository.refreshToken();
    } catch (error) {
      throw this.getErrorMessage(error, "Error updating token.");
    }
  }

  async createLongLife(): Promise<CreateLongLifeResponse> {
    console.log(this);

    try {
      return await this.repository.createLongLife();
    } catch (error) {
      throw this.getErrorMessage(error, "Error getting long life token.");
    }
  }
}

export { TokenService };
