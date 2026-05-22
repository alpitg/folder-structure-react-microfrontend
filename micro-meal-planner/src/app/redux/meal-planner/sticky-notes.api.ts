import { GetEnvConfig } from "../../../app.config";
import { baseQuery } from "../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface StickyNote {
  id: number;
  title: string;
  description: string;
}

export const stickyNotesApi = createApi({
  reducerPath: "stickyNotesApi",
  baseQuery,
  endpoints: (builder) => ({
    getStickyNotes: builder.query<StickyNote[], void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.mealPlanner?.stickyNotes, // Adjust path as needed
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStickyNotesQuery } = stickyNotesApi;
