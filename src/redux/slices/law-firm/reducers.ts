
import { PayloadAction } from '@reduxjs/toolkit';
import { LawFirmState } from './types';

export const reducers = {
  setPage: (state: LawFirmState, action: PayloadAction<number>) => {
    state.page = action.payload;
  },
  setPageSize: (state: LawFirmState, action: PayloadAction<number>) => {
    state.pageSize = action.payload;
  },
  setSearch: (state: LawFirmState, action: PayloadAction<string>) => {
    state.search = action.payload;
  },
  setSortBy: (state: LawFirmState, action: PayloadAction<string>) => {
    state.sortBy = action.payload;
  },
  setSortOrder: (state: LawFirmState, action: PayloadAction<'asc' | 'desc'>) => {
    state.sortOrder = action.payload;
  },
  clearSelectedLawFirm: (state: LawFirmState) => {
    state.selectedLawFirm = null;
  },
  clearErrors: (state: LawFirmState) => {
    state.error = null;
  }
};
