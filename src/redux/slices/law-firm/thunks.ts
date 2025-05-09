
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as lawFirmService from '@/services/lawFirmService';
import { LawFirmListParams, LawFirmFormData } from '@/types/lawFirm';
import { RootState } from '@/redux/store';
import { UpdateLawFirmPayload, ToggleStatusPayload } from './types';
import { toast } from '@/hooks/use-toast';

export const fetchLawFirms = createAsyncThunk(
  'lawFirm/fetchLawFirms',
  async (params: Partial<LawFirmListParams>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { lawFirm: RootState['lawFirm'] };
      const { page, pageSize, search, sortBy, sortOrder } = state.lawFirm;
      
      const queryParams: LawFirmListParams = {
        page: params.page || page,
        pageSize: params.pageSize || pageSize,
        search: params.search !== undefined ? params.search : search,
        sortBy: params.sortBy || sortBy,
        sortOrder: params.sortOrder || sortOrder
      };
      
      return await lawFirmService.getLawFirms(queryParams);
    } catch (error: any) {
      toast({
        title: "Error fetching law firms",
        description: error.response?.data?.message || "Error fetching law firm details. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch law firms');
    }
  }
);

export const fetchLawFirmById = createAsyncThunk(
  'lawFirm/fetchLawFirmById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await lawFirmService.getLawFirmById(id);
    } catch (error: any) {
      toast({
        title: "Error fetching law firm",
        description: error.response?.data?.message || "Error fetching law firm details. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch law firm');
    }
  }
);

export const createLawFirm = createAsyncThunk(
  'lawFirm/createLawFirm',
  async (data: LawFirmFormData, { rejectWithValue }) => {
    try {
      const result = await lawFirmService.createLawFirm(data);
      toast({
        title: "Success",
        description: `Law Firm ${data.name} has been successfully added.`,
      });
      return result;
    } catch (error: any) {
      toast({
        title: "Error creating law firm",
        description: error.response?.data?.message || "Error creating law firm. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to create law firm');
    }
  }
);

export const updateLawFirm = createAsyncThunk(
  'lawFirm/updateLawFirm',
  async ({ id, data }: UpdateLawFirmPayload, { rejectWithValue }) => {
    try {
      const result = await lawFirmService.updateLawFirm(id, data);
      toast({
        title: "Success",
        description: "Law Firm details updated successfully.",
      });
      return result;
    } catch (error: any) {
      toast({
        title: "Error updating law firm",
        description: error.response?.data?.message || "Error updating law firm. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to update law firm');
    }
  }
);

export const deleteLawFirm = createAsyncThunk(
  'lawFirm/deleteLawFirm',
  async (id: string, { rejectWithValue }) => {
    try {
      await lawFirmService.deleteLawFirm(id);
      toast({
        title: "Success",
        description: "Law Firm deleted successfully.",
      });
      return id;
    } catch (error: any) {
      let errorMessage = 'Failed to delete law firm';
      
      if (error.response?.status === 409) {
        errorMessage = "Cannot delete a firm with active cases.";
      } else {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      toast({
        title: "Error deleting law firm",
        description: errorMessage,
        variant: "destructive"
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const toggleLawFirmStatus = createAsyncThunk(
  'lawFirm/toggleStatus',
  async ({ id, isActive }: ToggleStatusPayload, { rejectWithValue }) => {
    try {
      return await lawFirmService.toggleLawFirmStatus(id, isActive);
    } catch (error: any) {
      toast({
        title: "Error updating status",
        description: error.response?.data?.message || "Error updating law firm status. Please try again.",
        variant: "destructive"
      });
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

export const fetchCountries = createAsyncThunk(
  'lawFirm/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      return await lawFirmService.getCountries();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch countries');
    }
  }
);

export const fetchStates = createAsyncThunk(
  'lawFirm/fetchStates',
  async (countryId: string, { rejectWithValue }) => {
    try {
      return await lawFirmService.getStatesByCountry(countryId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch states');
    }
  }
);

export const fetchCities = createAsyncThunk(
  'lawFirm/fetchCities',
  async (stateId: string, { rejectWithValue }) => {
    try {
      return await lawFirmService.getCitiesByState(stateId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cities');
    }
  }
);

export const fetchPlans = createAsyncThunk(
  'lawFirm/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      return await lawFirmService.getAvailablePlans();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch plans');
    }
  }
);
