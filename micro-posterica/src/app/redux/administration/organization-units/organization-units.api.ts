import type {
  GetOrganizationUnitsParams,
  GetOrganizationUnitsParamsAssignRole,
  IOrganizationUnitsData,
  PaginatedOrganizationUnits,
} from "../../../../features/administration/interfaces/organization-units.model";

import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const organizationUnitsApi = createApi({
  reducerPath: "organizationUnitsApi",
  baseQuery,
  endpoints: (builder) => ({
    // ---------- Organisation Units ----------
    getPaginatedOrganizationUnits: builder.query<
      PaginatedOrganizationUnits,
      GetOrganizationUnitsParams
    >({
      query: (params) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.organizationUnits?.list,
        method: "POST", // your backend search is POST
        body: params,
      }),
    }),

    getOrganizationUnits: builder.query<PaginatedOrganizationUnits, void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.organizationUnits?.list,
        method: "GET",
      }),
    }),

    addOrganizationUnits: builder.mutation<
      IOrganizationUnitsData,
      IOrganizationUnitsData
    >({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.organizationUnits?.add,
        method: "POST",
        body,
      }),
    }),

    // ---------- Roles inside Org Unit ----------

    // ⬇️ Get all roles tagged to an org unit (paginated)
    getRolesFromOrganizationUnit: builder.query<
      PaginatedOrganizationUnits,
      GetOrganizationUnitsParamsAssignRole
    >({
      query: (params) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.organizationUnits?.roles?.list?.replace(
            "{id}",
            params.id
          ),
        method: "POST",
        body: params,
      }),
    }),

    // ⬇️ Add a role to an org unit
    addRoleToOrganizationUnit: builder.mutation<
      { message: string },
      { organizationUnitId: string; roleIds: string[] }
    >({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.organizationUnits?.roles?.add,
        method: "POST",
        body,
      }),
    }),

    // ⬇️ Remove a role from an org unit
    removeRoleFromOrganizationUnit: builder.mutation<
      { message: string },
      { organizationUnitId: string; roleId: string }
    >({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.administration?.organizationUnits?.roles?.remove,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPaginatedOrganizationUnitsQuery,
  useGetOrganizationUnitsQuery,
  useAddOrganizationUnitsMutation,

  // new hooks for roles:
  useGetRolesFromOrganizationUnitQuery,
  useAddRoleToOrganizationUnitMutation,
  useRemoveRoleFromOrganizationUnitMutation,
} = organizationUnitsApi;
