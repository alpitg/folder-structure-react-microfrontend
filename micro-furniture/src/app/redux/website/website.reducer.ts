import { combineSlices } from "@reduxjs/toolkit";
import websiteProductSlice from "./product/website-product.slice";

const websiteReducer = combineSlices({
  [websiteProductSlice.name]: websiteProductSlice.reducer,
});

export default websiteReducer;
export type WebsiteState = ReturnType<typeof websiteReducer>;
