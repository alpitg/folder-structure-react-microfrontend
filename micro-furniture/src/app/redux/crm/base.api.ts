import { GetEnvConfig } from "../../../app.config";
import { LOCALSTORAGE_AUTH_KEY } from "../../../constants/global/global-key.const";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: GetEnvConfig()?.api?.baseUrl,
  // Required for HttpOnly refresh token cookie
  credentials: "include",
  prepareHeaders: (headers) => {
    const userDetailStr = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

    if (userDetailStr) {
      try {
        const userDetail = JSON.parse(userDetailStr);
        const token = userDetail?.accessToken;

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (err) {
        console.error("Invalid user detail in localStorage", err);
      }
    }

    return headers;
  },
});

// Wrapper with auto refresh
export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const hasStoredAuth = !!localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

  if (result?.error?.status === 401 && hasStoredAuth) {
    try {
      // Refresh token is stored as an HttpOnly cookie by the backend.
      // The browser sends it automatically when `credentials: "include"` is set.
      const refreshResult = await rawBaseQuery(
        {
          url:
            GetEnvConfig()?.api?.baseUrl +
            GetEnvConfig()?.api?.administration?.users?.refreshToken,
          method: "POST",
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const refreshedToken = (refreshResult.data as any)?.accessToken;
        const refreshedTokenType = (refreshResult.data as any)?.tokenType;

        if (refreshedToken) {
          const current = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
          const userDetail = current ? JSON.parse(current) : {};

          localStorage.setItem(
            LOCALSTORAGE_AUTH_KEY,
            JSON.stringify({
              ...userDetail,
              accessToken: refreshedToken,
              tokenType: refreshedTokenType ?? userDetail.tokenType,
            }),
          );
        }

        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
        window.location.href = ROUTE_URL.LOGIN;
      }
    } catch (err) {
      console.error("Token refresh failed", err);
      localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
      window.location.href = ROUTE_URL.LOGIN;
    }
  }

  return result;
};
