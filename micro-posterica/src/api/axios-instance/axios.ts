import axios from "axios";

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(async (req) => {
  //   const token = AuthService.getAccessToken();
//   req.baseURL = ApiEndpoint().baseApiUrl; // Set the base URL for all requests
  //   req.headers.Authorization = `Bearer ${token}`;
  // req.headers["Access-Control-Allow-Origin"] = "*";
  req.headers["Content-Type"] = "application/json";
  return req;
});
