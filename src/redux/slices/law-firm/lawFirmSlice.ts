
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { reducers } from './reducers';
import { buildExtraReducers } from './extraReducers';

const lawFirmSlice = createSlice({
  name: 'lawFirm',
  initialState,
  reducers,
  extraReducers: buildExtraReducers
});

export const { 
  setPage, 
  setPageSize, 
  setSearch, 
  setSortBy, 
  setSortOrder,
  clearSelectedLawFirm,
  clearErrors
} = lawFirmSlice.actions;

export default lawFirmSlice.reducer;
