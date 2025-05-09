
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as planService from '../../services/planService';
import { SubscriptionPlan, SubscriptionPlanFormData, SubscriptionPlanListParams } from '@/types/lawFirm';
import { toast } from '@/hooks/use-toast';

interface PlanState {
  plans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: PlanState = {
  plans: [],
  selectedPlan: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc'
};

// Async thunks
export const fetchSubscriptionPlans = createAsyncThunk(
  'plan/fetchSubscriptionPlans',
  async (params: Partial<SubscriptionPlanListParams>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { plan: PlanState };
      const { page, pageSize, search, sortBy, sortOrder } = state.plan;
      
      const queryParams: SubscriptionPlanListParams = {
        page: params.page || page,
        pageSize: params.pageSize || pageSize,
        search: params.search !== undefined ? params.search : search,
        sortBy: params.sortBy || sortBy,
        sortOrder: params.sortOrder || sortOrder
      };
      
      return await planService.getSubscriptionPlans(queryParams);
    } catch (error: any) {
      toast({
        title: "Error fetching subscription plans",
        description: error.response?.data?.message || "Error fetching plan details. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscription plans');
    }
  }
);

export const fetchSubscriptionPlanById = createAsyncThunk(
  'plan/fetchSubscriptionPlanById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await planService.getSubscriptionPlanById(id);
    } catch (error: any) {
      toast({
        title: "Error fetching subscription plan",
        description: error.response?.data?.message || "Error fetching plan details. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscription plan');
    }
  }
);

export const createSubscriptionPlan = createAsyncThunk(
  'plan/createSubscriptionPlan',
  async (data: SubscriptionPlanFormData, { rejectWithValue }) => {
    try {
      const result = await planService.createSubscriptionPlan(data);
      toast({
        title: "Success",
        description: `Plan "${data.name}" has been successfully added.`,
      });
      return result;
    } catch (error: any) {
      toast({
        title: "Error creating subscription plan",
        description: error.response?.data?.message || "Error creating plan. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to create subscription plan');
    }
  }
);

export const updateSubscriptionPlan = createAsyncThunk(
  'plan/updateSubscriptionPlan',
  async ({ id, data }: { id: string, data: SubscriptionPlanFormData }, { rejectWithValue }) => {
    try {
      const result = await planService.updateSubscriptionPlan(id, data);
      toast({
        title: "Success",
        description: "Subscription plan updated successfully.",
      });
      return result;
    } catch (error: any) {
      toast({
        title: "Error updating subscription plan",
        description: error.response?.data?.message || "Error updating plan. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to update subscription plan');
    }
  }
);

export const deleteSubscriptionPlan = createAsyncThunk(
  'plan/deleteSubscriptionPlan',
  async (id: string, { rejectWithValue }) => {
    try {
      await planService.deleteSubscriptionPlan(id);
      toast({
        title: "Success",
        description: "Subscription plan deleted successfully.",
      });
      return id;
    } catch (error: any) {
      let errorMessage = 'Failed to delete subscription plan';
      
      if (error.response?.status === 409) {
        errorMessage = "Cannot delete a plan with active subscribers.";
      } else {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      toast({
        title: "Error deleting subscription plan",
        description: errorMessage,
        variant: "destructive"
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const toggleSubscriptionPlanStatus = createAsyncThunk(
  'plan/toggleStatus',
  async ({ id, isActive }: { id: string, isActive: boolean }, { rejectWithValue }) => {
    try {
      return await planService.toggleSubscriptionPlanStatus(id, isActive);
    } catch (error: any) {
      toast({
        title: "Error updating status",
        description: error.response?.data?.message || "Error updating plan status. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch subscription plans
    builder
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure action.payload.plans is always an array
        state.plans = Array.isArray(action.payload.plans) ? action.payload.plans : [];
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Ensure plans is always an array even if there was an error
        state.plans = [];
      });

    // Fetch single subscription plan
    builder
      .addCase(fetchSubscriptionPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionPlanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlan = action.payload;
      })
      .addCase(fetchSubscriptionPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create subscription plan
    builder
      .addCase(createSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscriptionPlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update subscription plan
    builder
      .addCase(updateSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        // Update in list if present
        const index = state.plans.findIndex(plan => plan.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
        // Update selected if present
        if (state.selectedPlan?.id === action.payload.id) {
          state.selectedPlan = action.payload;
        }
      })
      .addCase(updateSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete subscription plan
    builder
      .addCase(deleteSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter(plan => plan.id !== action.payload);
        if (state.selectedPlan?.id === action.payload) {
          state.selectedPlan = null;
        }
      })
      .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle subscription plan status
    builder
      .addCase(toggleSubscriptionPlanStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSubscriptionPlanStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update in list if present
        const index = state.plans.findIndex(plan => plan.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
        // Update selected if present
        if (state.selectedPlan?.id === action.payload.id) {
          state.selectedPlan = action.payload;
        }
      })
      .addCase(toggleSubscriptionPlanStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { 
  setPage, 
  setPageSize, 
  setSearch, 
  setSortBy, 
  setSortOrder,
  clearSelectedPlan,
  clearErrors
} = planSlice.actions;

export default planSlice.reducer;
