import type {
  GetUsersParams,
  IUserWithPermissions,
  PaginatedUsers,
} from "../../../../features/administration/interfaces/users.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";
import type { IRolePermission } from "../../../../features/administration/interfaces/role-permission.model";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
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
        GetEnvConfig()?.api?.administration?.users?.getUserForEdit?.replace("{id}", id),
    }),

    addUsers: builder.mutation<IUserWithPermissions, IUserWithPermissions>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.users?.add,
        method: "POST",
        body,
      }),
    }),

    updateUsers: builder.mutation<
      IUserWithPermissions,
      { id: string; data: IUserWithPermissions }
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
