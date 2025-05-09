import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as caseService from '../../services/caseService';
import { Case, CreateCasePayload } from '../../services/caseService';

interface CaseState {
  cases: Case[];
  currentCase: Case | null;
  loading: boolean;
  error: string | null;
}

// Async thunks
export const fetchCases = createAsyncThunk(
  'cases/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await caseService.getCases();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cases');
    }
  }
);

export const fetchCaseById = createAsyncThunk(
  'cases/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await caseService.getCaseById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch case details');
    }
  }
);

export const createCaseAsync = createAsyncThunk(
  'cases/create',
  async (caseData: CreateCasePayload, { rejectWithValue }) => {
    try {
      return await caseService.createCase(caseData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create case');
    }
  }
);

export const updateCaseAsync = createAsyncThunk(
  'cases/update',
  async ({ id, data }: { id: string; data: Partial<Case> }, { rejectWithValue }) => {
    try {
      return await caseService.updateCase(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update case');
    }
  }
);

export const deleteCaseAsync = createAsyncThunk(
  'cases/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await caseService.deleteCase(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete case');
    }
  }
);

const initialState: CaseState = {
  cases: [],
  currentCase: null,
  loading: false,
  error: null,
};

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    clearCaseError: (state) => {
      state.error = null;
    },
    setCurrentCase: (state, action: PayloadAction<Case | null>) => {
      state.currentCase = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all cases
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = action.payload;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch case by ID
    builder
      .addCase(fetchCaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCase = action.payload;
      })
      .addCase(fetchCaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create case
    builder
      .addCase(createCaseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCaseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cases.push(action.payload);
        state.currentCase = action.payload;
      })
      .addCase(createCaseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update case
    builder
      .addCase(updateCaseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCaseAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cases.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.cases[index] = action.payload;
        }
        state.currentCase = action.payload;
      })
      .addCase(updateCaseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete case
    builder
      .addCase(deleteCaseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCaseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = state.cases.filter(c => c.id !== action.payload);
        if (state.currentCase?.id === action.payload) {
          state.currentCase = null;
        }
      })
      .addCase(deleteCaseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCaseError, setCurrentCase } = caseSlice.actions;
export default caseSlice.reducer;
