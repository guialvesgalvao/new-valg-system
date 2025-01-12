import { AxiosInstance } from "axios";

class ApiService {
  private readonly _api: AxiosInstance;

  constructor(api: AxiosInstance) {
    if (!api) {
      throw new Error("A instância do Axios não foi fornecida.");
    }

    if (!api.defaults.baseURL) {
      throw new Error("A URL base da API não foi configurada corretamente.");
    }

    this._api = api;

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);

    this._setupInterceptors();
  }

  private _setupInterceptors(): void {
    this._api.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );
    this._api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(new Error(error))
    );
  }

  async get<T>(url: string): Promise<T> {
    const response = await this._api.get<T>(url);
    return response.data;
  }

  async post<T, D = unknown>(url: string, data?: D): Promise<T> {
    const response = await this._api.post<T>(url, data);
    return response.data;
  }

  async patch<T, D>(url: string, data: D): Promise<T> {
    const response = await this._api.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this._api.delete<T>(url);
    return response.data;
  }
}

export default ApiService;
