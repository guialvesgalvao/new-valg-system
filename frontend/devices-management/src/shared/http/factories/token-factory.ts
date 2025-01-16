import ApiInstance from "../api/api-instance/api-instance";
import ApiInterceptors from "../api/api-interceptors/api-interceptors";
import ApiService from "../api/api-service/api-service";
import { TokenRepository } from "../repositories/token-repository";
import { TokenService } from "../services/token-service";

const createRequest = ApiInterceptors.createRequestInterceptor((config) => {
  const token = localStorage.getItem("accessToken");

  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

const initializeTokenService = (): TokenService => {
  const baseURL = "https://hopeful-imagination-production.up.railway.app/token";
  const api = new ApiInstance(baseURL);

  const interceptors = new ApiInterceptors({
    request: createRequest,
  });

  const service = new ApiService(api.instance, interceptors);
  const repository = new TokenRepository(service);

  return new TokenService(repository);
};

const tokenService = initializeTokenService();

export { tokenService };
