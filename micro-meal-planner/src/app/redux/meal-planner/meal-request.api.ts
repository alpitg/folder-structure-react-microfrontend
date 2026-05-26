import type {
  DayMeals,
  IMealRequest,
  IMealResponse,
} from "../../../features/meal-planner/interfaces/meal-request.model";

import { GetEnvConfig } from "../../../app.config";
import { baseQuery } from "../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const mealRequestApi = createApi({
  reducerPath: "mealRequestApi",
  baseQuery,

  tagTypes: ["WeeklyMeals"],

  endpoints: (builder) => ({
    /* Create Meal Request */
    createMealRequest: builder.mutation<IMealResponse[], IMealRequest>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl + // TODO: use this for real backend, currently frontendBaseUrl is same as baseUrl
          // GetEnvConfig()?.api?.frontendBaseUrl +
          GetEnvConfig()?.api?.mealPlanner?.mealRequest,
        method: "POST",
        body,
      }),

      invalidatesTags: ["WeeklyMeals"],
    }),

    /* Get Weekly Meals */
    getWeeklyMeals: builder.query<DayMeals[], void>({
      query: () => ({
        url:
          // GetEnvConfig()?.api?.frontendBaseUrl +
          // GetEnvConfig()?.api?.mealPlanner?.weeklyMeals +
          // ".json",

          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.mealPlanner?.weeklyMeals,
        method: "GET",
      }),

      providesTags: ["WeeklyMeals"],
    }),

    /* Delete Meal */
    deleteMeal: builder.mutation<{ success: boolean }, string>({
      query: (mealId) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.mealPlanner?.deleteMeal +
          `/${mealId}`,

        method: "DELETE",
      }),

      invalidatesTags: ["WeeklyMeals"],
    }),

    /* Create Single Meal */
    createMeal: builder.mutation<any, any>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.mealPlanner?.createMeal,

        method: "POST",
        body,
      }),

      invalidatesTags: ["WeeklyMeals"],
    }),

    /* AI Generate Meal */
    generateMeal: builder.mutation<any, any>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.mealPlanner?.generateMeal,

        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateMealRequestMutation,
  useGetWeeklyMealsQuery,
  useDeleteMealMutation,
  useCreateMealMutation,
  useGenerateMealMutation,
} = mealRequestApi;
