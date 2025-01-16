import {
  CreateLongLifeResponse,
  TokenRepository,
} from "../repositories/token-repository";
import { BaseService } from "./base-service";

class TokenService extends BaseService<TokenRepository> {
  async refreshToken() {
    try {
      return await this.repository.refreshToken();
    } catch (error) {
      throw this.getErrorMessage(error, "Error updating token.");
    }
  }

  async createLongLife(): Promise<CreateLongLifeResponse> {
    try {
      return await this.repository.createLongLife();
    } catch (error) {
      throw this.getErrorMessage(error, "Error getting long life token.");
    }
  }
}

export { TokenService };
