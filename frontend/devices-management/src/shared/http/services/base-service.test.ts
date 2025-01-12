import { describe, it, expect, vi, beforeEach } from "vitest";
import BaseRepository from "../repositories/base-repository";
import { BaseService } from "./base-service";

class MockRepository extends BaseRepository {
  constructor() {
    super({} as any); // Simula o ApiService no construtor do BaseRepository
  }
}

describe("BaseService", () => {
  let mockRepository: MockRepository;

  beforeEach(() => {
    mockRepository = new MockRepository();
  });

  it("should throw an error if no repository is provided", () => {
    expect(
      () => new BaseService(undefined as unknown as MockRepository)
    ).toThrow("Repository not provided");
  });

  it("should initialize correctly with a valid repository", () => {
    const service = new BaseService(mockRepository);
    expect(service).toBeInstanceOf(BaseService);
    expect(service["repository"]).toBe(mockRepository);
  });

  describe("getErrorMessage", () => {
    it("should log the error in development mode", () => {
      process.env.NEXT_ENV = "development";
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const service = new BaseService(mockRepository);
      service["getErrorMessage"](new Error("Dev error"), "Default message");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro capturado:",
        new Error("Dev error")
      );

      consoleErrorSpy.mockRestore();
    });

    it("should not log the error in non-development mode", () => {
      process.env.NEXT_ENV = "production";
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const service = new BaseService(mockRepository);
      service["getErrorMessage"](new Error("Prod error"), "Default message");

      expect(consoleErrorSpy).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it("should return the error message if the error is an instance of Error", () => {
      const service = new BaseService(mockRepository);
      const error = new Error("Specific error");

      const result = service["getErrorMessage"](error, "Default message");

      expect(result).toBe(error);
    });

    it("should return the default error message if the error is not an instance of Error", () => {
      const service = new BaseService(mockRepository);
      const result = service["getErrorMessage"](
        "Unknown error",
        "Default message"
      );

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Default message");
    });
  });
});
