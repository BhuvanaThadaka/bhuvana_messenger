
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfirmDeleteDialog from "@/components/crud/ConfirmDeleteDialog";

// Import Dialogs
import CourtDialog from "@/components/master-data/court/CourtDialog";
import LawTypeDialog from "@/components/master-data/law-type/LawTypeDialog";
import ClientDialog from "@/components/master-data/client/ClientDialog";

// Import Custom Hooks and Components
import { useMasterDataState } from "@/components/master-data/hooks/useMasterDataState";
import { useMasterDataHandlers } from "@/components/master-data/hooks/useMasterDataHandlers";
import MasterDataHeader from "@/components/master-data/MasterDataHeader";
import CourtsTab from "@/components/master-data/tabs/CourtsTab";
import LawTypesTab from "@/components/master-data/tabs/LawTypesTab";
import ClientsTab from "@/components/master-data/tabs/ClientsTab";

const MasterData = () => {
  // Use custom hooks for state and handlers
  const state = useMasterDataState();
  const handlers = useMasterDataHandlers();

  return (
    <div className="flex-1 space-y-4 p-6">
      <MasterDataHeader 
        searchQuery={state.searchQuery}
        onSearchChange={state.setSearchQuery}
        onAddNew={handlers.handleAddNew}
        activeTab={state.activeTab}
      />

      <Card>
        <CardHeader>
          <CardTitle>Reference Data</CardTitle>
          <CardDescription>
            Manage your system's master data and reference information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="courts" onValueChange={(value) => state.setActiveTab(value as "courts" | "lawTypes" | "clients")}>
            <TabsList className="mb-4">
              <TabsTrigger value="courts">Courts</TabsTrigger>
              <TabsTrigger value="lawTypes">Law Types</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courts">
              <CourtsTab 
                courts={state.filteredCourts}
                loading={state.loading}
                onEdit={handlers.handleEditCourt}
                onDelete={(id, name) => handlers.handleConfirmDelete(id, "court", name)}
              />
            </TabsContent>
            
            <TabsContent value="lawTypes">
              <LawTypesTab 
                lawTypes={state.filteredLawTypes}
                loading={state.loading}
                onEdit={handlers.handleEditLawType}
                onDelete={(id, name) => handlers.handleConfirmDelete(id, "lawType", name)}
              />
            </TabsContent>
            
            <TabsContent value="clients">
              <ClientsTab 
                clients={state.filteredClients}
                loading={state.loading}
                onEdit={handlers.handleEditClient}
                onDelete={(id, name) => handlers.handleConfirmDelete(id, "client", name)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Court Dialog */}
      <CourtDialog
        isOpen={state.courtDialogOpen}
        onClose={() => state.setCourtDialogOpen(false)}
        onSubmit={handlers.handleCourtSubmit}
        court={state.selectedCourt}
        isSubmitting={state.submitting}
        mode={state.dialogMode}
      />

      {/* Law Type Dialog */}
      <LawTypeDialog
        isOpen={state.lawTypeDialogOpen}
        onClose={() => state.setLawTypeDialogOpen(false)}
        onSubmit={handlers.handleLawTypeSubmit}
        lawType={state.selectedLawType}
        isSubmitting={state.submitting}
        mode={state.dialogMode}
      />

      {/* Client Dialog */}
      <ClientDialog
        isOpen={state.clientDialogOpen}
        onClose={() => state.setClientDialogOpen(false)}
        onSubmit={handlers.handleClientSubmit}
        client={state.selectedClient}
        isSubmitting={state.submitting}
        mode={state.dialogMode}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={state.deleteDialogOpen}
        onClose={() => state.setDeleteDialogOpen(false)}
        onConfirm={handlers.handleDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete this ${state.itemToDelete.type}? This action cannot be undone.`}
        entityName={state.itemToDelete.name}
        isDeleting={state.isDeleting}
      />
    </div>
  );
};

export default MasterData;
