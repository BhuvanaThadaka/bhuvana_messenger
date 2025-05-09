
import { apiClient } from '../apiService';
import { ENDPOINTS } from '../endpoints';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  billingCycle: string;
  trialDays: number;
  userLimit: number;
  isActive: boolean;
}

export interface SubscriptionPlanFormData {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  billingCycle: string;
  trialDays: number;
  userLimit: number;
  isActive: boolean;
}

export interface PlanListResponse {
  plans: SubscriptionPlan[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PlanListParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const getSubscriptionPlans = async (params: PlanListParams): Promise<PlanListResponse> => {
  const response = await apiClient.get<PlanListResponse>(ENDPOINTS.PLAN.LIST, { params });
  return response.data;
};

export const getSubscriptionPlanById = async (planId: string): Promise<SubscriptionPlan> => {
  const response = await apiClient.get<SubscriptionPlan>(ENDPOINTS.PLAN.DETAILS(planId));
  return response.data;
};

export const createSubscriptionPlan = async (planData: SubscriptionPlanFormData): Promise<SubscriptionPlan> => {
  const response = await apiClient.post<SubscriptionPlan>(ENDPOINTS.PLAN.CREATE, planData);
  return response.data;
};

export const updateSubscriptionPlan = async (
  planId: string,
  updateData: Partial<SubscriptionPlanFormData>
): Promise<SubscriptionPlan> => {
  const response = await apiClient.put<SubscriptionPlan>(ENDPOINTS.PLAN.UPDATE(planId), updateData);
  return response.data;
};

export const deleteSubscriptionPlan = async (planId: string): Promise<string> => {
  await apiClient.delete(ENDPOINTS.PLAN.DELETE(planId));
  return planId;
};

export const toggleSubscriptionPlanStatus = async (
  planId: string,
  isActive: boolean
): Promise<SubscriptionPlan> => {
  const response = await apiClient.put<SubscriptionPlan>(ENDPOINTS.PLAN.TOGGLE_STATUS(planId), { isActive });
  return response.data;
};
