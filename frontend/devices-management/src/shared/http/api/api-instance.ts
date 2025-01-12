import axios, { AxiosInstance } from "axios";

const apiInstance = (): AxiosInstance => {
  const baseURL = "http://localhost:8000/api";
  return axios.create({
    baseURL,
    withCredentials: true,
    timeout: 5000,
  });
};

export default apiInstance;
