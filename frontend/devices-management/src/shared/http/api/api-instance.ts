import axios, { AxiosInstance } from "axios";

const apiInstance = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  return axios.create({
    baseURL,
    withCredentials: true,
    timeout: 5000,
  });
};

export default apiInstance;
