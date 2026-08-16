import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoginResponse } from "../../../../../components/auth/login/login";
import { LOCALSTORAGE_AUTH_KEY } from "../../../../../constants/global/global-key.const";
import type { IUserWithPermissions } from "../../../../../features/administration/interfaces/users.model";
import type { IAppInitializer } from "../../../../../routes/app-initializer.model";

interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  user: IUserWithPermissions | null;
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
    setAppInitialData: (state, action: PayloadAction<IAppInitializer>) => {
      state.user = action.payload.user;
    },
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType;
      state.user = null;

      localStorage.setItem(
        LOCALSTORAGE_AUTH_KEY,
        JSON.stringify({
          accessToken: action.payload.accessToken,
          tokenType: action.payload.tokenType,
        }),
      );
      state.hydrated = true;
    },
    updateAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string; tokenType?: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType ?? state.tokenType;

      const current = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
      if (current) {
        const parsed = JSON.parse(current) as Partial<ILoginResponse>;
        const next = {
          ...parsed,
          accessToken: action.payload.accessToken,
          tokenType: action.payload.tokenType ?? parsed.tokenType,
        };
        localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(next));
      }
    },
    clearCredentials: (state) => {
      localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);

      state.accessToken = null;
      state.tokenType = null;
      state.hydrated = true;
      state.user = null;
    },
    rehydrate: (state) => {
      const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
      if (auth) {
        const parsed = JSON.parse(auth) as Partial<ILoginResponse>;
        state.accessToken = parsed.accessToken ?? null;
        state.tokenType = parsed.tokenType ?? null;
      } else {
        state.accessToken = null;
        state.tokenType = null;
      }

      state.user = null;
      state.hydrated = true; // mark hydration complete
    },
  },
});

export const {
  setAppInitialData,
  setCredentials,
  updateAccessToken,
  clearCredentials,
  rehydrate,
} = authSlice.actions;
export default authSlice;
