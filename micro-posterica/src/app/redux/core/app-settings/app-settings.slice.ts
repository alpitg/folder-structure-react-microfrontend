import type { ToastAppProps } from "../../../../components/ui/toast/toast";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitState {
  theme: string;
  toast: ToastAppProps;
}

const initialState: InitState = {
  theme: "Light",
  toast: {
    show: false,
    message: "",
    variant: "info", // safe default
  },
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setToast: (state, action: PayloadAction<ToastAppProps>) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = { show: false, message: "", variant: "info" };
    },
  },
});

export const { setTheme, setToast, clearToast } = appSettingsSlice.actions;
export default appSettingsSlice;
