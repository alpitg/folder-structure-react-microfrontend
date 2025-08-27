import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoginResponse } from "../../../../components/auth/login/login";

interface AuthState {
  accessToken: string | null;
  tokenType: string | null; // Replace with IUser type if you have it
  user: any | null;
}

const initialState: AuthState = {
  accessToken: null,
  tokenType: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      state.accessToken = action.payload?.accessToken;
      state.tokenType = action.payload?.tokenType;
    },
    logout: (state) => {
      state.accessToken = null;
      state.tokenType = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice;
