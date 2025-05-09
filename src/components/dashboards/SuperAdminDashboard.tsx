
import { useEffect, useState } from "react";
import { 
  Building2, 
  DollarSign,
  CheckCircle,
  XCircle,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  ArrowUpRight
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchLawFirmMetrics, setDateRange, setTimeFrame } from "@/redux/slices/dashboardSlice";
import { DateRange } from "react-day-picker";

import MetricCard from "./cards/MetricCard";
import ActivityFeed from "./activities/ActivityFeed";
import PerformanceChart from "./charts/PerformanceChart";
import DistributionChart from "./charts/DistributionChart";
import DateRangeSelector from "./filters/DateRangeSelector";
import TimeFrameTabs from "./filters/TimeFrameTabs";
import { Activity } from "./activities/ActivityFeed";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for charts
const annualData = [
  { name: "Jan", revenue: 4000, registrations: 5 },
  { name: "Feb", revenue: 5000, registrations: 8 },
  { name: "Mar", revenue: 7000, registrations: 12 },
  { name: "Apr", revenue: 6500, registrations: 10 },
  { name: "May", revenue: 9000, registrations: 15 },
  { name: "Jun", revenue: 12000, registrations: 20 },
  { name: "Jul", revenue: 15000, registrations: 18 },
  { name: "Aug", revenue: 18000, registrations: 25 },
  { name: "Sep", revenue: 16000, registrations: 22 },
  { name: "Oct", revenue: 19000, registrations: 30 },
  { name: "Nov", revenue: 23000, registrations: 28 },
  { name: "Dec", revenue: 25000, registrations: 35 },
];

const subscriptionData = [
  { name: "Premium", value: 35 },
  { name: "Standard", value: 45 },
  { name: "Basic", value: 20 },
];

// Recent activities data
const recentActivities: Activity[] = [
  { icon: Building2, title: "New Law Firm", desc: "Smith & Associates joined the platform", time: "2h ago" },
  { icon: DollarSign, title: "Subscription Payment", desc: "Premium plan renewal received", time: "5h ago" },
  { icon: Users, title: "New Staff Member", desc: "Added to Johnson Legal Group", time: "1d ago" },
  { icon: Briefcase, title: "New Case Filed", desc: "Corporate litigation case added", time: "2d ago" },
  { icon: Award, title: "Law Firm Upgrade", desc: "Legal Eagles upgraded to Premium plan", time: "3d ago" }
];

// Top performing law firms
const topLawFirms = [
  { 
    id: "1", 
    name: "Smith & Associates", 
    logo: "/assets/logos/smith-logo.png",
    cases: 145,
    staff: 22,
    revenue: "$42,500",
    growth: "+15%"
  },
  { 
    id: "2", 
    name: "Legal Solutions LLC", 
    logo: "/assets/logos/legal-solutions-logo.png",
    cases: 98,
    staff: 15,
    revenue: "$38,750",
    growth: "+8%"
  },
  { 
    id: "3", 
    name: "Johnson & Partners", 
    logo: "/assets/logos/johnson-logo.png",
    cases: 78,
    staff: 12,
    revenue: "$26,300",
    growth: "+23%"
  }
];

/**
 * SuperAdminDashboard component
 * 
 * Displays comprehensive overview of platform metrics for Super Admin users.
 * Shows law firm statistics, revenue data, subscription information and recent activities.
 * Includes filtering capabilities by date range and time frame.
 * 
 * @returns {JSX.Element} - Rendered component
 */
const SuperAdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { lawFirmMetrics, loading, dateRange, timeFrame } = useSelector(
    (state: RootState) => state.dashboard
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: dateRange.startDate || undefined,
    to: dateRange.endDate || undefined
  });

  useEffect(() => {
    // Fetch law firm metrics when component mounts or date/timeframe changes
    dispatch(fetchLawFirmMetrics({ 
      startDate: dateRange.startDate || undefined, 
      endDate: dateRange.endDate || undefined,
      timeFrame
    }));
  }, [dispatch, dateRange, timeFrame]);

  // Handle date range selection
  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    
    if (selectedDate?.from) {
      dispatch(setDateRange({
        startDate: selectedDate.from,
        endDate: selectedDate.to || null
      }));
    }
  };

  // Handle time frame selection
  const handleTimeFrameChange = (value: string) => {
    dispatch(setTimeFrame(value as 'day' | 'week' | 'month' | 'year'));
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Either use real data from API or fallback to default values
  const metrics = lawFirmMetrics || {
    totalRevenue: 150000,
    totalRegistrations: 108,
    activeFirms: 92,
    inactiveFirms: 16,
    subscriptionStatus: {
      active: 75,
      trial: 17,
      expired: 16
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          Law Firm Overview
        </h2>
        
        {/* Date Range Selector */}
        <div className="flex items-center gap-4">
          <TimeFrameTabs 
            value={timeFrame} 
            onValueChange={handleTimeFrameChange} 
          />
          
          <DateRangeSelector 
            date={date} 
            onSelect={handleDateSelect} 
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <MetricCard
          title="Total Law Firms"
          value={metrics.totalRegistrations}
          description="Registered on platform"
          icon={Building2}
          loading={loading}
          trend="+12% from last month"
          trendUp={true}
        />
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          description="Subscription revenue"
          icon={DollarSign}
          loading={loading}
          trend="+8% from last month"
          trendUp={true}
        />
        <MetricCard
          title="Active Firms"
          value={metrics.activeFirms}
          description="Currently active"
          icon={CheckCircle}
          loading={loading}
          trend="+5% from last month"
          trendUp={true}
        />
        <MetricCard
          title="Inactive Firms"
          value={metrics.inactiveFirms}
          description="Requiring attention"
          icon={XCircle}
          loading={loading}
          trend="-3% from last month"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Performing Law Firms */}
        <Card className="lg:col-span-1 h-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-500" />
              Top Performing Law Firms
            </CardTitle>
            <CardDescription>Based on case volume and growth</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {topLawFirms.map(firm => (
                <div key={firm.id} className="flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={firm.logo} alt={firm.name} />
                      <AvatarFallback>{firm.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{firm.name}</p>
                      <p className="text-xs text-gray-500">{firm.cases} cases</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold mr-2">{firm.revenue}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                      {firm.growth} <ArrowUpRight className="size-3" />
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Revenue & Registrations Chart */}
        <PerformanceChart
          title="Annual Performance"
          description="Revenue and law firm registrations"
          data={annualData}
          loading={loading}
          className="lg:col-span-2 h-auto"
        />
        
        {/* Subscription Distribution */}
        <DistributionChart
          title="Subscription Plans"
          description="Distribution by plan type"
          data={subscriptionData}
          loading={loading}
          className="lg:col-span-1 h-auto"
        />
        
        {/* Recent Activities Section */}
        <ActivityFeed
          title="Recent Activities"
          description="Latest platform activities and events"
          activities={recentActivities}
          loading={loading}
          className="lg:col-span-2 h-auto"
        />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
