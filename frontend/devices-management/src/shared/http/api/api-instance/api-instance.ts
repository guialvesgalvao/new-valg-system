import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

class ApiInstance {
  private readonly _api: AxiosInstance;

  constructor(baseURL: string, settings?: CreateAxiosDefaults) {
    if (!baseURL) {
      throw new Error("Base URL is required");
    }

    this._api = axios.create(
      this._createAxiosSettings(
        baseURL,
        settings || this._defaultSettings(baseURL)
      )
    );

    this._createAxiosSettings = this._createAxiosSettings.bind(this);
    this._defaultSettings = this._defaultSettings.bind(this);
  }

  private _createAxiosSettings(
    baseUrl: string,
    settings: CreateAxiosDefaults
  ): CreateAxiosDefaults {
    return {
      baseURL: baseUrl,
      ...settings,
    };
  }

  private _defaultSettings(baseUrl: string): CreateAxiosDefaults {
    return {
      baseURL: baseUrl,
      withCredentials: false,
      timeout: 5000,
    };
  }

  get instance(): AxiosInstance {
    return this._api;
  }
}

export default ApiInstance;
