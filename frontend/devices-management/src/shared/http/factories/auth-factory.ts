import apiInstance from "../api/api-instance";
import ApiService from "../api/api-service";

import { AuthRepository } from "../repositories/auth-repository";
import { AuthService } from "../services/auth-service";

/**
 * Fábrica para inicializar e configurar os serviços.
 * Encapsula a lógica de instanciamento para facilitar a reusabilidade e manutenção.
 */
const initializeAuthService = (): AuthService => {
  const instance = apiInstance();
  const service = new ApiService(instance);
  const repository = new AuthRepository(service);
  return new AuthService(repository);
};

// Inicializa o serviço de autenticação.
const authService = initializeAuthService();

export { authService };
