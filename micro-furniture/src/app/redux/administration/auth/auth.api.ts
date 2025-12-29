import type {
  ILoginForm,
  ILoginResponse,
} from "../../../../components/auth/login/login";
import type {
  IUpdatePasswordRequest,
  IUpdatePasswordResponse,
} from "../../../../components/navbar/user-menu/change-password/change-password.model";
import type {
  IUpdateUserSettingRequest,
  IUpdateUserSettingResponse,
} from "../../../../components/navbar/user-menu/user-setting/user-setting.model";

import { GetEnvConfig } from "../../../../app.config";
import type { IAppInitializer } from "../../../../components/app-initializer/app-initializer";
import type { IUsersData } from "../../../../features/administration/interfaces/users.model";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    // ✅ Login
    login: builder.mutation<ILoginResponse, ILoginForm>({
      query: (credentials) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.login,
        method: "POST",
        body: credentials,
      }),
    }),

    // ✅ Get app initial data
    getAppInitialData: builder.query<IAppInitializer, void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.appInit,
        method: "GET",
      }),
    }),

    // ✅ Forgot password
    forgotPassword: builder.mutation<any, { emailAddress: string }>({
      query: (data) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.forgotPassword,
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Reset password
    resetPassword: builder.mutation<
      any, // you can type response here
      { code: string; newPassword: string } // payload type
    >({
      query: (data) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.resetPassword,
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Update password
    updatePassword: builder.mutation<
      IUpdatePasswordResponse,
      { id: string; data: IUpdatePasswordRequest }
    >({
      query: ({ id, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.updatePassword?.replace(
            "{id}",
            id
          ),
        method: "PUT",
        body: data,
      }),
    }),

    // ✅ Get current user profile
    getCurrentUserProfile: builder.query<IUsersData, string>({
      query: (id) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.getCurrentUserProfile?.replace(
            "{id}",
            id
          ),
        method: "GET",
      }),
    }),

    // ✅ Update current user profile
    updateCurrentUserProfile: builder.mutation<
      IUpdateUserSettingResponse,
      { id: string; data: IUpdateUserSettingRequest }
    >({
      query: ({ id, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.updateCurrentUserProfile?.replace(
            "{id}",
            id
          ),
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAppInitialDataQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useGetCurrentUserProfileQuery,
  useUpdateCurrentUserProfileMutation,
} = authApi;
