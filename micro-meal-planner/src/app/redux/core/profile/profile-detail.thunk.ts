import type { AxiosError } from "axios";
import ProfileService from "../../../../api/services/profile/profile.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProfile = createAsyncThunk(
  `master/profile/fetch`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileService.fetch();
      return response?.data; // Return the fetched data
    } catch (error: any) {
      console.error("Error fetching profile types:", error);

      // Handle Axios-specific errors
      const axiosError: AxiosError = error.isAxiosError ? error : null;

      // Reject with a meaningful error object
      return rejectWithValue(
        axiosError?.response?.data || error.message || "Unknown error"
      );
    }
  }
);
