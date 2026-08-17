import { GetEnvConfig } from "../../../../app.config";
import type { IProductData } from "../../../../features/store/catalog/interface/product/product.model";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// CONSTANTS
// ============================================================

export const GUEST_CART_KEY = "website_guest_cart_id";

// ============================================================
// TYPES
// ============================================================

export interface WishlistIdentity {
  customerId?: string;
  guestCartId?: string;
}

export interface WebsiteWishlistItem {
  id: string;
  productId: string;
  customerId?: string;
  guestCartId?: string;
  product?: IProductData;
  createdAt?: string;
  updatedAt?: string;
}

export interface WebsiteWishlist {
  id?: string;
  customerId?: string;
  guestCartId?: string;
  items: WebsiteWishlistItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AddWishlistItemPayload extends WishlistIdentity {
  productId: string;
}

export interface RemoveWishlistItemPayload extends WishlistIdentity {
  productId: string;
}

export interface WishlistMutationResponse {
  success: boolean;
  message?: string;
  item?: WebsiteWishlistItem;
}

export interface MergeGuestWishlistPayload {
  guestCartId: string;
  customerId: string;
}

export interface MergeGuestWishlistResponse {
  success: boolean;
  message?: string;
  wishlist?: WebsiteWishlist;
}

// ============================================================
// HELPERS
// ============================================================

export const getGuestCartId = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(GUEST_CART_KEY);
};

// ============================================================
// API CONFIG
// ============================================================

// const websiteConfig = GetEnvConfig()?.api?.website;

// const websiteApiUrl = websiteConfig?.apiUrl;

// const wishlistConfig = websiteConfig?.wishlist;

// ============================================================
// API
// ============================================================

export const websiteWishlistApi = createApi({
  reducerPath: "websiteWishlistApi",
  baseQuery: websiteBaseQuery,
  tagTypes: ["Wishlist"],

  endpoints: (builder) => ({
    // ========================================================
    // GET WISHLIST
    // ========================================================

    getWishlist: builder.query<WebsiteWishlist, WishlistIdentity | undefined>({
      query: (identity) => ({
        url: `${GetEnvConfig()?.api?.website?.apiUrl}${GetEnvConfig()?.api?.website.wishlist?.list}`,
        method: "GET",
        params: identity,
      }),

      providesTags: (wishlist) => {
        if (!wishlist) {
          return [
            {
              type: "Wishlist" as const,
              id: "LIST",
            },
          ];
        }

        return [
          ...wishlist.items.map((item) => ({
            type: "Wishlist" as const,
            id: item.productId,
          })),
          {
            type: "Wishlist" as const,
            id: "LIST",
          },
        ];
      },

      keepUnusedDataFor: 300,
    }),

    // ========================================================
    // ADD PRODUCT TO WISHLIST
    // ========================================================

    addWishlistItem: builder.mutation<
      WishlistMutationResponse,
      AddWishlistItemPayload
    >({
      query: (body) => ({
        url: `${GetEnvConfig()?.api?.website?.apiUrl}${GetEnvConfig()?.api?.website.wishlist?.add}`,
        method: "POST",
        body,
      }),

      invalidatesTags: (_result, error, { productId }) => {
        if (error) {
          return [];
        }

        return [
          {
            type: "Wishlist" as const,
            id: productId,
          },
          {
            type: "Wishlist" as const,
            id: "LIST",
          },
        ];
      },
    }),

    // ========================================================
    // REMOVE PRODUCT FROM WISHLIST
    // ========================================================

    removeWishlistItem: builder.mutation<
      WishlistMutationResponse,
      RemoveWishlistItemPayload
    >({
      query: ({ productId, ...identity }) => {
        const wishlistRemoveUrl =
          GetEnvConfig()?.api?.website.wishlist?.remove?.replace(
            "{productId}",
            encodeURIComponent(productId),
          );

        return {
          url: `${GetEnvConfig()?.api?.website?.apiUrl}${wishlistRemoveUrl}`,
          method: "DELETE",
          params: identity,
        };
      },

      invalidatesTags: (_result, error, { productId }) => {
        if (error) {
          return [];
        }

        return [
          {
            type: "Wishlist" as const,
            id: productId,
          },
          {
            type: "Wishlist" as const,
            id: "LIST",
          },
        ];
      },
    }),

    // ========================================================
    // MERGE GUEST WISHLIST
    // ========================================================

    mergeGuestWishlist: builder.mutation<
      MergeGuestWishlistResponse,
      MergeGuestWishlistPayload
    >({
      query: (body) => ({
        url: `${GetEnvConfig()?.api?.website?.apiUrl}${GetEnvConfig()?.api?.website.wishlist?.merge}`,
        method: "POST",
        body,
      }),

      invalidatesTags: [
        {
          type: "Wishlist" as const,
          id: "LIST",
        },
      ],
    }),
  }),
});

// ============================================================
// HOOKS
// ============================================================

export const {
  useGetWishlistQuery,
  useAddWishlistItemMutation,
  useRemoveWishlistItemMutation,
  useMergeGuestWishlistMutation,
} = websiteWishlistApi;
