import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";
import type { ICustomer } from "../../../../interfaces/customer/customer";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  endpoints: (builder) => ({
    getcustomers: builder.query<ICustomer[], void>({
      query: () =>
        GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.customer?.list, // Adjust path if needed
    }),
  }),
});

export const { useGetcustomersQuery } = customersApi;
