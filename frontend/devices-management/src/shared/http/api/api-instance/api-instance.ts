import axios, { AxiosInstance } from "axios";

class ApiInstance {
  private readonly _api: AxiosInstance;

  constructor(baseURL: string) {
    this._api = axios.create({
      baseURL,
      withCredentials: false,
      timeout: 5000,
    });
  }

  get instance(): AxiosInstance {
    return this._api;
  }
}

export default ApiInstance;
