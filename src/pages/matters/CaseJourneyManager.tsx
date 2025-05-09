
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJourneyData } from "@/hooks/useJourneyData";
import { usePermissions } from "@/hooks/usePermissions";
import { useMatterList } from "@/hooks/matters/useMatterList";
import { Modules } from "@/types/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, History, Calendar, GitBranch, Search, FileDown, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import CaseJourneyTimeline from "@/components/matters/journey/CaseJourneyTimeline";
import VersionControlTimeline from "@/components/matters/journey/VersionControlTimeline";
import CommitLogTab from "@/components/matters/journey/CommitLogTab";
import { LoadingState } from "@/components/matters/journey/LoadingState";
import ErrorState from "@/components/matters/journey/ErrorState";
import MatterListTable from "@/components/matters/list/MatterListTable";
import DeleteMatterDialog from "@/components/matters/list/DeleteMatterDialog";

const CaseJourneyManager: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const permissions = usePermissions(Modules.CaseManagement);
  
  // Case details data when viewing a specific case journey
  const { caseData, loading: caseLoading, error: caseError } = useJourneyData();
  
  // Matter list data when viewing all cases
  const {
    matters,
    isLoading: mattersLoading,
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    sortBy,
    sortOrder,
    handleSort,
    filters,
    setFilters,
    openFilters,
    setOpenFilters,
    resetFilters,
    applyFilters,
    refetch,
    selectedCase,
    setSelectedCase,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete
  } = useMatterList();
  
  const [activeTab, setActiveTab] = useState(caseId ? "timeline" : "list");
  
  const canEditJourney = permissions.canUpdate;
  
  // Determine if we're in case journey mode or list mode
  const isCaseMode = Boolean(caseId);
  
  // If we're in case mode and loading the case data
  if (isCaseMode && caseLoading) {
    return <LoadingState />;
  }
  
  // If we're in case mode and there's an error or no case data
  if (isCaseMode && (caseError || !caseData)) {
    return <ErrorState error={caseError} backUrl="/case-journey" />;
  }
  
  // Set up variables for case mode
  const timelineEvents = isCaseMode ? (caseData?.timeline || []) : [];
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isCaseMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/case-journey`)}
                className="mr-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case List
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{caseData?.title || caseData?.caseTitle}</h1>
                <p className="text-muted-foreground">Case Journey and Version Tracking</p>
              </div>
            </>
          ) : (
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Case Journey Manager</h1>
              <p className="text-muted-foreground">Manage cases and their journey timeline</p>
            </div>
          )}
        </div>
        
        {isCaseMode && canEditJourney ? (
          <Button onClick={() => navigate(`/cases/${caseId}/journey/add`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Entry
          </Button>
        ) : !isCaseMode && permissions.canCreate ? (
          <Button onClick={() => navigate("/matters/create")}>
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
        ) : null}
      </div>
      
      {isCaseMode ? (
        // Case Journey View
        <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="timeline" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="versions" className="flex items-center">
              <GitBranch className="mr-2 h-4 w-4" />
              Version Control
            </TabsTrigger>
            <TabsTrigger value="commits" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Commit Log
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline">
            <Card className="p-6">
              <CaseJourneyTimeline />
            </Card>
          </TabsContent>
          
          <TabsContent value="versions">
            <Card className="p-6">
              <VersionControlTimeline 
                timelineEvents={timelineEvents} 
                canUpdate={canEditJourney} 
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="commits">
            <CommitLogTab timelineEvents={timelineEvents} />
          </TabsContent>
        </Tabs>
      ) : (
        // Case List View
        <>
          <Card className="mb-6">
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cases..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setOpenFilters(!openFilters)}
                  >
                    <Filter className="mr-2 h-4 w-4" /> 
                    Filters
                  </Button>
                  
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <MatterListTable 
            matters={matters}
            isLoading={mattersLoading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            navigate={navigate}
            onViewJourney={(caseItem) => {
              navigate(`/cases/${caseItem.id}/journey`);
            }}
            onDelete={(caseItem) => {
              setSelectedCase(caseItem);
              setIsDeleteDialogOpen(true);
            }}
          />

          <DeleteMatterDialog
            isOpen={isDeleteDialogOpen}
            setIsOpen={setIsDeleteDialogOpen}
            selectedCase={selectedCase}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default CaseJourneyManager;
