import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

//#region Types

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
  customizedDetails?: Record<string, unknown>;
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

export interface CartResponse {
  id?: string;
  customerId?: string | null;
  guestCartId?: string | null;
  items: CartItem[];
  pricing: CartPricing;
  currency?: string;

  summary: CartSummary;
}

export interface CartSummary {
  totalItems: number;
  totalQuantity: number;
  mrp: number;
  discount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  miscCharges: number;
  grandTotal: number;
}

//#endregion

//#region Request Types

/**
 * Logged-in customer:
 *   customerId = customer ID
 *
 * Guest:
 *   guestCartId = browser-generated guest ID
 */
export interface CartIdentity {
  customerId?: string | null;
  guestCartId?: string | null;
}

export interface AddCartItemRequest extends CartIdentity {
  productId: string;
  productType?: string;
  quantity?: number;
  customizedDetails?: Record<string, unknown>;
}

export interface UpdateCartItemRequest extends CartIdentity {
  productId: string;
  quantity: number;
  customizedDetails?: Record<string, unknown>;
}

export type RemoveCartItemRequest = CartIdentity & {
  productId: string;
};

export type GetCartRequest = CartIdentity;

export type ClearCartRequest = CartIdentity;

//#endregion

export const websiteCartApi = createApi({
  reducerPath: "websiteCartApi",

  baseQuery,

  tagTypes: ["WebsiteCart"],

  endpoints: (builder) => ({
    //#region Get Cart

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

    //#endregion

    //#region Add Item

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

    //#endregion

    //#region Update Item

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

    //#endregion

    //#region Remove Item

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

    //#endregion

    //#region Clear Cart

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

    //#endregion
  }),
});

export const {
  useGetWebsiteCartQuery,
  useLazyGetWebsiteCartQuery,
  useAddWebsiteCartItemMutation,
  useUpdateWebsiteCartItemMutation,
  useRemoveWebsiteCartItemMutation,
  useClearWebsiteCartMutation,
} = websiteCartApi;
