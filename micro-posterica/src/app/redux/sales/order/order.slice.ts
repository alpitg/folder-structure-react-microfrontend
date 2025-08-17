import type { IOrder } from "../../../../interfaces/order/order.model";
import { createSlice } from "@reduxjs/toolkit";

export interface IOrdersState {
  orders: IOrder[];
  error: string | null;
}

const initialState: IOrdersState = {
  orders: [],
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchOrders.fulfilled, (state, action) => {
  //       state.orders = action.payload;
  //     })
  //     .addCase(fetchOrders.rejected, (state, action) => {
  //       state.orders = [];
  //       state.error = action.payload as string;
  //     });
  // },
});

export default orderSlice;
