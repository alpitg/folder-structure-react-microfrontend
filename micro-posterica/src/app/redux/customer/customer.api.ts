import type {
  GetCustomersParams,
  ICustomer,
  PaginatedCustomers,
} from "../../../features/store/customer/interface/customer.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../app.config";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  tagTypes: ["Customer"], // 👈 important
  endpoints: (builder) => ({
    getPaginatedCustomers: builder.query<
      PaginatedCustomers,
      GetCustomersParams
    >({
      query: (params) => ({
        url: GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.customer?.list,
        method: "POST",
        body: params,
      }),
    }),

    getCustomerDetail: builder.query<ICustomer, string>({
      query: (id) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.customer?.detail?.replace("{id}", id),
    }),

    addCustomer: builder.mutation<ICustomer, ICustomer>({
      query: (body) => ({
        url: GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.customer?.add,
        method: "POST",
        body,
      }),
    }),

    updateCustomer: builder.mutation<
      ICustomer,
      { id: string; data: ICustomer }
    >({
      query: ({ id, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.customer?.update?.replace("{id}", id),
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPaginatedCustomersQuery,
  useGetCustomerDetailQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} = customersApi;
