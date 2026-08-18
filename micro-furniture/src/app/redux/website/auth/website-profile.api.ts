import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// TYPES
// ============================================================

export interface WebsiteProfile {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  description?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================
// UPDATE PROFILE REQUEST
// ============================================================

export interface UpdateWebsiteProfileRequest {
  name: string;
  email: string;
  mobile?: string;
  description?: string | null;
}

// ============================================================
// API
// ============================================================

export const websiteProfileApi = createApi({
  reducerPath: "websiteProfileApi",

  baseQuery: websiteBaseQuery,

  tagTypes: ["WebsiteProfile"],

  endpoints: (builder) => ({
    // ========================================================
    // GET PROFILE
    // ========================================================

    getWebsiteProfile: builder.query<WebsiteProfile, void>({
      query: () => {
        const config = GetEnvConfig();

        return {
          url:
            config?.api?.website?.apiUrl + config?.api?.website?.auth?.profile,

          method: "GET",
        };
      },

      providesTags: [
        {
          type: "WebsiteProfile",
          id: "CURRENT",
        },
      ],
    }),

    // ========================================================
    // UPDATE PROFILE
    // ========================================================

    updateWebsiteProfile: builder.mutation<
      WebsiteProfile,
      UpdateWebsiteProfileRequest
    >({
      query: (body) => {
        const config = GetEnvConfig();

        return {
          url:
            config?.api?.website?.apiUrl + config?.api?.website?.auth?.profile,

          method: "PATCH",

          body,
        };
      },

      invalidatesTags: [
        {
          type: "WebsiteProfile",
          id: "CURRENT",
        },
      ],
    }),
  }),
});

// ============================================================
// HOOKS
// ============================================================

export const { useGetWebsiteProfileQuery, useUpdateWebsiteProfileMutation } =
  websiteProfileApi;
