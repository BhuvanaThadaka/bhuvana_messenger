
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CaseList from "@/components/cases/CaseList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrudLayout from "@/components/crud/CrudLayout";

const CasesManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all-cases");

  const handleAddNew = () => {
    navigate("/cases/create");
  };

  return (
    <CrudLayout
      title="Case Management"
      description="Manage legal cases, track progress, and organize documents"
      searchPlaceholder="Search cases..."
      onAdd={handleAddNew}
      addButtonText="New Case"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-cases">All Cases</TabsTrigger>
          <TabsTrigger value="active-cases">Active Cases</TabsTrigger>
          <TabsTrigger value="pending-cases">Pending Cases</TabsTrigger>
          <TabsTrigger value="closed-cases">Closed Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-cases" className="space-y-4">
          <CaseList />
        </TabsContent>
        
        <TabsContent value="active-cases" className="space-y-4">
          <CaseList initialStatusFilter="Open" />
        </TabsContent>
        
        <TabsContent value="pending-cases" className="space-y-4">
          <CaseList initialStatusFilter="Pending" />
        </TabsContent>
        
        <TabsContent value="closed-cases" className="space-y-4">
          <CaseList initialStatusFilter="Closed" />
        </TabsContent>
      </Tabs>
    </CrudLayout>
  );
};

export default CasesManagement;
