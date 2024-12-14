import { ENDPOINT } from "../../constants/endpoint.const";
import axios from "axios";
import { getAccessToken } from "./auth.util";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (req) => {
    const token = getAccessToken();
    req.baseURL = ENDPOINT.API_BASE_URL;
    req.headers.Authorization = `Bearer ${token}`;
    //   req.headers["Access-Control-Allow-Origin"] = "*";
    req.headers["Content-Type"] = "application/json";
    return req;
});
