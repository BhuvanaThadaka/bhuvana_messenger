
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardService from '../../services/dashboardService';
import { DashboardState, DateRangeFilter } from '@/types/dashboard';
import { format } from 'date-fns';

// Async thunks
export const fetchSuperAdminDashboard = createAsyncThunk(
  'dashboard/fetchSuperAdmin',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getSuperAdminDashboard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchOrganizationDashboard = createAsyncThunk(
  'dashboard/fetchOrganization',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getOrganizationDashboard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchIndividualDashboard = createAsyncThunk(
  'dashboard/fetchIndividual',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getIndividualDashboard();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchLawFirmMetrics = createAsyncThunk(
  'dashboard/fetchLawFirmMetrics',
  async ({ 
    startDate, 
    endDate, 
    timeFrame 
  }: { 
    startDate?: Date, 
    endDate?: Date, 
    timeFrame?: 'day' | 'week' | 'month' | 'year' 
  }, { rejectWithValue }) => {
    try {
      const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : undefined;
      const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : undefined;
      return await dashboardService.getLawFirmMetrics(
        formattedStartDate,
        formattedEndDate,
        timeFrame || 'month'
      );
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch law firm metrics');
    }
  }
);

const initialState: DashboardState = {
  lawFirmMetrics: null,
  dateRange: {
    startDate: null,
    endDate: null
  },
  timeFrame: 'month',
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    clearDashboardData: (state) => {
      state.lawFirmMetrics = null;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setTimeFrame: (state, action) => {
      state.timeFrame = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Law Firm Metrics
    builder
      .addCase(fetchLawFirmMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLawFirmMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.lawFirmMetrics = action.payload;
      })
      .addCase(fetchLawFirmMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Super Admin Dashboard
    builder
      .addCase(fetchSuperAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuperAdminDashboard.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSuperAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Organization Dashboard
    builder
      .addCase(fetchOrganizationDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationDashboard.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrganizationDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Individual Dashboard
    builder
      .addCase(fetchIndividualDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndividualDashboard.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchIndividualDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearDashboardError, 
  clearDashboardData,
  setDateRange,
  setTimeFrame
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
