
import { apiClient } from './apiService';
import { ENDPOINTS } from './endpoints';
import { SubscriptionPlan, SubscriptionPlanFormData, SubscriptionPlanListParams } from '@/types/lawFirm';

// Get all subscription plans with pagination, search, and sorting
export const getSubscriptionPlans = async (params: SubscriptionPlanListParams) => {
  const response = await apiClient.get<{
    plans: SubscriptionPlan[];
    total: number;
    page: number;
    pageSize: number;
  }>(ENDPOINTS.PLAN.LIST, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder
    }
  });
  return response.data;
};

// Get a single subscription plan by ID
export const getSubscriptionPlanById = async (id: string) => {
  const response = await apiClient.get<SubscriptionPlan>(ENDPOINTS.PLAN.DETAILS(id));
  return response.data;
};

// Create a new subscription plan
export const createSubscriptionPlan = async (data: SubscriptionPlanFormData) => {
  const response = await apiClient.post<SubscriptionPlan>(ENDPOINTS.PLAN.CREATE, data);
  return response.data;
};

// Update an existing subscription plan
export const updateSubscriptionPlan = async (id: string, data: Partial<SubscriptionPlanFormData>) => {
  const response = await apiClient.put<SubscriptionPlan>(ENDPOINTS.PLAN.UPDATE(id), data);
  return response.data;
};

// Delete a subscription plan
export const deleteSubscriptionPlan = async (id: string) => {
  await apiClient.delete(ENDPOINTS.PLAN.DELETE(id));
  return id;
};

// Toggle subscription plan status (active/inactive)
export const toggleSubscriptionPlanStatus = async (id: string, isActive: boolean) => {
  const response = await apiClient.put<SubscriptionPlan>(
    ENDPOINTS.PLAN.TOGGLE_STATUS(id),
    { isActive }
  );
  return response.data;
};
