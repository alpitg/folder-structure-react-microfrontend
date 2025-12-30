import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoginResponse } from "../../../../components/auth/login/login";
import { LOCALSTORAGE_AUTH_KEY } from "../../../../constants/global/global-key.const";
import type { IAppInitializer } from "../../../../components/app-initializer/app-initializer";
import type { IUserWithPermissions } from "../../../../features/administration/interfaces/users.model";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null; // Replace with IUser type if you have it
  user: IUserWithPermissions | null;
  /**
   * ➡️ Taking the persisted state (usually from localStorage, cookies, or server-rendered HTML) and rehydrating (restoring) it into your app’s in-memory state (Redux store)
   */
  hydrated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  tokenType: null,
  user: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAppInitialData: (state, action: PayloadAction<IAppInitializer>) => {
      state.user = action.payload.user;
    },
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenType = action.payload.tokenType;
      localStorage.setItem(
        LOCALSTORAGE_AUTH_KEY,
        JSON.stringify(action.payload)
      );
      state.hydrated = true;
    },
    clearCredentials: (state) => {
      localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);

      state.accessToken = null;
      state.refreshToken = null;
      state.tokenType = null;
      state.hydrated = true;
      state.user = null;
    },
    rehydrate: (state) => {
      const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
      if (auth) {
        const parsed: ILoginResponse = JSON.parse(auth);
        state.accessToken = parsed.accessToken;
        state.tokenType = parsed.tokenType;
      }
      state.hydrated = true; // mark hydration complete
    },
  },
});

export const {
  setAppInitialData,
  setCredentials,
  clearCredentials,
  rehydrate,
} = authSlice.actions;
export default authSlice;
