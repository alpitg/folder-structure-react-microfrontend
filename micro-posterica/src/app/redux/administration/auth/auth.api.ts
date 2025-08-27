import type {
  ILoginForm,
  ILoginResponse,
} from "../../../../components/auth/login/login";
import type {
  IUpdatePasswordRequest,
  IUpdatePasswordResponse,
} from "../../../../components/navbar/user-menu/change-password/change-password.model";
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
      IUpdatePasswordRequest
    >({
      query: (payload) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.updatePassword,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useUpdatePasswordMutation } = authApi;
