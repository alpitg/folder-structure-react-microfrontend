import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// TYPES
// ============================================================

export interface CartDiscount {
  type: string;
  value: number;
}

export interface CartTax {
  rate: number;
  included: boolean;
  className?: string | null;
  amount: number;
}

export interface CartPrice {
  mrp: number;
  sellingPrice: number;
  discount: CartDiscount;
  tax?: CartTax;
}

export interface CartItem {
  id?: string;
  productId: string;
  productType?: string;
  quantity: number;
  name: string;
  description?: string;
  image?: string;
  price: CartPrice;
  itemTotal: number;
  customizedDetails?: unknown;
}

export interface CartSummary {
  totalItems: number;
  totalQuantity: number;
  mrp: number;
  discount: number;
  subtotal: number;
  shipping: number;
  taxToAdd: number;
  totalTax: number;
  miscCharges: number;
  grandTotal: number;
}

export interface CartResponse {
  id?: string | null;
  customerId?: string | null;
  guestCartId?: string | null;
  items: CartItem[];
  currency?: string;
  summary: CartSummary;
}

// ============================================================
// IDENTITY
// ============================================================

export interface CartIdentity {
  customerId?: string | null;
  guestCartId?: string | null;
}

// ============================================================
// REQUESTS
// ============================================================

export type GetCartRequest = CartIdentity;

export interface AddCartItemRequest extends CartIdentity {
  productId: string;
  productType?: string;
  quantity?: number;
  customizedDetails?: unknown;
}

export interface UpdateCartItemRequest extends CartIdentity {
  productId: string;
  quantity: number;
  customizedDetails?: unknown;
}

export type RemoveCartItemRequest = CartIdentity & {
  productId: string;
};

export type ClearCartRequest = CartIdentity;

export interface MergeGuestCartRequest {
  guestCartId: string;
  customerId: string;
}

// ============================================================
// API
// ============================================================

export const websiteCartApi = createApi({
  reducerPath: "websiteCartApi",
  baseQuery: websiteBaseQuery,

  tagTypes: ["WebsiteCart"],

  endpoints: (builder) => ({
    // ========================================================
    // GET
    // ========================================================

    getWebsiteCart: builder.query<CartResponse, GetCartRequest>({
      query: (identity) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.cart?.get,

          method: "GET",

          params: {
            ...(identity.customerId ? { customerId: identity.customerId } : {}),

            ...(identity.guestCartId
              ? { guestCartId: identity.guestCartId }
              : {}),
          },
        };
      },

      providesTags: ["WebsiteCart"],
    }),

    // ========================================================
    // ADD
    // ========================================================

    addWebsiteCartItem: builder.mutation<CartResponse, AddCartItemRequest>({
      query: (payload) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.cart?.addItem,

          method: "POST",
          body: payload,
        };
      },

      invalidatesTags: ["WebsiteCart"],
    }),

    // ========================================================
    // UPDATE
    // ========================================================

    updateWebsiteCartItem: builder.mutation<
      CartResponse,
      UpdateCartItemRequest
    >({
      query: (payload) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.cart?.updateItem,

          method: "PUT",
          body: payload,
        };
      },

      invalidatesTags: ["WebsiteCart"],
    }),

    // ========================================================
    // REMOVE
    // ========================================================

    removeWebsiteCartItem: builder.mutation<
      CartResponse,
      RemoveCartItemRequest
    >({
      query: (payload) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.cart?.removeItem,

          method: "DELETE",
          body: payload,
        };
      },

      invalidatesTags: ["WebsiteCart"],
    }),

    // ========================================================
    // CLEAR
    // ========================================================

    clearWebsiteCart: builder.mutation<CartResponse, ClearCartRequest>({
      query: (payload) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.cart?.clear,

          method: "DELETE",
          body: payload,
        };
      },

      invalidatesTags: ["WebsiteCart"],
    }),

    // ========================================================
    // MERGE
    // ========================================================

    mergeGuestCart: builder.mutation<CartResponse, MergeGuestCartRequest>({
      query: (payload) => {
        const config = GetEnvConfig();

        return {
          url: config?.api?.baseUrl + config?.api?.website?.cart?.merge,

          method: "POST",
          body: payload,
        };
      },

      invalidatesTags: ["WebsiteCart"],
    }),
  }),
});

export const {
  useGetWebsiteCartQuery,
  useLazyGetWebsiteCartQuery,
  useAddWebsiteCartItemMutation,
  useUpdateWebsiteCartItemMutation,
  useRemoveWebsiteCartItemMutation,
  useClearWebsiteCartMutation,
  useMergeGuestCartMutation,
} = websiteCartApi;
