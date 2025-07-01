import { combineSlices } from "@reduxjs/toolkit";
import frameTypesSlice from "./frame-types/frame-types.slice";

const masterReducer = combineSlices({
  [frameTypesSlice.name]: frameTypesSlice.reducer,
});

export default masterReducer;
export type MasterState = ReturnType<typeof masterReducer>;
