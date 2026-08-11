import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

//#region

// ============================================================
// REQUEST TYPES
// ============================================================

export interface SendOtpRequest {
  mobile: string;
}

export interface VerifyOtpRequest {
  mobile: string;
  otp: string;
}

export interface ResendOtpRequest {
  mobile: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// ============================================================
// USER
// ============================================================

export interface WebsiteUser {
  id: string;
  mobile?: string;
  phone?: string;
  name?: string;
  email?: string;
}

// ============================================================
// SEND OTP RESPONSE
// ============================================================

export interface SendOtpResponse {
  success: boolean;
  message: string;
  mobile?: string;
  expiresIn?: number;
  retryAfter?: number;
}

// ============================================================
// VERIFY OTP RESPONSE
// ============================================================

export interface VerifyOtpResponse {
  success: boolean;
  message: string;

  customer?: WebsiteUser;

  access_token?: string;
  refresh_token?: string;

  token_type?: string;
  expiresIn?: number;
}

// ============================================================
// RESEND OTP RESPONSE
// ============================================================

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  mobile?: string;
  expiresIn?: number;
  retryAfter?: number;
}

// ============================================================
// REFRESH TOKEN RESPONSE
// ============================================================

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;

  access_token?: string;

  token_type?: string;

  expiresIn?: number;
}

// ============================================================
// CURRENT USER RESPONSE
// ============================================================

export interface CurrentUserResponse {
  success: boolean;
  message?: string;
  user?: WebsiteUser;
}

// ============================================================
// LOGOUT RESPONSE
// ============================================================

export interface LogoutResponse {
  success: boolean;
  message: string;
}

//#endregion

// ============================================================
// API
// ============================================================

export const profileLoginApi = createApi({
  reducerPath: "profileLoginApi",

  baseQuery,

  tagTypes: ["ProfileLogin", "Profile"],

  endpoints: (builder) => ({
    // ========================================================
    // SEND LOGIN OTP
    // ========================================================

    sendLoginOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.auth?.sendOtp,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["ProfileLogin"],
    }),

    // ========================================================
    // VERIFY LOGIN OTP
    // ========================================================

    verifyLoginOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.auth?.verifyOtp,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["ProfileLogin", "Profile"],
    }),

    // ========================================================
    // RESEND LOGIN OTP
    // ========================================================

    resendLoginOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.auth?.resendOtp,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["ProfileLogin"],
    }),

    // ========================================================
    // REFRESH ACCESS TOKEN
    // ========================================================

    refreshAccessToken: builder.mutation<
      RefreshTokenResponse,
      RefreshTokenRequest
    >({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.auth?.refresh,
        method: "POST",
        body: payload,
      }),
    }),

    // ========================================================
    // GET CURRENT USER
    // ========================================================

    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.auth?.me,
        method: "GET",
      }),

      providesTags: ["Profile"],
    }),

    // ========================================================
    // LOGOUT
    // ========================================================

    logoutCustomer: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.website?.apiUrl +
          GetEnvConfig()?.api?.website?.auth?.logout,
        method: "POST",
      }),

      invalidatesTags: ["ProfileLogin", "Profile"],
    }),
  }),
});

// ============================================================
// HOOKS
// ============================================================

export const {
  useSendLoginOtpMutation,
  useVerifyLoginOtpMutation,
  useResendLoginOtpMutation,
  useRefreshAccessTokenMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLogoutCustomerMutation,
} = profileLoginApi;
