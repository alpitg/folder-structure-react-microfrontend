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
    // ✅ GET STICKY NOTE
    getStickyNotes: builder.query<StickyNote[], void>({
      query: () => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.mealPlanner?.stickyNotes,
        method: "GET",
      }),
    }),

    // ✅ CREATE STICKY NOTE
    createStickyNote: builder.mutation<StickyNote, Partial<StickyNote>>({
      query: (newNote) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.mealPlanner?.stickyNotes,
        method: "POST",
        body: newNote,
      }),
    }),
  }),
});

export const { useGetStickyNotesQuery, useCreateStickyNoteMutation } =
  stickyNotesApi;
