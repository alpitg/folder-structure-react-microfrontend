import type {
  GetProductsParams,
  IProductData,
  PaginatedProducts,
} from "../../../../features/store/catalog/interface/product/product.model";

import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
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

    getProductDetail: builder.query<IProductData, string>({
      query: (productId) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.catalog?.product?.detail?.replace(
          "{id}",
          productId
        ),
    }),

    addProduct: builder.mutation<IProductData, IProductData>({
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
      { id: string; data: IProductData }
    >({
      query: ({ id, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.catalog?.product?.update?.replace("{id}", id),
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = productsApi;
