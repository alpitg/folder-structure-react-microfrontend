import { combineSlices } from "@reduxjs/toolkit";
import frameTypesSlice from "./frame-types/frame-types.slice";
import glassTypesSlice from "./glass-types/glass-types.slice";
import miscChargesSlice from "./misc-charges/misc-charges.slice";

const masterReducer = combineSlices({
  [frameTypesSlice.name]: frameTypesSlice.reducer,
  [glassTypesSlice.name]: glassTypesSlice.reducer,
  [miscChargesSlice.name]: miscChargesSlice.reducer,
});

export default masterReducer;
export type MasterState = ReturnType<typeof masterReducer>;
