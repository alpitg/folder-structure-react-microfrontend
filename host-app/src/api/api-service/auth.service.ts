import { AUTH_INFO_KEY, BEARER_TOKEN_KEY } from "../../constants/global-key.const";

import { AuthenticationModel } from "../../interfaces/auth.model";
import { ENDPOINT } from "../../constants/endpoint.const";
import { axiosInstance } from "../axios-instance/axios-instance.util";

export default class AuthService {

    /**
     * GET Auth
     */
    static readonly fetchUser = () => {
        return axiosInstance.get(ENDPOINT.USER.API.FETCH_USER);
    };

    /**
     * GET Auth
     */
    static readonly getAuthDetail = (): AuthenticationModel => {
        const userDetail = localStorage.getItem(AUTH_INFO_KEY);
        if (userDetail) {
            return JSON.parse(userDetail);
        } else {
            return new AuthenticationModel();
        }
    };

    /**
     * SET Auth
     */
    static readonly setAuthDetail = (response: any) => {
        localStorage.setItem(BEARER_TOKEN_KEY, response?.bearerToken);
        localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(response));
    };
}
