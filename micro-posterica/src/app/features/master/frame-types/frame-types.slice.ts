import { createSlice } from "@reduxjs/toolkit";

const frameTypesSlice = createSlice({
  name: "frameTypes",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1; // Immer handles immutability
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = frameTypesSlice.actions;
export default frameTypesSlice;
