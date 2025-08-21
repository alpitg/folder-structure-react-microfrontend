import type {
  GetOrganizationUnitsParams,
  IOrganizationUnitsData,
  PaginatedOrganizationUnits,
} from "../../../../features/administration/interfaces/organization-units.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetEnvConfig } from "../../../../app.config";

export const organizationUnitsApi = createApi({
  reducerPath: "organizationUnitsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Adjust base URL
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

    getOrganizationUnits: builder.query<
      PaginatedOrganizationUnits,
      GetOrganizationUnitsParams
    >({
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
