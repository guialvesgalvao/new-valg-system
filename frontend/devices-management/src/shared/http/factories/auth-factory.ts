import ApiInstance from "../api/api-instance/api-instance";
import ReusableApiInterceptors from "../api/api-interceptors/api-auth-interceptor";
import ApiInterceptors, {
  CustomInterceptorRequestFunction,
} from "../api/api-interceptors/api-interceptors";
import ApiService from "../api/api-service/api-service";

import { AuthRepository } from "../repositories/auth-repository";
import { AuthService } from "../services/auth-service";

const createRequestInterceptor = () =>
  ApiInterceptors.createRequestInterceptor((config) => {
    console.log("Request Interceptor", config);
    return config;
  });

/**
 * Fábrica para inicializar e configurar os serviços. (aprenda reizinho)
 * Encapsula a lógica de instanciamento para facilitar a reusabilidade e manutenção.
 */
const initializeAuthService = (): AuthService => {
  const baseURL = "https://hopeful-imagination-production.up.railway.app/auth";
  const api = new ApiInstance(baseURL);

  const interceptors = new ReusableApiInterceptors();

  const service = new ApiService(api.instance, interceptors);
  const repository = new AuthRepository(service);

  return new AuthService(repository);
};

// Inicializa o serviço de autenticação.
const authService = initializeAuthService();

export { authService };
