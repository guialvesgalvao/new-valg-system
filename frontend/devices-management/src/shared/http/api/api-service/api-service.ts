import {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type InterceptorFunction<T> = {
  onFulfilled: (value: T) => T | Promise<T>;
  onRejected: (error: any) => any;
};

export type CustomAxiosInterceptorsParams = {
  request?: InterceptorFunction<InternalAxiosRequestConfig>;
  response?: InterceptorFunction<AxiosResponse>;
};

class ApiService {
  private readonly _api: AxiosInstance;

  constructor(
    api: AxiosInstance,
    interceptors?: CustomAxiosInterceptorsParams
  ) {
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

    const { request, response } = interceptors ?? {};

    if (request || response) {
      this._setupInterceptors(request, response);
    }
  }

  private _setupInterceptors(
    request?: InterceptorFunction<InternalAxiosRequestConfig>,
    response?: InterceptorFunction<AxiosResponse>
  ): void {
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
