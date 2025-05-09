
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SuperAdminDashboard from "@/components/dashboards/SuperAdminDashboard";
import OrganisationDashboard from "@/components/dashboards/OrganisationDashboard";
import IndividualDashboard from "@/components/dashboards/IndividualDashboard";
import LawFirmMetrics from "@/components/dashboards/LawFirmMetrics";
import LawFirmList from "@/components/law-firm/LawFirmList";
import CaseList from "@/components/cases/CaseList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check for tab in query parameters on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['overview', 'law-firms', 'law-firm-metrics', 'cases'].includes(tab)) {
      setActiveTab(tab);
    } else {
      // Set active tab based on account type
      if (user?.accountType === "SUPER_ADMIN") {
        setActiveTab("overview");
      }
    }
  }, [location.search, user]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard?tab=${value}`);
    toast({
      title: "Tab Changed",
      description: `Viewing ${value.replace('-', ' ')} tab`,
    });
  };

  const handleAddLawFirm = () => {
    navigate('/law-firms/create');
    toast({
      title: "Navigation",
      description: "Create a new law firm",
    });
  };

  const handleAddCase = () => {
    navigate('/cases/create');
    toast({
      title: "Navigation",
      description: "Create a new case",
    });
  };

  // Check if user should see the Cases tab based on account type
  const shouldShowCasesTab = user?.accountType === "ORGANISATION" || user?.accountType === "INDIVIDUAL";

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Only show tabs for Super Admin */}
      {user?.accountType === "SUPER_ADMIN" && (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="law-firm-metrics">Law Firm Metrics</TabsTrigger>
            <TabsTrigger value="law-firms">Law Firm Management</TabsTrigger>
            {/* Only show Cases tab if user has access to it */}
            {shouldShowCasesTab && (
              <TabsTrigger value="cases">Case Management</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <SuperAdminDashboard />
          </TabsContent>
          
          <TabsContent value="law-firm-metrics" className="space-y-4">
            <LawFirmMetrics />
          </TabsContent>

          <TabsContent value="law-firms" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Law Firm Management</CardTitle>
                  <CardDescription>
                    Manage law firms registered in the system
                  </CardDescription>
                </div>
                <Button onClick={handleAddLawFirm}>
                  <Plus className="mr-2 h-4 w-4" /> Add Law Firm
                </Button>
              </CardHeader>
              <CardContent>
                <LawFirmList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cases" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Case Management</CardTitle>
                  <CardDescription>
                    Manage and monitor legal cases
                  </CardDescription>
                </div>
                <Button onClick={handleAddCase}>
                  <Plus className="mr-2 h-4 w-4" /> Add Case
                </Button>
              </CardHeader>
              <CardContent>
                <CaseList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Render the appropriate dashboard based on account type for non-Super Admins */}
      {user?.accountType === "SUPER_ADMIN" ? null : (
        <>
          {user?.accountType === "ORGANISATION" && <OrganisationDashboard />}
          {user?.accountType === "INDIVIDUAL" && <IndividualDashboard />}
          
          {/* Fallback if account type is not one of the specified types */}
          {!user?.accountType && <IndividualDashboard />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
