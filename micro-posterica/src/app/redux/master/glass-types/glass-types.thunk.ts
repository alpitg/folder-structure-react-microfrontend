import type { AxiosError } from "axios";
import GlassTypesService from "../../../../api/services/master/glass-types.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGlassTypes = createAsyncThunk(
  `master/glassTypes/fetch`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await GlassTypesService.fetch();
      return response?.data; // Return the fetched data
    } catch (error: any) {
      console.error("Error fetching glass types:", error);

      // Handle Axios-specific errors
      const axiosError: AxiosError = error.isAxiosError ? error : null;

      // Reject with a meaningful error object
      return rejectWithValue(
        axiosError?.response?.data || error.message || "Unknown error"
      );
    }
  }
);
