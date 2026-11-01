import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// TYPES
// ============================================================

export type QuoteHomeType = "1 BHK" | "2 BHK" | "3 BHK" | "4+ BHK" | "Villa";

export interface WebsiteQuotePayload {
  name: string;
  mobile: string;
  homeType: QuoteHomeType;
}

export interface WebsiteQuoteResponse {
  id: string;
  name: string;
  mobile: string;

  company: string;
  description: string;
  email: string;
  isActive: boolean;
  owner: null;
  source: null;
  value: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// API
// ============================================================

export const websiteQuoteApi = createApi({
  reducerPath: "websiteQuoteApi",
  baseQuery: websiteBaseQuery,
  tagTypes: ["Quote"],

  endpoints: (builder) => ({
    // ========================================================
    // SUBMIT HOME INTERIOR QUOTE
    // ========================================================

    submitWebsiteQuote: builder.mutation<
      WebsiteQuoteResponse,
      WebsiteQuotePayload
    >({
      query: (body) => {
        return {
          url: GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.leads?.add,
          method: "POST",
          body: {
            name: body.name.trim(),
            mobile: body.mobile.trim(),
            homeType: body.homeType,
          },
        };
      },

      transformResponse: (
        response: WebsiteQuoteResponse,
      ): WebsiteQuoteResponse => response,

      invalidatesTags: (_result, error) => {
        if (error) {
          return [];
        }

        return [{ type: "Quote", id: "LIST" }];
      },
    }),
  }),
});

// ============================================================
// HOOKS
// ============================================================

export const { useSubmitWebsiteQuoteMutation } = websiteQuoteApi;
