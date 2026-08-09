import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

//#region Types

export interface CartItem {
  id: string;
  productId: string;
  productType?: string;
  name: string;
  image?: string;
  quantity: number;

  unitPrice: number;
  totalPrice: number;

  customizedDetails?: Record<string, unknown>;
}

export interface CartCharges {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  miscCharges: number;
  grandTotal: number;
}

export interface CartMiscCharge {
  label: string;
  amount: number;
}

export interface WebsiteCart {
  id?: string;
  customerId?: string | null;

  items: CartItem[];

  charges: CartCharges;

  miscCharges?: CartMiscCharge[];

  couponCode?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface GetCartRequest {
  customerId?: string | null;
}

export interface AddCartItemRequest {
  productId: string;
  productType?: string;
  quantity: number;
  customerId?: string | null;
  customizedDetails?: Record<string, unknown>;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
  customerId?: string | null;
}

export interface RemoveCartItemRequest {
  itemId: string;
  customerId?: string | null;
}

export interface ClearCartRequest {
  customerId?: string | null;
}

//#endregion

export const websiteCartApi = createApi({
  reducerPath: "websiteCartApi",

  baseQuery,

  tagTypes: ["WebsiteCart"],

  endpoints: (builder) => ({
    //#region Get Cart

    getWebsiteCart: builder.query<WebsiteCart, GetCartRequest | void>({
      query: (params) => ({
        url: GetEnvConfig()?.api?.website?.cart?.get,
        method: "GET",
        params: params ?? {},
      }),

      providesTags: ["WebsiteCart"],
    }),

    //#endregion

    //#region Add Item

    addWebsiteCartItem: builder.mutation<WebsiteCart, AddCartItemRequest>({
      query: (payload) => ({
        url: GetEnvConfig()?.api?.website?.cart?.addItem,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["WebsiteCart"],
    }),

    //#endregion

    //#region Update Item

    updateWebsiteCartItem: builder.mutation<WebsiteCart, UpdateCartItemRequest>(
      {
        query: (payload) => ({
          url: GetEnvConfig()?.api?.website?.cart?.updateItem,
          method: "PUT",
          body: payload,
        }),

        invalidatesTags: ["WebsiteCart"],
      },
    ),

    //#endregion

    //#region Remove Item

    removeWebsiteCartItem: builder.mutation<WebsiteCart, RemoveCartItemRequest>(
      {
        query: (payload) => ({
          url: GetEnvConfig()?.api?.website?.cart?.removeItem,
          method: "DELETE",
          body: payload,
        }),

        invalidatesTags: ["WebsiteCart"],
      },
    ),

    //#endregion

    //#region Clear Cart

    clearWebsiteCart: builder.mutation<WebsiteCart, ClearCartRequest>({
      query: (payload) => ({
        url: GetEnvConfig()?.api?.website?.cart?.clear,
        method: "POST",
        body: payload,
      }),

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
