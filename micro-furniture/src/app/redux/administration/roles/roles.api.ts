import type {
  GetRolesParams,
  IRoleWithPermissions,
  PaginatedRoles,
} from "../../../../features/administration/interfaces/roles.model";

import { GetEnvConfig } from "../../../../app.config";
import type { IRolePermission } from "../../../../features/administration/interfaces/role-permission.model";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery,
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

    getRolesDetail: builder.query<IRoleWithPermissions, string>({
      query: (id) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.administration?.roles?.detail?.replace("{id}", id),
    }),

    addRoles: builder.mutation<IRoleWithPermissions, IRoleWithPermissions>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.roles?.add,
        method: "POST",
        body,
      }),
    }),

    updateRoles: builder.mutation<
      IRoleWithPermissions,
      { id: string; data: IRoleWithPermissions }
    >({
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
    }),

    deleteRole: builder.mutation<IRoleWithPermissions, string>({
      query: (id) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.roles?.delete?.replace(
            "{id}",
            id
          ),
        method: "DELETE",
      }),
    }),

    getPermissions: builder.query<IRolePermission[], void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.roles?.permissions,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRolesDetailQuery,
  useAddRolesMutation,
  useUpdateRolesMutation,
  useDeleteRoleMutation,

  useGetPermissionsQuery,
} = rolesApi;
