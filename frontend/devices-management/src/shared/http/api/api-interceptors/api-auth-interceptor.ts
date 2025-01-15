import ApiInterceptors from "./api-interceptors";

/**
 * AuthApiInterceptors é uma classe especializada que estende os interceptors padrão
 * para adicionar lógica específica de autenticação, como:
 * - Adição automática de tokens de autorização aos headers das requisições.
 * - Tratamento de erros relacionados à autenticação, como o status 401.
 */
class AuthApiInterceptors extends ApiInterceptors {
  constructor() {
    super({
      request: {
        onFulfilled: (config) => {
          // Adiciona o token de autorização ao header da requisição
          config.headers["Authorization"] = "Bearer token";
          return config;
        },
      },
      response: {
        onRejected: (error) => {
          if (error.response?.status === 401) {
            const originalRequest = error.config;
            console.log(
              "Interceptado erro 401. Requisição original:",
              originalRequest
            );
          }

          return Promise.reject(error);
        },
      },
    });
  }
}

export default AuthApiInterceptors;
