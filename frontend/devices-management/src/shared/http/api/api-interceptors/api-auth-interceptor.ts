import ApiInterceptors from "./api-interceptors";

import ApiInstance from "../api-instance/api-instance";
import { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

interface OriginalRequest extends InternalAxiosRequestConfig<any> {
  _retry?: boolean;
}

/**
 * AuthApiInterceptors:
 * - Lê cookies do contexto da requisição (Server),
 * - Injeta Authorization se `accessToken` existir,
 * - Tenta refresh em caso de 401.
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
   * Intercepta requisições antes de serem enviadas:
   * - Lê cookie "accessToken"
   * - Caso não exista, opcionalmente chama a rota de refresh
   *   (mas isso depende de você realmente querer refresh toda vez que não há token).
   */
  private async handleRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const store = await cookies(); // Lê cookies da requisição atual
    const accessToken = store.get("accessToken")?.value;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  }

  /**
   * Lida com erros na configuração da requisição
   */
  private handleRequestError(error: any): Promise<never> {
    console.error("Erro ao configurar a requisição:", error);
    return Promise.reject(error);
  }

  /**
   * Intercepta respostas de erro:
   * - Se status 401 e _retry não foi setado, tenta chamar refresh
   * - Redefine Authorization e refaz a requisição original
   */
  private async handleResponseError(error: any): Promise<any> {
    const originalRequest = error.config as OriginalRequest;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 1) Ler o refreshToken do cookie (do request atual)
        const store = await cookies();
        const refreshToken = store.get("refreshToken")?.value;

        if (!refreshToken) {
          // Se não existe refreshToken, não tem como renovar
          return Promise.reject(error);
        }

        const allCookies = store.getAll();
        const cookieString = allCookies
          .map((c) => `${c.name}=${c.value}`)
          .join("; ");

        const endpoint =
          process.env.NEXT_PUBLIC_API_URL + "/api/token/refresh-token";

        const refreshResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieString,
          },
          credentials: "include",
        });

        if (!refreshResponse.ok) {
          return Promise.reject(error);
        }

        const refreshData = await refreshResponse.json();

        if (!refreshData.newAccessToken) {
          return Promise.reject(
            new Error("Refresh falhou: sem newAccessToken")
          );
        }

        originalRequest.headers["Authorization"] =
          `Bearer ${refreshData.newAccessToken}`;

        originalRequest.headers["Cookie"] =
          refreshResponse.headers.get("set-cookie");

        return this.api.instance.request(originalRequest);
      } catch (err) {
        if (err instanceof Error) {
          return Promise.reject(err);
        }
        return Promise.reject(new Error("Erro ao atualizar o token."));
      }
    }

    return Promise.reject(error);
  }
}

export default AuthApiInterceptors;
