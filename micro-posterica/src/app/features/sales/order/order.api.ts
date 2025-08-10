import type {
  IOrderResponse,
  IPlaceOrderPayload,
} from "../../../../interfaces/total-calculation.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";
import type { IOrder } from "./order.slice";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  endpoints: (builder) => ({
    // GET /api/orders
    getOrders: builder.query<IOrder[], void>({
      query: () =>
        GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.order?.list, // Adjust path if needed
    }),

    getDetail: builder.query<IOrder, string>({
      query: (orderId) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.order?.detail?.replace("{orderId}", orderId),
    }),

    // POST /api/orders
    placeOrder: builder.mutation<IOrderResponse, IPlaceOrderPayload>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.order?.placeOrder,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetDetailQuery, usePlaceOrderMutation } = ordersApi;
