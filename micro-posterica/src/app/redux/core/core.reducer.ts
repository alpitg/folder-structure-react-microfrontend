import appSettingsSlice from "./app-settings/app-settings.slice";
import { combineSlices } from "@reduxjs/toolkit";
import profileSlice from "./profile/profile-detail.slice";

const coreReducer = combineSlices({
  [appSettingsSlice.name]: appSettingsSlice.reducer,
  [profileSlice.name]: profileSlice.reducer,
});

export default coreReducer;
export type MasterState = ReturnType<typeof coreReducer>;
