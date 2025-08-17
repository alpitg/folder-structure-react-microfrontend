import type {
  GetCustomersParams,
  PaginatedCustomers,
} from "../../../features/store/customer/interface/customer.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../app.config";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
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
  }),
});

export const { useGetPaginatedCustomersQuery } = customersApi;
