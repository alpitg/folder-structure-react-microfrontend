import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoices } from "./invoice.thunk";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  billDate: string;
  billTo: {
    name: string;
  };
  totalAmount: number;
  paymentStatus: string;
}

export interface IInvoiceState  {
  invoices: Invoice[];
  total: number;
  page: number;
  pages?: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: IInvoiceState = {
  invoices: [],
  total: 0,
  page: 1,
  limit: 10,
  pages: 0,
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
      state.invoices = action.payload?.invoices || action.payload || [];
      state.total = action.payload?.total || state.invoices.length;
      state.page = action.payload?.page || 1;
      state.pages = action.payload?.pages || 0;
      state.limit = action.payload?.limit || 10;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as string) ||
        action.error.message ||
        "Unable to fetch invoices";
    });
  },
});

export default invoiceSlice.reducer;
