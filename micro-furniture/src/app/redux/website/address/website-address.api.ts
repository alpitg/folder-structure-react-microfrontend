import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// TYPES
// ============================================================

export interface WebsiteAddress {
  id?: string;
  name: string;
  mobile: string;
  addressType: string; //"home" | "work" | "other";
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface WebsiteAddressesResponse {
  success: boolean;
  addresses: WebsiteAddress[];
}

export interface WebsiteAddressResponse {
  success: boolean;
  address: WebsiteAddress;
}

export interface UpdateWebsiteAddressRequest extends Partial<WebsiteAddress> {}

// ============================================================
// API
// ============================================================

export const websiteAddressApi = createApi({
  reducerPath: "websiteAddressApi",
  baseQuery: websiteBaseQuery,

  tagTypes: ["WebsiteAddresses"],

  endpoints: (builder) => ({
    // ========================================================
    // GET ADDRESSES
    // ========================================================

    getWebsiteAddresses: builder.query<WebsiteAddressesResponse, void>({
      query: () => {
        const config = GetEnvConfig();

        return {
          url:
            config?.api?.website?.apiUrl +
            config?.api?.website?.auth?.addresses,

          method: "GET",
        };
      },

      providesTags: ["WebsiteAddresses"],
    }),

    // ========================================================
    // CREATE ADDRESS
    // ========================================================

    createWebsiteAddress: builder.mutation<
      WebsiteAddressResponse,
      WebsiteAddress
    >({
      query: (body) => {
        const config = GetEnvConfig();

        return {
          url:
            config?.api?.website?.apiUrl +
            config?.api?.website?.auth?.addresses,

          method: "POST",

          body,
        };
      },

      invalidatesTags: ["WebsiteAddresses"],
    }),

    // ========================================================
    // UPDATE ADDRESS
    // ========================================================

    updateWebsiteAddress: builder.mutation<
      WebsiteAddressResponse,
      {
        addressId: string;
        body: UpdateWebsiteAddressRequest;
      }
    >({
      query: ({ addressId, body }) => {
        const config = GetEnvConfig();

        return {
          url: `${
            config?.api?.website?.apiUrl + config?.api?.website?.auth?.addresses
          }/${addressId}`,

          method: "PATCH",

          body,
        };
      },

      invalidatesTags: ["WebsiteAddresses"],
    }),

    // ========================================================
    // DELETE ADDRESS
    // ========================================================

    deleteWebsiteAddress: builder.mutation<unknown, string>({
      query: (addressId) => {
        const config = GetEnvConfig();

        return {
          url: `${
            config?.api?.website?.apiUrl + config?.api?.website?.auth?.addresses
          }/${addressId}`,

          method: "DELETE",
        };
      },

      invalidatesTags: ["WebsiteAddresses"],
    }),

    // ========================================================
    // SET DEFAULT
    // ========================================================

    setDefaultWebsiteAddress: builder.mutation<WebsiteAddressResponse, string>({
      query: (addressId) => {
        const config = GetEnvConfig();

        return {
          url: `${
            config?.api?.website?.apiUrl + config?.api?.website?.auth?.addresses
          }/${addressId}/default`,

          method: "POST",
        };
      },

      invalidatesTags: ["WebsiteAddresses"],
    }),
  }),
});

export const {
  useGetWebsiteAddressesQuery,
  useCreateWebsiteAddressMutation,
  useUpdateWebsiteAddressMutation,
  useDeleteWebsiteAddressMutation,
  useSetDefaultWebsiteAddressMutation,
} = websiteAddressApi;
