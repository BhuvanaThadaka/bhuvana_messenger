
import { PayloadAction } from '@reduxjs/toolkit';
import { InvoiceState } from './types';

export const reducers = {
  setPage: (state: InvoiceState, action: PayloadAction<number>) => {
    state.page = action.payload;
  },
  setPageSize: (state: InvoiceState, action: PayloadAction<number>) => {
    state.pageSize = action.payload;
  },
  setSearch: (state: InvoiceState, action: PayloadAction<string>) => {
    state.search = action.payload;
  },
  setStatus: (state: InvoiceState, action: PayloadAction<string>) => {
    state.status = action.payload;
  },
  setSortBy: (state: InvoiceState, action: PayloadAction<string>) => {
    state.sortBy = action.payload;
  },
  setSortOrder: (state: InvoiceState, action: PayloadAction<'asc' | 'desc'>) => {
    state.sortOrder = action.payload;
  },
  setDateRange: (state: InvoiceState, action: PayloadAction<{startDate: string | null, endDate: string | null}>) => {
    state.startDate = action.payload.startDate;
    state.endDate = action.payload.endDate;
  },
  clearSelectedInvoice: (state: InvoiceState) => {
    state.selectedInvoice = null;
  },
  clearErrors: (state: InvoiceState) => {
    state.error = null;
  }
};
