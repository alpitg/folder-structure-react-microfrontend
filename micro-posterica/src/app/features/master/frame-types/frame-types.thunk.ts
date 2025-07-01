import type { AxiosError } from "axios";
import FrameTypesService from "../../../../api/services/master/frame-types.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFrameTypes = createAsyncThunk(
  `master/frameTypes/fetch`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await FrameTypesService.fetch();
      return response?.data; // Return the fetched data
    } catch (error: any) {
      console.error("Error fetching frame types:", error);

      // Handle Axios-specific errors
      const axiosError: AxiosError = error.isAxiosError ? error : null;

      // Reject with a meaningful error object
      return rejectWithValue(
        axiosError?.response?.data || error.message || "Unknown error"
      );
    }
  }
);
