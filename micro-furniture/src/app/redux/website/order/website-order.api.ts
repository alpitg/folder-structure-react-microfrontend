import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

export interface PublicOrderItem {
  productId: string;
  productType?: string;
  quantity: number;
}

export interface PublicOrderRequest {
  customerName: string;
  customerId?: string | null;
  items: PublicOrderItem[];
  miscCharges?: {
    label: string;
    amount: number;
  }[];
  note?: string;
  likelyDateOfDelivery?: string | null;
}

export interface RazorpayPaymentData {
  provider: string;
  keyId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
}

export interface WebsiteOrderResponse {
  order: Record<string, unknown>;
  invoice: Record<string, unknown> | null;
  payment: RazorpayPaymentData;
}

export interface VerifyPaymentRequest {
  orderId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  order: Record<string, unknown>;
  invoice: Record<string, unknown> | null;
}

export const websiteOrderApi = createApi({
  reducerPath: "websiteOrderApi",
  baseQuery: websiteBaseQuery,
  tagTypes: ["WebsiteOrder"],

  endpoints: (builder) => ({
    createWebsiteOrder: builder.mutation<
      WebsiteOrderResponse,
      PublicOrderRequest
    >({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.order?.create,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["WebsiteOrder"],
    }),

    verifyWebsitePayment: builder.mutation<
      VerifyPaymentResponse,
      VerifyPaymentRequest
    >({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.order?.verifyPayment,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["WebsiteOrder"],
    }),
  }),
});

export const {
  useCreateWebsiteOrderMutation,
  useVerifyWebsitePaymentMutation,
} = websiteOrderApi;
