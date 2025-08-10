import type { IMiscCharge } from "../../../../interfaces/order/order.model";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMiscCharges } from "./misc-charges.thunk";

export interface IMiscChargesState {
  miscCharges: IMiscCharge[];
}

const initialState: IMiscChargesState = {
  miscCharges: [],
};

const miscChargesSlice = createSlice({
  name: "miscCharges",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMiscCharges.fulfilled, (state, action) => {
      state.miscCharges = action.payload;
    });
  },
});

export default miscChargesSlice;
