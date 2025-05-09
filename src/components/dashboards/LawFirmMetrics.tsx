
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, RefreshCcw } from "lucide-react";
import { format, subMonths } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchLawFirmMetrics, 
  setDateRange, 
  setTimeFrame 
} from '@/redux/slices/dashboardSlice';
import { AppDispatch, RootState } from '@/redux/store';

const LawFirmMetrics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { lawFirmMetrics, dateRange, timeFrame, loading } = useSelector((state: RootState) => state.dashboard);
  const [activeTab, setActiveTab] = useState("overview");

  // Initialize with last 6 months if no date range is set
  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      dispatch(setDateRange({
        startDate: subMonths(new Date(), 6),
        endDate: new Date()
      }));
    }
  }, [dispatch, dateRange]);

  // Fetch metrics when component mounts or date range changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(fetchLawFirmMetrics({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        timeFrame
      }));
    }
  }, [dispatch, dateRange, timeFrame]);

  const handleRefresh = () => {
    dispatch(fetchLawFirmMetrics({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      timeFrame
    }));
    toast({
      title: "Refreshed",
      description: "Metrics data has been refreshed",
    });
  };

  const handleTimeFrameChange = (value: 'day' | 'week' | 'month' | 'year') => {
    dispatch(setTimeFrame(value));
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    if (range.from && range.to) {
      dispatch(setDateRange({
        startDate: range.from,
        endDate: range.to
      }));
    }
  };

  if (!lawFirmMetrics && loading) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Law Firm Metrics</h2>
          <p className="text-muted-foreground">
            Monitor law firm registrations, revenue, and activity
          </p>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <DatePickerWithRange 
            date={{
              from: dateRange.startDate || undefined,
              to: dateRange.endDate || undefined,
            }}
            onDateChange={handleDateRangeChange}
          />
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lawFirmMetrics ? `$${(lawFirmMetrics.totalRevenue / 1000).toFixed(1)}k` : '-'}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Registered Firms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lawFirmMetrics?.totalRegistrations || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  +8.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Firms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lawFirmMetrics?.activeFirms || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {lawFirmMetrics ? `${Math.round((lawFirmMetrics.activeFirms / lawFirmMetrics.totalRegistrations) * 100)}% of total` : '-'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inactive Firms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lawFirmMetrics?.inactiveFirms || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {lawFirmMetrics ? `${Math.round((lawFirmMetrics.inactiveFirms / lawFirmMetrics.totalRegistrations) * 100)}% of total` : '-'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Registrations Over Time</CardTitle>
                <CardDescription>
                  New law firm registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {lawFirmMetrics?.registrationsOverTime && (
                  <LineChart 
                    data={lawFirmMetrics.registrationsOverTime.map(item => ({
                      name: item.date,
                      value: item.count
                    }))}
                    xAxisKey="name"
                    yAxisKey="value"
                    categories={["value"]}
                    colors={["#0ea5e9"]}
                    className="h-full"
                  />
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
                <CardDescription>
                  Breakdown of subscription status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {lawFirmMetrics?.subscriptionStatus && (
                  <PieChart 
                    data={[
                      { name: "Active", value: lawFirmMetrics.subscriptionStatus.active },
                      { name: "Trial", value: lawFirmMetrics.subscriptionStatus.trial },
                      { name: "Expired", value: lawFirmMetrics.subscriptionStatus.expired }
                    ]}
                    className="h-full"
                    colors={["#10b981", "#0ea5e9", "#ef4444"]}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="registrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registrations Over Time</CardTitle>
              <CardDescription>
                New law firm registrations by month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {lawFirmMetrics?.registrationsOverTime && (
                <BarChart 
                  data={lawFirmMetrics.registrationsOverTime.map(item => ({
                    name: item.date,
                    value: item.count
                  }))}
                  xAxisKey="name"
                  yAxisKey="value"
                  categories={["value"]}
                  colors={["#0ea5e9"]}
                  className="h-full"
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>
                Revenue generated by month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {lawFirmMetrics?.revenueOverTime && (
                <LineChart 
                  data={lawFirmMetrics.revenueOverTime.map(item => ({
                    name: item.date,
                    value: item.amount / 1000 // Convert to thousands
                  }))}
                  xAxisKey="name"
                  yAxisKey="value"
                  categories={["value"]}
                  colors={["#10b981"]}
                  className="h-full"
                  valueFormatter={(value) => `$${value}k`}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cases Filed</CardTitle>
              <CardDescription>
                Number of cases filed through the platform by month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {lawFirmMetrics?.casesFiled && (
                <BarChart 
                  data={lawFirmMetrics.casesFiled.map(item => ({
                    name: item.month,
                    value: item.count
                  }))}
                  xAxisKey="name"
                  yAxisKey="value"
                  categories={["value"]}
                  colors={["#8b5cf6"]}
                  className="h-full"
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LawFirmMetrics;
