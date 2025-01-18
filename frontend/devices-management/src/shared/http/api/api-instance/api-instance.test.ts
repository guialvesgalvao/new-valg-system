import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosInstance } from "axios";
import ApiInstance from "./api-instance";

vi.mock("axios");

describe("apiInstance", () => {
  const baseURL = "https://example.com/api"; // Defina uma URL base para o teste

  beforeEach(() => {
    // Configurar variável de ambiente para os testes
    process.env.NEXT_PUBLIC_API_BASE_URL = baseURL;

    // Mock de axios.create
    vi.mocked(axios.create).mockImplementation(
      (config) =>
        ({
          defaults: config,
          interceptors: {
            request: { use: vi.fn() },
            response: { use: vi.fn() },
          },
        }) as unknown as AxiosInstance
    );
  });

  it("should create an Axios instance", () => {
    const api = new ApiInstance(baseURL);
    expect(api.instance).toHaveProperty("defaults");
  });

  it("should have the correct baseURL", () => {
    const api = new ApiInstance(baseURL);
    expect(api.instance.defaults.baseURL).toBe(baseURL);
  });

  it("should have withCredentials set to true", () => {
    const api = new ApiInstance(baseURL);
    expect(api.instance.defaults.withCredentials).toBe(true);
  });

  it("should have a timeout of 5000", () => {
    const api = new ApiInstance(baseURL);
    expect(api.instance.defaults.timeout).toBe(5000);
  });

  it("should call axios.create with the correct configuration", () => {
    new ApiInstance(baseURL);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
      withCredentials: true,
      timeout: 5000,
    });
  });
});
