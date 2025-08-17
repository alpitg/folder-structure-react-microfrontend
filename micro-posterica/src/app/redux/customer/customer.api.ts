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
  endpoints: (builder) => ({
    getPaginatedcustomers: builder.query<
      PaginatedCustomers,
      GetCustomersParams
    >({
      query: (params) => ({
        url: GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.customer?.list,
        method: "POST",
        body: params,
      }),
    }),

    getcustomers: builder.query<ICustomer[], void>({
      query: () =>
        GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.customer?.list, // Adjust path if needed
    }),
  }),
});

export const { useGetcustomersQuery, useGetPaginatedcustomersQuery } =
  customersApi;
