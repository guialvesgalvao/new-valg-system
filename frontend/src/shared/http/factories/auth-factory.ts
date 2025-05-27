import ApiInstance from "../api/api-instance/api-instance";
import AuthApiInterceptors from "../api/api-interceptors/api-auth-interceptor";
import ApiInterceptors from "../api/api-interceptors/api-interceptors";

import ApiService from "../api/api-service/api-service";

import { AuthRepository } from "../repositories/auth-repository";
import { AuthService } from "../services/auth-service";

/**
 * Fábrica para inicializar e configurar os serviços. (aprenda reizinho)
 * Encapsula a lógica de instanciamento para facilitar a reusabilidade e manutenção.
 */
const initializeAuthService = (): AuthService => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + "/auth";
  const api = new ApiInstance(baseURL);

  const service = new ApiService(api.instance);
  const repository = new AuthRepository(service);

  return new AuthService(repository);
};

// Inicializa o serviço de autenticação.
const authService = initializeAuthService();

export { authService };
