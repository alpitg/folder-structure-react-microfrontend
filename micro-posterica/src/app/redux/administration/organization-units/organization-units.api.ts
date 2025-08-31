import type {
  GetOrganizationUnitsParams,
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

    // getOrganizationUnitsDetail: builder.query<IOrganizationUnitsData, string>({
    //   query: (productId) =>
    //     GetEnvConfig()?.api?.baseUrl +
    //     GetEnvConfig()?.api?.catalog?.product?.detail?.replace(
    //       "{id}",
    //       productId
    //     ),
    // }),

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

    //   updateOrganizationUnits: builder.mutation<
    //     IOrganizationUnitsData,
    //     { id: string; data: IOrganizationUnitsData }
    //   >({
    //     query: ({ id, data }) => ({
    //       url:
    //         GetEnvConfig()?.api?.baseUrl +
    //         GetEnvConfig()?.api?.catalog?.product?.update?.replace(
    //           "{id}",
    //           id
    //         ),
    //       method: "PUT",
    //       body: data,
    //     }),
    //   }),
  }),
});

export const {
  useGetPaginatedOrganizationUnitsQuery,
  useGetOrganizationUnitsQuery,
  // useGetOrganizationUnitsDetailQuery,
  useAddOrganizationUnitsMutation,
  // useUpdateOrganizationUnitsMutation,
} = organizationUnitsApi;
