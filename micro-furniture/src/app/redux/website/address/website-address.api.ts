import { GetEnvConfig } from "../../../../app.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { websiteBaseQuery } from "../base.api";

// ============================================================
// TYPES
// ============================================================

export interface WebsiteAddress {
  id: string;
  name: string;
  mobile: string;
  addressType: string; //"home" | "work" | "other";
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  customerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWebsiteAddressRequest {
  name: string;
  mobile: string;
  addressType?: string; //"home" | "work" | "other";
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface UpdateWebsiteAddressRequest {
  name?: string;
  mobile?: string;
  addressType?: string; //"home" | "work" | "other";
  addressLine1?: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city?: string;
  state?: string;
  pincode?: string;
  isDefault?: boolean;
}

// ============================================================
// RESPONSE TYPES
// ============================================================

export interface WebsiteAddressesResponse {
  success: boolean;
  addresses: WebsiteAddress[];
}

export interface WebsiteAddressResponse {
  success: boolean;
  message?: string;
  address: WebsiteAddress;
}

export interface WebsiteAddressDeleteResponse {
  success: boolean;
  message?: string;
}

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
      providesTags: [
        {
          type: "WebsiteAddresses",
          id: "LIST",
        },
      ],
    }),

    // ========================================================
    // CREATE ADDRESS
    // ========================================================

    createWebsiteAddress: builder.mutation<
      WebsiteAddressResponse,
      CreateWebsiteAddressRequest
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
      invalidatesTags: [
        {
          type: "WebsiteAddresses",
          id: "LIST",
        },
      ],
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
      invalidatesTags: [
        {
          type: "WebsiteAddresses",
          id: "LIST",
        },
      ],
    }),

    // ========================================================
    // DELETE ADDRESS
    // ========================================================

    deleteWebsiteAddress: builder.mutation<
      WebsiteAddressDeleteResponse,
      string
    >({
      query: (addressId) => {
        const config = GetEnvConfig();

        return {
          url: `${
            config?.api?.website?.apiUrl + config?.api?.website?.auth?.addresses
          }/${addressId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [
        {
          type: "WebsiteAddresses",
          id: "LIST",
        },
      ],
    }),

    // ========================================================
    // SET DEFAULT ADDRESS
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
      invalidatesTags: [
        {
          type: "WebsiteAddresses",
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
  useGetWebsiteAddressesQuery,
  useCreateWebsiteAddressMutation,
  useUpdateWebsiteAddressMutation,
  useDeleteWebsiteAddressMutation,
  useSetDefaultWebsiteAddressMutation,
} = websiteAddressApi;
