import BaseRepository from "../repositories/base-repository";

export class BaseService<T extends BaseRepository> {
  protected readonly repository: T;

  constructor(repository: T) {
    if (!repository) {
      throw new Error("Repository not provided");
    }

    this.repository = repository;
  }

  /**
   * Extrai uma mensagem de erro amigável a partir de um erro do tipo `unknown`.
   * Se o erro for uma instância de `Error`, retorna sua mensagem; caso contrário, utiliza uma mensagem padrão.
   *
   * @param error - O erro capturado, potencialmente do tipo `unknown`.
   * @param defaultMessage - Mensagem padrão caso o erro não seja uma instância de `Error`.
   * @returns Uma string contendo a mensagem de erro amigável.
   */
  protected getErrorMessage(error: unknown, defaultMessage: string): Error {
    if (process.env.NODE_ENV === "development") {
      console.error("Erro capturado:", error);
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error(defaultMessage);
  }
}
