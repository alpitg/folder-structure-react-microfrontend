import type { IProductList } from "../../../../features/catalog/interfaces/catalog/product/product.model";
import { createSlice } from "@reduxjs/toolkit";

export interface IProductsState {
  products: IProductList[];
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

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProducts.fulfilled, (state, action) => {
  //       state.products = action.payload;
  //     })
  //     .addCase(fetchProducts.rejected, (state, action) => {
  //       state.products = [];
  //       state.error = action.payload as string;
  //     });
  // },
});

export default productSlice;
