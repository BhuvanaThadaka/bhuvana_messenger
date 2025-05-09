
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { LawFirmState } from './types';
import * as thunks from './thunks';

export const buildExtraReducers = (builder: ActionReducerMapBuilder<LawFirmState>) => {
  // Fetch law firms
  builder
    .addCase(thunks.fetchLawFirms.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.fetchLawFirms.fulfilled, (state, action) => {
      state.loading = false;
      state.lawFirms = Array.isArray(action.payload.firms) ? action.payload.firms : [];
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    })
    .addCase(thunks.fetchLawFirms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.lawFirms = [];
    });

  // Fetch single law firm
  builder
    .addCase(thunks.fetchLawFirmById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.fetchLawFirmById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedLawFirm = action.payload;
    })
    .addCase(thunks.fetchLawFirmById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // Create law firm
  builder
    .addCase(thunks.createLawFirm.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.createLawFirm.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(thunks.createLawFirm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // Update law firm
  builder
    .addCase(thunks.updateLawFirm.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.updateLawFirm.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.lawFirms.findIndex(firm => firm.id === action.payload.id);
      if (index !== -1) {
        state.lawFirms[index] = action.payload;
      }
      if (state.selectedLawFirm?.id === action.payload.id) {
        state.selectedLawFirm = action.payload;
      }
    })
    .addCase(thunks.updateLawFirm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // Delete law firm
  builder
    .addCase(thunks.deleteLawFirm.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.deleteLawFirm.fulfilled, (state, action) => {
      state.loading = false;
      state.lawFirms = state.lawFirms.filter(firm => firm.id !== action.payload);
      if (state.selectedLawFirm?.id === action.payload) {
        state.selectedLawFirm = null;
      }
    })
    .addCase(thunks.deleteLawFirm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // Toggle law firm status
  builder
    .addCase(thunks.toggleLawFirmStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.toggleLawFirmStatus.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.lawFirms.findIndex(firm => firm.id === action.payload.id);
      if (index !== -1) {
        state.lawFirms[index] = action.payload;
      }
      if (state.selectedLawFirm?.id === action.payload.id) {
        state.selectedLawFirm = action.payload;
      }
    })
    .addCase(thunks.toggleLawFirmStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  // Fetch countries
  builder
    .addCase(thunks.fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });

  // Fetch states
  builder
    .addCase(thunks.fetchStates.fulfilled, (state, action) => {
      state.states = action.payload;
    });

  // Fetch cities
  builder
    .addCase(thunks.fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload;
    });

  // Fetch plans
  builder
    .addCase(thunks.fetchPlans.fulfilled, (state, action) => {
      state.plans = action.payload;
    });
};
