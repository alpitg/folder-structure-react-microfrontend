import type {
  IMealRequest,
  IMealResponse,
} from "../../../features/meal-planner/interfaces/meal-request.model";

import { GetEnvConfig } from "../../../app.config";
import { baseQuery } from "../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const mealRequestApi = createApi({
  reducerPath: "mealRequestApi",
  baseQuery,

  endpoints: (builder) => ({
    createMealRequest: builder.mutation<
      IMealResponse[],
      IMealRequest
    >({
      query: (body) => ({
        url:
          // GetEnvConfig()?.api?.baseUrl + // TODO: use this for real backend, currently frontendBaseUrl is same as baseUrl
          GetEnvConfig()?.api?.frontendBaseUrl +
          GetEnvConfig()?.api?.mealPlanner?.mealRequest,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateMealRequestMutation } = mealRequestApi;