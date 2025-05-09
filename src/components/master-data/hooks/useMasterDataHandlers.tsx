
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  createCourt,
  updateCourt,
  deleteCourt,
  createLawType,
  updateLawType,
  deleteLawType,
  createClient,
  updateClient,
  deleteClient,
  CourtData,
  LawTypeData,
  ClientData
} from "@/services/master-data";
import { CourtFormValues, LawTypeFormValues, ClientFormValues } from "../types";
import { useMasterDataState, MasterDataTab } from "./useMasterDataState";

export function useMasterDataHandlers() {
  const { toast } = useToast();
  const state = useMasterDataState();
  
  // Court handlers
  const handleAddCourt = () => {
    state.setSelectedCourt(undefined);
    state.setDialogMode("create");
    state.setCourtDialogOpen(true);
  };

  const handleEditCourt = async (id: string) => {
    try {
      const court = await state.fetchCourtDetails(id);
      if (court) {
        state.setSelectedCourt(court);
        state.setDialogMode("edit");
        state.setCourtDialogOpen(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch court details",
        variant: "destructive"
      });
    }
  };

  const handleCourtSubmit = async (data: CourtFormValues) => {
    state.setSubmitting(true);
    try {
      if (state.dialogMode === "create") {
        // Fix TS error by ensuring all required properties exist
        const courtData: Omit<CourtData, "id"> = {
          name: data.name,
          location: data.location,
          type: data.type
        };
        
        const response = await createCourt(courtData);
        if (response.success) {
          state.setCourts(prev => [...prev, response.data]);
          state.setCourtDialogOpen(false);
        }
      } else {
        if (state.selectedCourt) {
          // Fix TS error by ensuring all required properties exist
          const courtData: Omit<CourtData, "id"> = {
            name: data.name,
            location: data.location,
            type: data.type
          };
          
          const response = await updateCourt(state.selectedCourt.id, courtData);
          if (response.success) {
            state.setCourts(prev => prev.map(court => 
              court.id === state.selectedCourt!.id ? response.data : court
            ));
            state.setCourtDialogOpen(false);
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${state.dialogMode} court`,
        variant: "destructive"
      });
    } finally {
      state.setSubmitting(false);
    }
  };

  // Law Type handlers
  const handleAddLawType = () => {
    state.setSelectedLawType(undefined);
    state.setDialogMode("create");
    state.setLawTypeDialogOpen(true);
  };

  const handleEditLawType = async (id: string) => {
    try {
      const lawType = await state.fetchLawTypeDetails(id);
      if (lawType) {
        state.setSelectedLawType(lawType);
        state.setDialogMode("edit");
        state.setLawTypeDialogOpen(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch law type details",
        variant: "destructive"
      });
    }
  };

  const handleLawTypeSubmit = async (data: LawTypeFormValues) => {
    state.setSubmitting(true);
    try {
      if (state.dialogMode === "create") {
        // Fix TS error by ensuring all required properties exist
        const lawTypeData: Omit<LawTypeData, "id"> = {
          name: data.name,
          description: data.description
        };
        
        const response = await createLawType(lawTypeData);
        if (response.success) {
          state.setLawTypes(prev => [...prev, response.data]);
          state.setLawTypeDialogOpen(false);
        }
      } else {
        if (state.selectedLawType) {
          // Fix TS error by ensuring all required properties exist
          const lawTypeData: Omit<LawTypeData, "id"> = {
            name: data.name,
            description: data.description
          };
          
          const response = await updateLawType(state.selectedLawType.id, lawTypeData);
          if (response.success) {
            state.setLawTypes(prev => prev.map(lawType => 
              lawType.id === state.selectedLawType!.id ? response.data : lawType
            ));
            state.setLawTypeDialogOpen(false);
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${state.dialogMode} law type`,
        variant: "destructive"
      });
    } finally {
      state.setSubmitting(false);
    }
  };

  // Client handlers
  const handleAddClient = () => {
    state.setSelectedClient(undefined);
    state.setDialogMode("create");
    state.setClientDialogOpen(true);
  };

  const handleEditClient = async (id: string) => {
    try {
      const client = await state.fetchClientDetails(id);
      if (client) {
        state.setSelectedClient(client);
        state.setDialogMode("edit");
        state.setClientDialogOpen(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch client details",
        variant: "destructive"
      });
    }
  };

  const handleClientSubmit = async (data: ClientFormValues) => {
    state.setSubmitting(true);
    try {
      if (state.dialogMode === "create") {
        // Fix TS error by ensuring all required properties exist
        const clientData: Omit<ClientData, "id"> = {
          name: data.name,
          type: data.type,
          industry: data.industry
        };
        
        const response = await createClient(clientData);
        if (response.success) {
          state.setClients(prev => [...prev, response.data]);
          state.setClientDialogOpen(false);
        }
      } else {
        if (state.selectedClient) {
          // Fix TS error by ensuring all required properties exist
          const clientData: Omit<ClientData, "id"> = {
            name: data.name,
            type: data.type,
            industry: data.industry
          };
          
          const response = await updateClient(state.selectedClient.id, clientData);
          if (response.success) {
            state.setClients(prev => prev.map(client => 
              client.id === state.selectedClient!.id ? response.data : client
            ));
            state.setClientDialogOpen(false);
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${state.dialogMode} client`,
        variant: "destructive"
      });
    } finally {
      state.setSubmitting(false);
    }
  };

  // Delete handlers
  const handleConfirmDelete = (id: string, type: "court" | "lawType" | "client", name: string) => {
    state.setItemToDelete({ id, type, name });
    state.setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    state.setIsDeleting(true);
    try {
      const { id, type } = state.itemToDelete;
      let response;

      switch (type) {
        case "court":
          response = await deleteCourt(id);
          if (response.success) {
            state.setCourts(prev => prev.filter(court => court.id !== id));
          }
          break;
        case "lawType":
          response = await deleteLawType(id);
          if (response.success) {
            state.setLawTypes(prev => prev.filter(lawType => lawType.id !== id));
          }
          break;
        case "client":
          response = await deleteClient(id);
          if (response.success) {
            state.setClients(prev => prev.filter(client => client.id !== id));
          }
          break;
      }

      state.setDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
    } finally {
      state.setIsDeleting(false);
    }
  };

  const handleAddNew = () => {
    switch (state.activeTab) {
      case "courts": 
        handleAddCourt();
        break;
      case "lawTypes": 
        handleAddLawType();
        break;
      case "clients": 
        handleAddClient();
        break;
    }
  };

  return {
    handleAddCourt,
    handleEditCourt,
    handleCourtSubmit,
    handleAddLawType,
    handleEditLawType,
    handleLawTypeSubmit,
    handleAddClient,
    handleEditClient,
    handleClientSubmit,
    handleConfirmDelete,
    handleDelete,
    handleAddNew
  };
}
