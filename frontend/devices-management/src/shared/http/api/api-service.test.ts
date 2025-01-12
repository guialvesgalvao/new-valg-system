import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosInstance } from "axios";
import ApiService from "./api-service";

vi.mock("axios");

describe("ApiService", () => {
  let mockAxiosInstance: AxiosInstance;

  beforeEach(() => {
    // Simular uma instância de Axios
    mockAxiosInstance = {
      defaults: {
        baseURL: "https://example.com/api",
      },
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as unknown as AxiosInstance;
  });

  it("should throw an error if no Axios instance is provided", () => {
    expect(() => new ApiService(undefined as unknown as AxiosInstance)).toThrow(
      "A instância do Axios não foi fornecida."
    );
  });

  it("should throw an error if the Axios instance does not have a baseURL", () => {
    mockAxiosInstance.defaults.baseURL = "";
    expect(() => new ApiService(mockAxiosInstance)).toThrow(
      "A URL base da API não foi configurada corretamente."
    );
  });

  it("should initialize correctly with a valid Axios instance", () => {
    const apiService = new ApiService(mockAxiosInstance);
    expect(apiService).toBeInstanceOf(ApiService);
    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
  });

  it("should call the GET method of Axios", async () => {
    const apiService = new ApiService(mockAxiosInstance);
    const mockData = { data: { message: "success" } };
    vi.mocked(mockAxiosInstance.get).mockResolvedValueOnce(mockData);

    const result = await apiService.get("/test-url");
    expect(mockAxiosInstance.get).toHaveBeenCalledWith("/test-url");
    expect(result).toEqual(mockData.data);
  });

  it("should call the POST method of Axios", async () => {
    const apiService = new ApiService(mockAxiosInstance);
    const mockData = { data: { message: "created" } };
    const payload = { name: "John Doe" };
    vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockData);

    const result = await apiService.post("/test-url", payload);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith("/test-url", payload);
    expect(result).toEqual(mockData.data);
  });

  it("should call the PATCH method of Axios", async () => {
    const apiService = new ApiService(mockAxiosInstance);
    const mockData = { data: { message: "updated" } };
    const payload = { name: "Jane Doe" };
    vi.mocked(mockAxiosInstance.patch).mockResolvedValueOnce(mockData);

    const result = await apiService.patch("/test-url", payload);
    expect(mockAxiosInstance.patch).toHaveBeenCalledWith("/test-url", payload);
    expect(result).toEqual(mockData.data);
  });

  it("should call the DELETE method of Axios", async () => {
    const apiService = new ApiService(mockAxiosInstance);
    const mockData = { data: { message: "deleted" } };
    vi.mocked(mockAxiosInstance.delete).mockResolvedValueOnce(mockData);

    const result = await apiService.delete("/test-url");
    expect(mockAxiosInstance.delete).toHaveBeenCalledWith("/test-url");
    expect(result).toEqual(mockData.data);
  });
});
