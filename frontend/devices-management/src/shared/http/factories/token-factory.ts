import ApiInstance from "../api/api-instance/api-instance";
import AuthApiInterceptors from "../api/api-interceptors/api-auth-interceptor";

import ApiService from "../api/api-service/api-service";
import { TokenRepository } from "../repositories/token-repository";
import { TokenService } from "../services/token-service";

const initializeTokenService = (): TokenService => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/token";
  const api = new ApiInstance(baseURL, {
    withCredentials: true,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const interceptors = new AuthApiInterceptors(api);

  const service = new ApiService(api.instance, interceptors);
  const repository = new TokenRepository(service);

  return new TokenService(repository);
};

const tokenService = initializeTokenService();

export { tokenService };
