import type {
  GetUsersParams,
  IUserWithPermissions,
  IUserWithPermissionsForm,
  PaginatedUsers,
} from "../../../../features/administration/interfaces/users.model";

import { GetEnvConfig } from "../../../../app.config";
import type { IRolePermission } from "../../../../features/administration/interfaces/role-permission.model";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedUsers, GetUsersParams>({
      query: (params) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.list,
        method: "POST", // your backend search is POST
        body: params,
      }),
    }),

    getUsersDetail: builder.query<IUserWithPermissions, string>({
      query: (id) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.administration?.users?.getUserForEdit?.replace(
          "{id}",
          id
        ),
    }),

    addUsers: builder.mutation<
      IUserWithPermissionsForm,
      IUserWithPermissionsForm
    >({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.add,
        method: "POST",
        body,
      }),
    }),

    updateUsers: builder.mutation<
      IUserWithPermissionsForm,
      { id: string; data: IUserWithPermissionsForm }
    >({
      query: ({ id, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.update?.replace(
            "{id}",
            id
          ),
        method: "PUT",
        body: data,
      }),
    }),

    deleteUser: builder.mutation<IUserWithPermissions, string>({
      query: (id) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.delete?.replace(
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
          GetEnvConfig()?.api?.administration?.users?.permissions,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersDetailQuery,
  useAddUsersMutation,
  useUpdateUsersMutation,
  useDeleteUserMutation,

  useGetPermissionsQuery,
} = usersApi;
