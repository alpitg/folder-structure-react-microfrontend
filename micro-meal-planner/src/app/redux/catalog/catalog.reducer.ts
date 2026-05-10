import { combineSlices } from "@reduxjs/toolkit";
import productSlice from "./product/product.slice";

const catalogReducer = combineSlices({
  [productSlice.name]: productSlice.reducer,
});

export default catalogReducer;
export type CatalogState = ReturnType<typeof catalogReducer>;
