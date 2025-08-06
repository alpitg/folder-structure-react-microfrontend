import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";
import type { IOrder } from "./order.slice";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () =>
        GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.order?.list, // Adjust path if needed
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
