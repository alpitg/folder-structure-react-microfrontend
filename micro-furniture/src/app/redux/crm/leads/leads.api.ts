import type {
  GetLeadsParams,
  ILead,
  ILeadForm,
  PaginatedLeads,
} from "../../../../features/leads/list/interfaces/leads.model";

import { GetEnvConfig } from "../../../../app.config";
import { baseQuery } from "../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const leadsApi = createApi({
  reducerPath: "leadsApi",
  baseQuery,
  tagTypes: ["Leads"],
  endpoints: (builder) => ({
    getLeads: builder.query<PaginatedLeads, GetLeadsParams>({
      query: (params) => ({
        url: GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.leads?.list,
        method: "POST", // backend search is POST, same as users
        body: params,
      }),
      providesTags: ["Leads"],
    }),

    getLeadDetail: builder.query<ILead, string>({
      query: (id) =>
        GetEnvConfig()?.api?.baseUrl +
        GetEnvConfig()?.api?.leads?.getById?.replace("{id}", id),
    }),

    addLead: builder.mutation<ILead, ILeadForm>({
      query: (body) => ({
        url: GetEnvConfig()?.api?.baseUrl + GetEnvConfig()?.api?.leads?.add,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),

    updateLead: builder.mutation<ILead, { id: string; data: ILeadForm }>({
      query: ({ id, data }) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.leads?.update?.replace("{id}", id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Leads"],
    }),

    deleteLead: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.leads?.delete?.replace("{id}", id),
        method: "DELETE",
      }),
      invalidatesTags: ["Leads"], // list refetches automatically
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadDetailQuery,
  useAddLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadsApi;
