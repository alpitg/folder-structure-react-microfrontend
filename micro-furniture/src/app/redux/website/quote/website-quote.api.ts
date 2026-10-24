import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// TYPES
// ============================================================

export type QuoteHomeType = "1 BHK" | "2 BHK" | "3 BHK" | "4+ BHK" | "Villa";

export interface WebsiteQuotePayload {
  name: string;
  phone: string;
  homeType: QuoteHomeType;
}

export interface WebsiteQuoteResponse {
  success: boolean;
  message: string;
  quoteId?: string;
  data?: {
    id?: string;
    quoteId?: string;
    name?: string;
    phone?: string;
    homeType?: QuoteHomeType;
    createdAt?: string;
  };
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
        const websiteConfig = GetEnvConfig()?.api?.website;
        const apiUrl = websiteConfig?.apiUrl;

        // Add `quote.submit` to your website API config.
        const submitUrl = websiteConfig?.quote?.submit;

        if (!apiUrl || !submitUrl) {
          throw new Error("Website quote API configuration is missing.");
        }

        return {
          url: `${apiUrl}${submitUrl}`,
          method: "POST",
          body: {
            name: body.name.trim(),
            phone: body.phone.trim(),
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
