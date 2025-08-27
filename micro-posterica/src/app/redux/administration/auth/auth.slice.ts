import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoginResponse } from "../../../../components/auth/login/login";
import { LOCALSTORAGE_AUTH_KEY } from "../../../../constants/global/global-key.const";

interface AuthState {
  accessToken: string | null;
  tokenType: string | null; // Replace with IUser type if you have it
  user: any | null;
  /**
   * ➡️ Taking the persisted state (usually from localStorage, cookies, or server-rendered HTML) and rehydrating (restoring) it into your app’s in-memory state (Redux store)
   */
  hydrated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  tokenType: null,
  user: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType;
      state.user = action.payload.user;
      localStorage.setItem(
        LOCALSTORAGE_AUTH_KEY,
        JSON.stringify(action.payload)
      );
      state.hydrated = true;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.tokenType = null;
      state.user = null;
      localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
      state.hydrated = true;
    },
    rehydrate: (state) => {
      const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
      if (auth) {
        const parsed: ILoginResponse = JSON.parse(auth);
        state.accessToken = parsed.accessToken;
        state.tokenType = parsed.tokenType;
        state.user = parsed.user;
      }
      state.hydrated = true; // mark hydration complete
    },
  },
});

export const { setCredentials, clearCredentials, rehydrate } =
  authSlice.actions;
export default authSlice;
