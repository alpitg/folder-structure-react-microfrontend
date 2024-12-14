import { BEARER_TOKEN_KEY } from "../../constants/global-key.const";

export function getAccessToken() {
    return localStorage.getItem(BEARER_TOKEN_KEY);
};
