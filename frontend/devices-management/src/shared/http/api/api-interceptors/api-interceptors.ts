import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Definição de tipos genéricos
type CustomInterceptorFunction<T> = {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: AxiosError) => any;
};

export type CustomInterceptorRequestFunction =
  CustomInterceptorFunction<InternalAxiosRequestConfig>;

export type CustomInterceptorResponseFunction =
  CustomInterceptorFunction<AxiosResponse>;

export type CustomAxiosInterceptorsParams = {
  request?: CustomInterceptorRequestFunction;
  response?: CustomInterceptorResponseFunction;
};

class ApiInterceptors {
  private readonly _request?: CustomInterceptorRequestFunction;
  private readonly _response?: CustomInterceptorResponseFunction;

  constructor(params?: CustomAxiosInterceptorsParams) {
    if (!params) {
      throw new Error("Interceptors params are required");
    }

    this._request = params.request;
    this._response = params.response;
  }

  get request(): CustomInterceptorRequestFunction | undefined {
    return this._request;
  }

  get response(): CustomInterceptorResponseFunction | undefined {
    return this._response;
  }

  static createRequestInterceptor(
    onFulfilled: (
      value: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    onRejected?: (error: AxiosError) => any
  ): CustomInterceptorRequestFunction {
    return {
      onFulfilled,
      onRejected: onRejected || ((error: AxiosError) => Promise.reject(error)),
    };
  }

  static createResponseInterceptor(
    onFulfilled: (
      value: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: AxiosError) => any
  ): CustomInterceptorResponseFunction {
    return {
      onFulfilled,
      onRejected: onRejected || ((error: AxiosError) => Promise.reject(error)),
    };
  }
}

export default ApiInterceptors;