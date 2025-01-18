import ApiInterceptors from "./api-interceptors";
import { tokenService } from "../../factories/token-factory";
import ApiInstance from "../api-instance/api-instance";
import { InternalAxiosRequestConfig } from "axios";

interface OriginalRequest extends InternalAxiosRequestConfig<any> {
  _retry?: boolean;
}

/**
 * AuthApiInterceptors é uma classe especializada que estende os interceptors padrão
 * para adicionar lógica específica de autenticação, como:
 * - Adição automática de tokens de autorização aos headers das requisições.
 * - Tratamento de erros relacionados à autenticação, como o status 401.
 */
class AuthApiInterceptors extends ApiInterceptors {
  constructor(api: ApiInstance) {
    super(api, {
      request: {
        onFulfilled: (config) => this.handleRequest(config),
        onRejected: (error) => this.handleRequestError(error),
      },
      response: {
        onFulfilled: (response) => response,
        onRejected: (error) => this.handleResponseError(error),
      },
    });
  }

  /**
   * Lida com a configuração das requisições, incluindo adição de token.
   */
  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.warn("Token ausente. Redirecionando para login.");
      throw new Error("Access token ausente.");
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  }

  /**
   * Lida com erros na configuração da requisição.
   */
  private handleRequestError(error: any): Promise<never> {
    console.error("Erro ao configurar a requisição:", error);
    return Promise.reject(error);
  }

  /**
   * Lida com erros na resposta da API.
   */
  private async handleResponseError(error: any): Promise<any> {
    const originalRequest = error.config as OriginalRequest;

    if (!originalRequest) {
      console.error("Configuração da requisição original ausente.");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await tokenService.refreshToken();

        if (!accessToken) {
          localStorage.removeItem("accessToken");
          return Promise.reject(error);
        }

        console.info("Token renovado com sucesso.");
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return this.api.instance(originalRequest);
      } catch (refreshError) {
        console.error("Erro ao tentar renovar o token:", refreshError);
        // localStorage.removeItem("accessToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
}

export default AuthApiInterceptors;
