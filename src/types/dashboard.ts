
export interface DashboardMetric {
  label: string;
  value: number | string;
  change?: number;
  icon?: React.ElementType;
}

export interface LawFirmMetrics {
  totalRevenue: number;
  totalRegistrations: number;
  activeFirms: number;
  inactiveFirms: number;
  subscriptionStatus: {
    active: number;
    trial: number;
    expired: number;
  };
  registrationsOverTime: Array<{ date: string; count: number }>;
  revenueOverTime: Array<{ date: string; amount: number }>;
  casesFiled: Array<{ month: string; count: number }>;
}

export interface DateRangeFilter {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DashboardState {
  lawFirmMetrics: LawFirmMetrics | null;
  dateRange: DateRangeFilter;
  timeFrame: 'day' | 'week' | 'month' | 'year';
  loading: boolean;
  error: string | null;
}
