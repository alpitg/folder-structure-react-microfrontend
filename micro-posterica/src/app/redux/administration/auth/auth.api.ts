import type {
  ILoginForm,
  ILoginResponse,
} from "../../../../components/auth/login/login";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
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
  }),
});

export const { useLoginMutation } = authApi;
