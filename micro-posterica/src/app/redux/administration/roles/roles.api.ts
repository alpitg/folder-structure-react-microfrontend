import type {
  GetRolesParams,
  IRolesData,
  PaginatedRoles,
} from "../../../../features/administration/interfaces/roles.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
  endpoints: (builder) => ({
    getRoles: builder.query<PaginatedRoles, GetRolesParams>({
      query: (params) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.roles?.list,
        method: "POST", // your backend search is POST
        body: params,
      }),
    }),

    getRolesDetail: builder.query<IRolesData, string>({
      query: (productId) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.administration?.roles?.detail?.replace(
          "{id}",
          productId
        ),
    }),

    addRoles: builder.mutation<IRolesData, IRolesData>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.roles?.add,
        method: "POST",
        body,
      }),
    }),

    updateRoles: builder.mutation<IRolesData, { id: string; data: IRolesData }>(
      {
        query: ({ id, data }) => ({
          url:
            GetEnvConfig()?.api?.baseUrl +
            GetEnvConfig()?.api?.administration?.roles?.update?.replace(
              "{id}",
              id
            ),
          method: "PUT",
          body: data,
        }),
      }
    ),
  }),
});

export const {
  useGetRolesQuery,
  useGetRolesDetailQuery,
  useAddRolesMutation,
  useUpdateRolesMutation,
} = rolesApi;
