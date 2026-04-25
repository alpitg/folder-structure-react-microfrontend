import type { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import InvoiceService from "../../../../api/services/finance/invoice.service";

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InvoiceService.fetchAll();
      return response?.data;
    } catch (error: any) {
      console.error("Error fetching invoices:", error);
      const axiosError: AxiosError = error.isAxiosError ? error : null;
      return rejectWithValue(
        axiosError?.response?.data || error.message || "Unknown error"
      );
    }
  }
);
