import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";
import type { IOrder } from "./order.slice";
import type { IOrderInvoiceData } from "../../../../interfaces/order/order.model";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  endpoints: (builder) => ({
    // GET /api/orders
    getOrders: builder.query<IOrder[], void>({
      query: () =>
        GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.order?.list, // Adjust path if needed
    }),

    getDetail: builder.query<IOrderInvoiceData, string>({
      query: (orderId) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.order?.detail?.replace("{orderId}", orderId),
    }),

    // POST /api/orders
    placeOrder: builder.mutation<IOrderInvoiceData, IOrderInvoiceData>({
      query: (body) => ({
        url:
          "GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.order?.placeOrder",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetDetailQuery, usePlaceOrderMutation } =
  ordersApi;
