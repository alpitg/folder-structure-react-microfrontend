import type {
  UploadUrlRequest,
  UploadUrlResponse,
} from "../../../features/blob/interface/upload.model";

import { GetEnvConfig } from "../../../app.config";
import { baseQuery } from "../base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const blobApi = createApi({
  reducerPath: "blobApi",
  baseQuery,

  endpoints: (builder) => ({
    getUploadUrl: builder.mutation<UploadUrlResponse, UploadUrlRequest>({
      query: (body) => ({
        url:
          GetEnvConfig()?.api?.baseUrl +
          GetEnvConfig()?.api?.blob?.getUploadUrl,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUploadUrlMutation } = blobApi;
