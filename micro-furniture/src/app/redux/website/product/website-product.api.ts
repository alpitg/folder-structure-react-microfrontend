import type {
  GetProductsParams,
  IProductData,
  PaginatedProducts,
} from "../../../../features/store/catalog/interface/product/product.model";

import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const websiteProductApi = createApi({
  reducerPath: "websiteProductApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedProducts, GetProductsParams>({
      query: (params) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.product?.list,
        method: "GET",
        params, // ✅ GET query params
      }),
    }),

    getProductDetail: builder.query<IProductData, string>({
      query: (productId) =>
        GetEnvConfig()?.api?.website?.apiUrl +
        GetEnvConfig()?.api?.website?.product?.detail?.replace(
          "{id}",
          productId,
        ),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = websiteProductApi;
