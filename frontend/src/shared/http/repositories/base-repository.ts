import { AxiosError } from "axios";
import ApiService from "../api/api-service/api-service";

class BaseRepository {
  protected readonly api: ApiService;

  constructor(apiService: ApiService) {
    if (!apiService) {
      throw new Error("API service not provided");
    }

    this.api = apiService;
    this.createErrorMessage = this.createErrorMessage.bind(this);
  }

  /**
   * Cria uma mensagem de erro padronizada a partir de diferentes tipos de erros.
   * @param error - Erro capturado durante uma operação.
   * @param defaultMessage - Mensagem padrão caso nenhuma outra seja encontrada.
   * @returns Instância de `Error` com uma mensagem apropriada.
   */
  protected createErrorMessage(
    error: unknown,
    defaultMessage: string = "Ocorreu um erro inesperado"
  ): Error {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || defaultMessage;
      console.error("Erro Axios:", errorMessage, error.response);
      return new Error(errorMessage);
    }

    if (error instanceof Error) {
      console.error("Erro genérico:", error.message, error);
      return new Error(error.message);
    }

    console.error("Erro desconhecido:", error);
    return new Error(defaultMessage);
  }
}

export default BaseRepository;
