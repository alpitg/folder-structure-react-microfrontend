import type {
  GetOrdersParams,
  PaginatedOrders,
} from "../../../../features/finance/sales/order/list/order-list.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";
import type { IOrderInvoiceData } from "../../../../interfaces/order/order.model";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedOrders, GetOrdersParams>({
      query: (params) => ({
        url: GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.order?.list,
        method: "POST", // your backend search is POST
        body: params,
      }),
    }),

    getDetail: builder.query<IOrderInvoiceData, string>({
      query: (orderId) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.order?.detail?.replace("{orderId}", orderId),
    }),

    placeOrder: builder.mutation<IOrderInvoiceData, IOrderInvoiceData>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.order?.placeOrder,
        method: "POST",
        body,
      }),
    }),

    updateOrder: builder.mutation<
      IOrderInvoiceData,
      { orderId: string; data: IOrderInvoiceData }
    >({
      query: ({ orderId, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.order?.updateOrder?.replace(
            "{orderId}",
            orderId
          ),
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetDetailQuery,
  usePlaceOrderMutation,
  useUpdateOrderMutation,
} = ordersApi;
