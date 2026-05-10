import axios from "axios";
import { LOCALSTORAGE_AUTH_KEY } from "../../constants/global/global-key.const";

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(async (req) => {
  const authString = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  if (authString && req.headers) {
    try {
      const auth = JSON.parse(authString) as { accessToken?: string; tokenType?: string };
      const token = auth?.accessToken;
      const type = auth?.tokenType || "Bearer";
      if (token) {
        req.headers.Authorization = `${type} ${token}`;
      }
    } catch (error) {
      console.error("Unable to parse auth token for axios request", error);
    }
  }
  if (req.headers) {
    req.headers["Content-Type"] = "application/json";
  }
  return req;
});
