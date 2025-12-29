import { GetEnvConfig } from "../../app.config";
import { LOCALSTORAGE_AUTH_KEY } from "../../constants/global/global-key.const";
import { ROUTE_URL } from "../../routes/constants/routes.const";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: GetEnvConfig()?.api?.baseUrl,
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

// ✅ Wrapper with auto-refresh logic
export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    const userDetailStr = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

    if (userDetailStr) {
      try {
        const userDetail = JSON.parse(userDetailStr);
        const refreshToken = userDetail?.refreshToken;

        if (refreshToken) {
          // Try refreshing token
          const refreshResult = await rawBaseQuery(
            {
              url:
                GetEnvConfig()?.api?.baseUrl +
                GetEnvConfig()?.api?.administration?.users?.refreshToken,
              method: "POST",
              body: { refresh_token: refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const newAccessToken = (refreshResult.data as any).accessToken;

            // Save new token in localStorage
            const updatedUserDetail = {
              ...userDetail,
              accessToken: newAccessToken,
            };
            localStorage.setItem(
              LOCALSTORAGE_AUTH_KEY,
              JSON.stringify(updatedUserDetail)
            );

            // Retry the original query
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            // Refresh failed → log out user
            localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
            window.location.href = ROUTE_URL.LOGIN;
          }
        } else {
          // No refresh token → log out user
          localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
          window.location.href = ROUTE_URL.LOGIN;
        }
      } catch (err) {
        console.error("Token refresh failed", err);
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
        window.location.href = ROUTE_URL.LOGIN;
      }
    }
  }

  return result;
};
