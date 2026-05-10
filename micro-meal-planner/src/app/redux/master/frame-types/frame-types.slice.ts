import { createSlice } from "@reduxjs/toolkit";
import { fetchFrameTypes } from "./frame-types.thunk";

export interface IFrameType {
  id: string;
  name: string;
  category: string;
  baseCost: number;
  description: string;
}

export interface IFrameTypesState {
  frameTypes: IFrameType[];
}

const initialState: IFrameTypesState = {
  frameTypes: [],
};

const frameTypesSlice = createSlice({
  name: "frameTypes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFrameTypes.fulfilled, (state, action) => {
      state.frameTypes = action.payload;
    });
  },
});

export default frameTypesSlice;
