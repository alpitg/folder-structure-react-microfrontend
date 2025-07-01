import { createSlice } from "@reduxjs/toolkit";
import { fetchMiscCharges } from "./misc-charges.thunk";

export interface IMiscCharges {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export interface IMiscChargesState {
  miscCharges: IMiscCharges[];
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
