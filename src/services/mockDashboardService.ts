
import { apiResponse, delay, generateId } from './mockApiService';
import { LawFirmMetrics } from '@/types/dashboard';

// Mock law firm metrics data
const mockLawFirmMetrics: LawFirmMetrics = {
  totalRevenue: 2450000,
  totalRegistrations: 108,
  activeFirms: 92,
  inactiveFirms: 16,
  subscriptionStatus: {
    active: 75,
    trial: 17,
    expired: 16
  },
  registrationsOverTime: [
    { date: '2025-01', count: 12 },
    { date: '2025-02', count: 18 },
    { date: '2025-03', count: 24 },
    { date: '2025-04', count: 21 },
    { date: '2025-05', count: 15 },
    { date: '2025-06', count: 18 }
  ],
  revenueOverTime: [
    { date: '2025-01', amount: 350000 },
    { date: '2025-02', amount: 380000 },
    { date: '2025-03', amount: 420000 },
    { date: '2025-04', amount: 450000 },
    { date: '2025-05', amount: 410000 },
    { date: '2025-06', amount: 440000 }
  ],
  casesFiled: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 61 },
    { month: 'Apr', count: 58 },
    { month: 'May', count: 63 },
    { month: 'Jun', count: 59 }
  ]
};

// Get mock law firm metrics
export const getMockLawFirmMetrics = async (
  startDate?: string,
  endDate?: string,
  timeFrame: 'day' | 'week' | 'month' | 'year' = 'month'
): Promise<LawFirmMetrics> => {
  await delay(800);
  
  // In a real application, this would filter data based on date range and timeframe
  // For now, we'll return the same mock data
  
  console.log('[MockAPI] GET /api/dashboard/law-firm-metrics', {
    startDate,
    endDate,
    timeFrame,
    data: mockLawFirmMetrics
  });
  
  return apiResponse(mockLawFirmMetrics).data;
};

// Mock dashboard data
export const getMockDashboardData = async (type: 'superadmin' | 'organization' | 'individual') => {
  await delay(700);
  
  const dashboardData = {
    recentCases: [
      { id: 'CASE-1001', title: 'Contract Dispute - ABC Corp', client: 'ABC Corporation', status: 'Open', lastUpdated: '2025-04-06' },
      { id: 'CASE-1002', title: 'IP Infringement', client: 'Tech Innovators Inc', status: 'Pending', lastUpdated: '2025-04-05' },
      { id: 'CASE-1003', title: 'Employment Termination', client: 'Global Services Ltd', status: 'Closed', lastUpdated: '2025-04-03' }
    ],
    caseStatistics: {
      active: 28,
      pending: 15,
      closed: 42,
      total: 85
    },
    upcomingDeadlines: [
      { id: 'DL-001', title: 'File Motion', caseId: 'CASE-1001', date: '2025-04-15' },
      { id: 'DL-002', title: 'Client Meeting', caseId: 'CASE-1002', date: '2025-04-12' },
      { id: 'DL-003', title: 'Document Submission', caseId: 'CASE-1005', date: '2025-04-18' }
    ]
  };
  
  console.log(`[MockAPI] GET /api/dashboard/${type}`, dashboardData);
  
  return apiResponse(dashboardData).data;
};
