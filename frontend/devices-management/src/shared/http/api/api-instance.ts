import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

export default apiInstance;
