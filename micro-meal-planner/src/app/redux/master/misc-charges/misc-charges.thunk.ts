import type { AxiosError } from "axios";
import MiscChargesService from "../../../../api/services/master/misc-charges.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMiscCharges = createAsyncThunk(
  `master/miscCharges/fetch`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await MiscChargesService.fetch();
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
