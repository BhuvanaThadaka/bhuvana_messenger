
import { useState } from 'react';
import CaseList from '@/components/cases/CaseList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";

const CaseManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'active-cases';
  });

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/cases?tab=${value}`);
  };

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Case Management</h2>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active-cases">Active Cases</TabsTrigger>
          <TabsTrigger value="pending-cases">Pending Cases</TabsTrigger>
          <TabsTrigger value="closed-cases">Closed Cases</TabsTrigger>
          <TabsTrigger value="all-cases">All Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active-cases" className="space-y-4">
          <CaseList initialStatusFilter="Open" />
        </TabsContent>
        
        <TabsContent value="pending-cases" className="space-y-4">
          <CaseList initialStatusFilter="Pending" />
        </TabsContent>
        
        <TabsContent value="closed-cases" className="space-y-4">
          <CaseList initialStatusFilter="Closed" />
        </TabsContent>
        
        <TabsContent value="all-cases" className="space-y-4">
          <CaseList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseManagement;
