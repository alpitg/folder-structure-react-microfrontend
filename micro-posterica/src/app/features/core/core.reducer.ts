import appSettingsSlice from "./app-settings/app-settings.slice";
import { combineSlices } from "@reduxjs/toolkit";

const coreReducer = combineSlices({
  [appSettingsSlice.name]: appSettingsSlice.reducer,
});

export default coreReducer;
export type MasterState = ReturnType<typeof coreReducer>;
