import axios from "axios";
import { getTokenFromLocal, tokenPatternCheck } from "../utils/userDetails";

const token = getTokenFromLocal();

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use(
  (config) => {
    if (tokenPatternCheck(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AxiosInstance = axios;
