import { createSlice } from "@reduxjs/toolkit";

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState: { theme: "Light" },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action?.payload; // Immer handles immutability
    },
  },
});

export const { setTheme } = appSettingsSlice.actions;
export default appSettingsSlice;
