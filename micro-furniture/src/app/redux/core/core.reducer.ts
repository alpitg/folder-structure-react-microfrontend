import appSettingsSlice from "./app-settings/app-settings.slice";
import authSlice from "../administration/auth/auth.slice";
import { combineSlices } from "@reduxjs/toolkit";
import profileSlice from "./profile/profile-detail.slice";
import shoppingBagSlice from "./shopping-bag/shopping-bag.slice";

const coreReducer = combineSlices({
  [authSlice.name]: authSlice.reducer,
  [appSettingsSlice.name]: appSettingsSlice.reducer,
  [profileSlice.name]: profileSlice.reducer,
  [shoppingBagSlice.name]: shoppingBagSlice.reducer,
});

export default coreReducer;
export type MasterState = ReturnType<typeof coreReducer>;
