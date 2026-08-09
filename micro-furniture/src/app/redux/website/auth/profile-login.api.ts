import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface WebsiteLoginRequest {
  mobile: string;
}

export interface WebsiteLoginResponse {
  success: boolean;
  message: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  token?: string;
}

export const profileLoginApi = createApi({
  reducerPath: "profileLoginApi",
  baseQuery,
  tagTypes: ["ProfileLogin"],

  endpoints: (builder) => ({
    websiteLogin: builder.mutation<WebsiteLoginResponse, WebsiteLoginRequest>({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.login,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["ProfileLogin"],
    }),
  }),
});

export const { useWebsiteLoginMutation } = profileLoginApi;
