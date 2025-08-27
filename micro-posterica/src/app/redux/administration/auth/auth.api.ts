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
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginForm>({
      query: (credentials) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.login,
        method: "POST",
        body: credentials,
      }),
    }),

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
  useUpdatePasswordMutation,
  useUpdateCurrentUserProfileMutation,
} = authApi;
