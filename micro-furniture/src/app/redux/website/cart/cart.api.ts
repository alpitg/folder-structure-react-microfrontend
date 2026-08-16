import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// CART TYPES
// ============================================================

export interface CartDiscount {
  type: string;
  value: number;
}

export interface CartPrice {
  mrp: number;
  sellingPrice: number;
  discount: CartDiscount;
}

export interface CartItem {
  id: string;
  productId: string;
  productType?: string;

  quantity: number;

  name: string;
  description?: string;
  image?: string;

  price: CartPrice;

  itemTotal: number;

}

export interface CartPricing {
  subtotal: number;
  totalMrp: number;
  discount: number;

  tax: number;
  shipping: number;
  miscCharges: number;

  total: number;
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
  id?: string;

  customerId?: string | null;
  guestCartId?: string | null;

  items: CartItem[];

  pricing: CartPricing;

  currency?: string;

  summary: CartSummary;
}

// ============================================================
// CART IDENTITY
// ============================================================

/**
 * Guest Cart
 *
 * {
 *   guestCartId: "guest-xxxx"
 * }
 *
 * Logged-in Customer
 *
 * {
 *   customerId: "customer-xxxx"
 * }
 *
 * During merge
 *
 * {
 *   guestCartId: "guest-xxxx",
 *   customerId: "customer-xxxx"
 * }
 */
export interface CartIdentity {
  customerId?: string | null;
  guestCartId?: string | null;
}

// ============================================================
// GET CART
// ============================================================

export type GetCartRequest = CartIdentity;

// ============================================================
// ADD CART ITEM
// ============================================================

export interface AddCartItemRequest extends CartIdentity {
  productId: string;
  productType?: string;
  quantity?: number;

}

// ============================================================
// UPDATE CART ITEM
// ============================================================

export interface UpdateCartItemRequest extends CartIdentity {
  productId: string;
  quantity: number;
}

// ============================================================
// REMOVE CART ITEM
// ============================================================

export type RemoveCartItemRequest = CartIdentity & {
  productId: string;
};

// ============================================================
// CLEAR CART
// ============================================================

export type ClearCartRequest = CartIdentity;

// ============================================================
// MERGE GUEST CART
// ============================================================

/**
 * Called after a guest user logs in.
 *
 * Example:
 *
 * {
 *   guestCartId: "guest-123",
 *   customerId: "customer-456"
 * }
 *
 * Backend should:
 *
 * 1. Find guest cart
 * 2. Find customer cart
 * 3. Merge items
 * 4. Resolve duplicate products/quantities
 * 5. Assign final cart to customer
 * 6. Remove/close guest cart
 * 7. Return final customer cart
 */
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
    // GET CART
    // ========================================================

    getWebsiteCart: builder.query<CartResponse, GetCartRequest | void>({
      query: (identity) => {
        const config = GetEnvConfig();

        const customerId = identity?.customerId;
        const guestCartId = identity?.guestCartId;

        return {
          url: config?.api?.baseUrl + config?.api?.website?.cart?.get,

          method: "GET",

          params: {
            ...(customerId ? { customerId } : {}),
            ...(guestCartId ? { guestCartId } : {}),
          },
        };
      },

      providesTags: ["WebsiteCart"],
    }),

    // ========================================================
    // ADD CART ITEM
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
    // UPDATE CART ITEM
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
    // REMOVE CART ITEM
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
    // CLEAR CART
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
    // MERGE GUEST CART
    // ========================================================

    /**
     * Guest → Customer cart merge.
     *
     * This should be called immediately after successful login.
     *
     * Example:
     *
     * await mergeGuestCart({
     *   guestCartId,
     *   customerId,
     * });
     */
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

// ============================================================
// HOOKS
// ============================================================

export const {
  // GET
  useGetWebsiteCartQuery,
  useLazyGetWebsiteCartQuery,

  // ADD
  useAddWebsiteCartItemMutation,

  // UPDATE
  useUpdateWebsiteCartItemMutation,

  // REMOVE
  useRemoveWebsiteCartItemMutation,

  // CLEAR
  useClearWebsiteCartMutation,

  // MERGE
  useMergeGuestCartMutation,
} = websiteCartApi;
