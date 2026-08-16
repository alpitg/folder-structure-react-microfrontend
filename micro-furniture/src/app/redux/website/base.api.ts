import { GetEnvConfig } from "../../../app.config";
import { WEBSITE_AUTH_KEY } from "../../../constants/global/global-key.const";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ============================================================
// TYPES
// ============================================================

interface WebsiteAuth {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;

  customerId?: string;
  mobile?: string;
  name?: string;
  email?: string;
}

interface RefreshResponse {
  success?: boolean;
  message?: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expiresIn?: number;
}

// ============================================================
// RAW BASE QUERY
// ============================================================

const rawWebsiteBaseQuery = fetchBaseQuery({
  baseUrl: GetEnvConfig()?.api?.baseUrl,

  credentials: "include",

  prepareHeaders: (headers) => {
    const authString = localStorage.getItem(WEBSITE_AUTH_KEY);

    if (!authString) {
      return headers;
    }

    try {
      const auth: WebsiteAuth = JSON.parse(authString);

      if (auth.accessToken) {
        headers.set(
          "Authorization",
          `${auth.tokenType || "bearer"} ${auth.accessToken}`,
        );
      }
    } catch (error) {
      console.error("Invalid website authentication data:", error);

      localStorage.removeItem(WEBSITE_AUTH_KEY);
    }

    return headers;
  },
});

// ============================================================
// WEBSITE BASE QUERY
// ============================================================

export const websiteBaseQuery = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await rawWebsiteBaseQuery(args, api, extraOptions);

  // ==========================================================
  // REQUEST URL
  // ==========================================================

  const requestUrl = typeof args === "string" ? args : args?.url || "";

  const isRefreshRequest = requestUrl.includes("/auth/refresh");

  // ==========================================================
  // NO WEBSITE AUTH
  // ==========================================================

  const authString = localStorage.getItem(WEBSITE_AUTH_KEY);

  if (!authString) {
    return result;
  }

  // ==========================================================
  // DO NOT REFRESH REFRESH REQUEST
  // ==========================================================

  if (isRefreshRequest) {
    return result;
  }

  // ==========================================================
  // NOT 401
  // ==========================================================

  if (result?.error?.status !== 401) {
    return result;
  }

  // ==========================================================
  // READ CURRENT AUTH
  // ==========================================================

  let currentAuth: WebsiteAuth;

  try {
    currentAuth = JSON.parse(authString);
  } catch (error) {
    console.error("Unable to parse website authentication:", error);

    logoutWebsite();

    return result;
  }

  // ==========================================================
  // CHECK REFRESH TOKEN
  // ==========================================================

  if (!currentAuth.refreshToken) {
    console.error("Website refresh token is missing.");

    logoutWebsite();

    return result;
  }

  // ==========================================================
  // REFRESH TOKEN
  // ==========================================================

  try {
    const config = GetEnvConfig();

    const refreshPath =
      config?.api?.website?.apiUrl + config?.api?.website?.auth?.refresh;

    if (!refreshPath) {
      console.error("Website refresh token URL is not configured.");

      logoutWebsite();

      return result;
    }

    // --------------------------------------------------------
    // REFRESH REQUEST
    // --------------------------------------------------------

    const refreshResult = await rawWebsiteBaseQuery(
      {
        url: refreshPath,
        method: "POST",

        body: {
          refresh_token: currentAuth.refreshToken,
        },
      },
      api,
      extraOptions,
    );

    // ========================================================
    // REFRESH FAILED
    // ========================================================

    if (refreshResult.error) {
      console.error("Website token refresh failed:", refreshResult.error);

      logoutWebsite();

      return result;
    }

    // ========================================================
    // REFRESH RESPONSE
    // ========================================================

    const refreshData = refreshResult.data as RefreshResponse | undefined;

    const newAccessToken = refreshData?.access_token;

    if (!newAccessToken) {
      console.error(
        "Refresh response did not contain access_token.",
        refreshData,
      );

      logoutWebsite();

      return result;
    }

    // ========================================================
    // UPDATE AUTH
    // ========================================================

    const updatedAuth: WebsiteAuth = {
      ...currentAuth,

      accessToken: newAccessToken,

      refreshToken: refreshData.refresh_token || currentAuth.refreshToken,

      tokenType: refreshData.token_type || currentAuth.tokenType || "bearer",
    };

    localStorage.setItem(WEBSITE_AUTH_KEY, JSON.stringify(updatedAuth));

    // ========================================================
    // RETRY ORIGINAL REQUEST
    // ========================================================

    result = await rawWebsiteBaseQuery(args, api, extraOptions);

    return result;
  } catch (error) {
    console.error("Website token refresh failed:", error);

    logoutWebsite();

    return result;
  }
};

// ============================================================
// WEBSITE LOGOUT
// ============================================================

const logoutWebsite = () => {
  localStorage.removeItem(WEBSITE_AUTH_KEY);

  localStorage.removeItem("customerId");
  localStorage.removeItem("customerMobile");
  localStorage.removeItem("customerName");
  localStorage.removeItem("customerEmail");
};
