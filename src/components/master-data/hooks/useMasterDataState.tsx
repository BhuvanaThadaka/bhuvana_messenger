
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  getCourts,
  getLawTypes,
  getClients,
  getCourtById,
  getLawTypeById,
  getClientById,
  CourtData,
  LawTypeData,
  ClientData,
} from "@/services/master-data";

export type MasterDataTab = "courts" | "lawTypes" | "clients";

export function useMasterDataState() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<MasterDataTab>("courts");

  // Data states
  const [courts, setCourts] = useState<CourtData[]>([]);
  const [lawTypes, setLawTypes] = useState<LawTypeData[]>([]);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [courtDialogOpen, setCourtDialogOpen] = useState(false);
  const [lawTypeDialogOpen, setLawTypeDialogOpen] = useState(false);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);

  // Selected items for editing
  const [selectedCourt, setSelectedCourt] = useState<CourtData | undefined>(undefined);
  const [selectedLawType, setSelectedLawType] = useState<LawTypeData | undefined>(undefined);
  const [selectedClient, setSelectedClient] = useState<ClientData | undefined>(undefined);

  // Delete dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "court" | "lawType" | "client"; name: string }>({
    id: "",
    type: "court",
    name: ""
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courtsRes, lawTypesRes, clientsRes] = await Promise.all([
          getCourts(),
          getLawTypes(),
          getClients()
        ]);
        
        setCourts(courtsRes.data);
        setLawTypes(lawTypesRes.data);
        setClients(clientsRes.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch master data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Search function
  const filterData = <T extends { name: string }>(items: T[]): T[] => {
    if (!searchQuery.trim()) return items;
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Computed filtered data
  const filteredCourts = filterData(courts);
  const filteredLawTypes = filterData(lawTypes);
  const filteredClients = filterData(clients);

  return {
    // State
    searchQuery,
    activeTab,
    courts,
    lawTypes,
    clients,
    loading,
    courtDialogOpen,
    lawTypeDialogOpen,
    clientDialogOpen,
    dialogMode,
    submitting,
    selectedCourt,
    selectedLawType,
    selectedClient,
    deleteDialogOpen,
    itemToDelete,
    isDeleting,
    filteredCourts,
    filteredLawTypes,
    filteredClients,

    // Setters
    setSearchQuery,
    setActiveTab,
    setCourts,
    setLawTypes,
    setClients,
    setCourtDialogOpen,
    setLawTypeDialogOpen,
    setClientDialogOpen,
    setDialogMode,
    setSubmitting,
    setSelectedCourt,
    setSelectedLawType,
    setSelectedClient,
    setDeleteDialogOpen,
    setItemToDelete,
    setIsDeleting,

    // Helper functions
    filterData,

    // Entity-specific functions
    fetchCourtDetails: async (id: string) => {
      try {
        const response = await getCourtById(id);
        return response.data;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch court details",
          variant: "destructive"
        });
        return undefined;
      }
    },

    fetchLawTypeDetails: async (id: string) => {
      try {
        const response = await getLawTypeById(id);
        return response.data;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch law type details",
          variant: "destructive"
        });
        return undefined;
      }
    },

    fetchClientDetails: async (id: string) => {
      try {
        const response = await getClientById(id);
        return response.data;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch client details",
          variant: "destructive"
        });
        return undefined;
      }
    }
  };
}
