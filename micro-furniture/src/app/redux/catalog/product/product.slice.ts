import type { IProductData } from "../../../../features/store/catalog/interface/product/product.model";
import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "./product.api";

export interface IProductsState {
  products: IProductData[];
  error: string | null;
}

const initialState: IProductsState = {
  products: [],
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(productsApi.endpoints.getProducts.matchFulfilled, (state, action) => {
        state.products = action.payload?.items ?? [];
        state.error = null;
      })
      .addMatcher(productsApi.endpoints.getProducts.matchRejected, (state, action) => {
        state.products = [];
        state.error = action.error?.message ?? "Failed to load products";
      });
  },
});

export default productSlice;
