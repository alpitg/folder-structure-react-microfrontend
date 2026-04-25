import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoices } from "./invoice.thunk";

export interface IInvoiceState {
  invoices: any[];
  loading: boolean;
  error: string | null;
}

const initialState: IInvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || "Unable to fetch invoices";
    });
  },
});

export default invoiceSlice.reducer;
