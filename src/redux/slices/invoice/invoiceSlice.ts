
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { reducers } from './reducers';
import { buildExtraReducers } from './extraReducers';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers,
  extraReducers: buildExtraReducers
});

export const { 
  setPage, 
  setPageSize, 
  setSearch, 
  setStatus,
  setSortBy, 
  setSortOrder,
  setDateRange,
  clearSelectedInvoice,
  clearErrors
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
