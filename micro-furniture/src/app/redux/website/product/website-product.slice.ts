import type {
  IPaginatedProductResponse,
  IProductData,
} from "../../../../features/store/catalog/interface/product/product.model";

import { createSlice } from "@reduxjs/toolkit";

export interface IWebsiteProductsState {
  websiteProducts: IPaginatedProductResponse;
  websiteProductDetail: IProductData | null;
  error: string | null;
}

const initialState: IWebsiteProductsState = {
  websiteProducts: {
    total: 0,
    page: 0,
    pageSize: 0,
    pages: 0,
    items: [],
  },
  websiteProductDetail: null,

  error: null,
};

const websiteProductSlice = createSlice({
  name: "websiteProducts",
  initialState,
  reducers: {},

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchWebsiteProducts.fulfilled, (state, action) => {
  //       state.websiteProducts = action.payload;
  //     })
  //     .addCase(fetchWebsiteProducts.rejected, (state, action) => {
  //       state.websiteProducts = [];
  //       state.error = action.payload as string;
  //     });
  // },
});

export default websiteProductSlice;
