import type { DashboardStat } from "../../../../features/dashboard/interface/dashboard.model";
import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStat[], void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.dashboard?.stats,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
