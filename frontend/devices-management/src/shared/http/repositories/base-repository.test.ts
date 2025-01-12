import { describe, it, expect, vi, beforeEach } from "vitest";
import ApiService from "../api/api-service";

import { AxiosError } from "axios";
import BaseRepository from "./base-repository";

vi.mock("../api/api-service");

describe("BaseRepository", () => {
  let mockApiService: ApiService;

  beforeEach(() => {
    // Mock do ApiService
    mockApiService = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as unknown as ApiService;
  });

  it("should throw an error if no ApiService is provided", () => {
    expect(
      () => new BaseRepository(undefined as unknown as ApiService)
    ).toThrow("API service not provided");
  });

  it("should initialize correctly with a valid ApiService", () => {
    const repository = new BaseRepository(mockApiService);
    expect(repository).toBeInstanceOf(BaseRepository);
  });

  describe("createErrorMessage", () => {
    it("should return a standardized error message for AxiosError with a custom message", () => {
      const repository = new BaseRepository(mockApiService);

      const axiosError = {
        response: { data: { message: "Erro de rede" } },
        isAxiosError: true,
      } as AxiosError;

      const error = repository["createErrorMessage"](axiosError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Ocorreu um erro inesperado");
    });

    it("should return the default error message for AxiosError without a custom message", () => {
      const repository = new BaseRepository(mockApiService);

      const axiosError = {
        response: { data: {} },
        isAxiosError: true,
      } as AxiosError;

      const error = repository["createErrorMessage"](axiosError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Ocorreu um erro inesperado");
    });

    it("should return the error message for generic Error instances", () => {
      const repository = new BaseRepository(mockApiService);

      const genericError = new Error("Erro genérico");
      const error = repository["createErrorMessage"](genericError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Erro genérico");
    });

    it("should return the default error message for unknown error types", () => {
      const repository = new BaseRepository(mockApiService);

      const unknownError = "Erro desconhecido";
      const error = repository["createErrorMessage"](unknownError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Ocorreu um erro inesperado");
    });
  });
});
