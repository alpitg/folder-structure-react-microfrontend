import { GetEnvConfig } from "../../../../app.config";
import type { WebsiteAddress } from "../address/website-address.api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// TYPES
// ============================================================

export type PaymentMethod = "online";

// ============================================================
// ORDER ITEM
// ============================================================

export interface WebsiteOrderItemPayload {
  productId: string;

  productType?: string;

  quantity: number;

  customizedDetails?: unknown;
}

// ============================================================
// CREATE ORDER REQUEST
// ============================================================

export interface CreateWebsiteOrderRequest {
  customerId: string;

  customerName: string;

  deliveryAddress: WebsiteAddress;

  items: WebsiteOrderItemPayload[];

  miscCharges?: Array<{
    label: string;
    amount: number;
  }>;

  note?: string;

  discountAmount?: number;

  likelyDateOfDelivery?: string;
}

// ============================================================
// ORDER
// ============================================================

export interface WebsiteOrder {
  _id: string;

  orderCode?: string;

  customerId?: string | null;

  customerName?: string;

  totalAmount?: number;

  orderStatus?: string;

  invoiceId?: string | null;
}

// ============================================================
// INVOICE
// ============================================================

export interface WebsiteInvoice {
  _id: string;

  paymentStatus?: string;

  totalAmount?: number;

  balanceAmount?: number;
}

// ============================================================
// PAYMENT
// ============================================================

export interface WebsitePayment {
  provider?: string;

  keyId?: string;

  razorpayOrderId?: string;

  amount?: number;

  currency?: string;
}

// ============================================================
// CREATE ORDER RESPONSE
// ============================================================

export interface CreateWebsiteOrderResponse {
  order: WebsiteOrder;

  invoice?: WebsiteInvoice;

  payment?: WebsitePayment;
}

// ============================================================
// VERIFY PAYMENT
// ============================================================

export interface VerifyWebsitePaymentRequest {
  orderId: string;

  razorpayPaymentId: string;

  razorpayOrderId: string;

  razorpaySignature: string;
}

export interface VerifyWebsitePaymentResponse {
  success: boolean;

  message?: string;

  order?: WebsiteOrder;

  invoice?: WebsiteInvoice;

  payment?: Record<string, unknown> | null;

  paidAt?: string;
}

// ============================================================
// API
// ============================================================

export const websiteOrderApi = createApi({
  reducerPath: "websiteOrderApi",

  baseQuery: websiteBaseQuery,

  tagTypes: ["WebsiteOrder"],

  endpoints: (builder) => ({
    // ========================================================
    // CREATE ORDER
    // ========================================================

    createWebsiteOrder: builder.mutation<
      CreateWebsiteOrderResponse,
      CreateWebsiteOrderRequest
    >({
      query: (body) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.order?.create,

          method: "POST",

          body,
        };
      },

      invalidatesTags: ["WebsiteOrder"],
    }),

    // ========================================================
    // VERIFY PAYMENT
    // ========================================================

    verifyWebsitePayment: builder.mutation<
      VerifyWebsitePaymentResponse,
      VerifyWebsitePaymentRequest
    >({
      query: (body) => {
        const config = GetEnvConfig();

        return {
          url:
            config?.api?.baseUrl + config?.api?.website?.order?.verifyPayment,

          method: "POST",

          body,
        };
      },

      invalidatesTags: ["WebsiteOrder"],
    }),
  }),
});

export const {
  useCreateWebsiteOrderMutation,
  useVerifyWebsitePaymentMutation,
} = websiteOrderApi;
