import { AxiosInstance, AxiosResponse } from "axios";
import ApiInterceptors from "../api-interceptors/api-interceptors";

class ApiService {
  private readonly _api: AxiosInstance;

  constructor(api: AxiosInstance, interceptors?: ApiInterceptors) {
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

    this._setupInterceptors(interceptors);
  }

  private _setupInterceptors(interceptors: ApiInterceptors | undefined): void {
    const { request, response } = interceptors ?? {};

    if (request) {
      this._api.interceptors.request.use(
        request.onFulfilled,
        request.onRejected
      );
    }

    if (response) {
      this._api.interceptors.response.use(
        response.onFulfilled,
        response.onRejected
      );
    }
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await this._api.get<T>(url);
    return response;
  }

  async post<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<T>> {
    const response = await this._api.post<T>(url, data);
    return response;
  }

  async patch<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
    const response = await this._api.patch<T>(url, data);
    return response;
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await this._api.delete<T>(url);
    return response;
  }
}

export default ApiService;
