
import { apiClient } from './apiService';
import { ENDPOINTS } from './endpoints';
import { LawFirmMetrics } from '@/types/dashboard';

export interface DashboardData {
  recentCases: any[];
  caseStatistics: any;
  upcomingDeadlines: any[];
  // Add other dashboard data properties as needed
}

export const getSuperAdminDashboard = async (): Promise<DashboardData> => {
  const response = await apiClient.get<DashboardData>(
    ENDPOINTS.DASHBOARD.SUPER_ADMIN
  );
  return response.data;
};

export const getOrganizationDashboard = async (): Promise<DashboardData> => {
  const response = await apiClient.get<DashboardData>(
    ENDPOINTS.DASHBOARD.ORGANIZATION
  );
  return response.data;
};

export const getIndividualDashboard = async (): Promise<DashboardData> => {
  const response = await apiClient.get<DashboardData>(
    ENDPOINTS.DASHBOARD.INDIVIDUAL
  );
  return response.data;
};

export const getLawFirmMetrics = async (
  startDate?: string,
  endDate?: string,
  timeFrame: 'day' | 'week' | 'month' | 'year' = 'month'
): Promise<LawFirmMetrics> => {
  const response = await apiClient.get<LawFirmMetrics>(
    ENDPOINTS.DASHBOARD.LAW_FIRM_METRICS,
    {
      params: {
        startDate,
        endDate,
        timeFrame
      }
    }
  );
  return response.data;
};
