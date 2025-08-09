import { createSlice } from "@reduxjs/toolkit";

export interface IOrderItem {
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountedQuantity?: number;
  discountAmount: number;
  cancelledQty: number;
  netQuantity: number;
  amountBeforeDiscount: number;
  amountAfterDiscount: number;
}

export interface IOrder {
  orderId: string;
  customerName: string;
  createdAt: string;
  itemCount: number;
  paymentStatus: string;
  total: number;
  orderStatus: string;
  note?: string;
  items?: IOrderItem[];
}

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
