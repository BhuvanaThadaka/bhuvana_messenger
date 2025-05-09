
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart } from "@/components/ui/chart";
import { Users, Briefcase, CreditCard, Building2 } from "lucide-react";

// Dummy data for charts
const monthlyData = [
  { month: "Jan", "New Firms": 5, "Renewals": 2 },
  { month: "Feb", "New Firms": 8, "Renewals": 4 },
  { month: "Mar", "New Firms": 12, "Renewals": 6 },
  { month: "Apr", "New Firms": 10, "Renewals": 8 },
  { month: "May", "New Firms": 15, "Renewals": 10 },
  { month: "Jun", "New Firms": 18, "Renewals": 12 },
];

const firmTypeData = [
  { name: "Partnership", value: 45 },
  { name: "LLC", value: 30 },
  { name: "Corporation", value: 15 },
  { name: "Solo Practice", value: 10 },
];

const planData = [
  { month: "Jan", "Premium": 25, "Standard": 18, "Basic": 10 },
  { month: "Feb", "Premium": 28, "Standard": 20, "Basic": 15 },
  { month: "Mar", "Premium": 30, "Standard": 25, "Basic": 18 },
  { month: "Apr", "Premium": 35, "Standard": 28, "Basic": 20 },
  { month: "May", "Premium": 38, "Standard": 30, "Basic": 22 },
  { month: "Jun", "Premium": 40, "Standard": 32, "Basic": 25 },
];

const LawFirmStats = () => {
  const [totalFirms, setTotalFirms] = useState(125);
  const [activeFirms, setActiveFirms] = useState(98);
  const [totalRevenue, setTotalRevenue] = useState(45800);
  const [premiumFirms, setPremiumFirms] = useState(42);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Law Firms
                </p>
                <h3 className="text-2xl font-bold">{totalFirms}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Firms
                </p>
                <h3 className="text-2xl font-bold">{activeFirms}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-purple-500/10 p-3">
                <Briefcase className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Premium Firms
                </p>
                <h3 className="text-2xl font-bold">{premiumFirms}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-500/10 p-3">
                <CreditCard className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Law Firm Growth</CardTitle>
            <CardDescription>
              Monthly new registrations and renewals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart
                data={monthlyData}
                xAxisKey="month"
                yAxisKey="value"
                categories={["New Firms", "Renewals"]}
                colors={["#8b5cf6", "#10b981"]}
                valueFormatter={(value) => `${value} firms`}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Firm Types</CardTitle>
            <CardDescription>
              Distribution by firm type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart
                data={firmTypeData}
                colors={["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"]}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Monthly distribution by plan type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart
                data={planData}
                xAxisKey="month"
                yAxisKey="value"
                categories={["Premium", "Standard", "Basic"]}
                colors={["#8b5cf6", "#3b82f6", "#10b981"]}
                valueFormatter={(value) => `${value} firms`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LawFirmStats;
