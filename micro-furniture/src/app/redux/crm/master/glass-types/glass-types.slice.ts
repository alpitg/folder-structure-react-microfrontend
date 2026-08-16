import { createSlice } from "@reduxjs/toolkit";
import { fetchGlassTypes } from "./glass-types.thunk";

export interface IGlassType {
  id: string;
  name: string;
  rate: number;
  rateIn: string;
  description: string;
}

export interface IGlassTypesState {
  glassTypes: IGlassType[]; 
}

const initialState: IGlassTypesState = {
  glassTypes: [],
};

const glassTypesSlice = createSlice({
  name: "glassTypes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGlassTypes.fulfilled, (state, action) => {
      state.glassTypes = action.payload;
    });
  },
});

export default glassTypesSlice;
