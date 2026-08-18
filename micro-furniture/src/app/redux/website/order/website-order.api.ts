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
  id?: string;
  orderCode?: string;
  customerId?: string | null;
  customerName?: string;
  totalAmount?: number;
  orderStatus?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingAmount?: number;
  subtotal?: number;
  totalDiscountAmount?: number;
  totalTaxAmount?: number;
  cancelledAmount?: number;
  invoiceId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  likelyDateOfDelivery?: string | null;
  note?: string | null;
  items?: WebsiteOrderItem[];
  deliveryAddress?: WebsiteOrderDeliveryAddress | null;
}

// ============================================================
// ORDER ITEM RESPONSE
// ============================================================

export interface WebsiteOrderItem {
  productId: string;
  productType?: string;
  name?: string;
  description?: string | null;
  quantity: number;
  unitPrice?: number;
  mrp?: number;
  discountedQuantity?: number;
  discountAmount?: number;
  cancelledQty?: number;
  taxSnapshot?: Array<{
    className?: string;
    rate?: number;
    included?: boolean;
    amount?: number;
  }>;
}

// ============================================================
// DELIVERY ADDRESS
// ============================================================

export interface WebsiteOrderDeliveryAddress {
  name?: string;

  mobile?: string;

  addressType?: string;

  addressLine1?: string;

  addressLine2?: string | null;

  landmark?: string | null;

  city?: string;

  state?: string;

  pincode?: string;
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
// GET ORDERS RESPONSE
// ============================================================

export interface WebsiteOrdersPagination {
  page: number;

  limit: number;

  total: number;

  pages: number;
}

export interface GetWebsiteOrdersResponse {
  success: boolean;

  orders: WebsiteOrder[];

  pagination: WebsiteOrdersPagination;
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
    // GET MY ORDERS
    // ========================================================

    getWebsiteOrders: builder.query<
      GetWebsiteOrdersResponse,
      {
        page?: number;

        limit?: number;
      }
    >({
      query: ({ page = 1, limit = 10 } = {}) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.order?.list,

          method: "GET",

          params: {
            page,

            limit,
          },
        };
      },

      providesTags: (result) =>
        result
          ? [
              {
                type: "WebsiteOrder",
                id: "LIST",
              },
              ...result.orders.map((order) => ({
                type: "WebsiteOrder" as const,

                id: order.id,
              })),
            ]
          : [
              {
                type: "WebsiteOrder",
                id: "LIST",
              },
            ],
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

// ============================================================
// HOOKS
// ============================================================

export const {
  useCreateWebsiteOrderMutation,
  useGetWebsiteOrdersQuery,
  useVerifyWebsitePaymentMutation,
} = websiteOrderApi;
