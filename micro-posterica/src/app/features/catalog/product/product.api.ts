import type {
  GetProductsParams,
  IProductData,
  PaginatedProducts,
} from "../../../../features/catalog/interfaces/catalog/product/product.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedProducts, GetProductsParams>({
      query: (params) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.catalog?.product?.list,
        method: "POST", // your backend search is POST
        body: params,
      }),
    }),

    getDetail: builder.query<IProductData, string>({
      query: (productId) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.catalog?.product?.detail?.replace(
          "{id}",
          productId
        ),
    }),

    placeProduct: builder.mutation<IProductData, IProductData>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.catalog?.product?.add,
        method: "POST",
        body,
      }),
    }),

    updateProduct: builder.mutation<
      IProductData,
      { productId: string; data: IProductData }
    >({
      query: ({ productId, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.catalog?.product?.update?.replace(
            "{id}",
            productId
          ),
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetDetailQuery,
  usePlaceProductMutation,
  useUpdateProductMutation,
} = productsApi;
