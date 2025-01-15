import ApiInstance from "../api/api-instance/api-instance";
import ApiService, {
  CustomAxiosInterceptorsParams,
} from "../api/api-service/api-service";

import { AuthRepository } from "../repositories/auth-repository";
import { AuthService } from "../services/auth-service";

const getInterceptors = (): CustomAxiosInterceptorsParams => {
  return {
    request: {
      onFulfilled(value) {
        return value;
      },
      onRejected(error) {
        return Promise.reject(error);
      },
    },
  };
};

/**
 * Fábrica para inicializar e configurar os serviços. (aprenda reizinho)
 * Encapsula a lógica de instanciamento para facilitar a reusabilidade e manutenção.
 */
const initializeAuthService = (): AuthService => {
  const baseURL = "https://hopeful-imagination-production.up.railway.app/auth";

  const api = new ApiInstance(baseURL);

  const interceptors: CustomAxiosInterceptorsParams = getInterceptors();

  const service = new ApiService(api.instance, interceptors);
  const repository = new AuthRepository(service);

  return new AuthService(repository);
};

// Inicializa o serviço de autenticação.
const authService = initializeAuthService();

export { authService };
