import { combineSlices } from "@reduxjs/toolkit";
import orderSlice from "./order/order.slice";

const salesReducer = combineSlices({
  [orderSlice.name]: orderSlice.reducer,
});

export default salesReducer;
export type SalesState = ReturnType<typeof salesReducer>;
