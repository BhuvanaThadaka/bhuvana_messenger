
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LegalCase, CourtType, CaseType } from "@/types/matter";
import { getLegalCases } from "@/services/mockMatterService";
import { toast } from "@/components/ui/use-toast";

export const useMatterList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(undefined);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState({
    caseNumber: "",
    advocateName: "",
    courtType: "" as CourtType | "",
    caseType: "" as CaseType | "",
    dateOfFiling: {
      from: "",
      to: ""
    }
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  
  // Function to get data with current filters, sorting, and pagination
  const fetchData = () => {
    return getLegalCases({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder: sortOrder as "asc" | "desc" | undefined,
      filters: {
        caseNumber: filters.caseNumber || undefined,
        advocateName: filters.advocateName || undefined,
        courtType: filters.courtType as CourtType | undefined,
        caseType: filters.caseType as CaseType | undefined,
        dateOfFiling: {
          from: filters.dateOfFiling.from || undefined,
          to: filters.dateOfFiling.to || undefined
        }
      }
    });
  };

  // Query to fetch legal cases
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['legalCases', page, pageSize, search, sortBy, sortOrder, filters],
    queryFn: fetchData
  });

  // Effect to reset page when search or filters change
  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  // Sort handling
  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle order if clicking the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to ascending
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      caseNumber: "",
      advocateName: "",
      courtType: "",
      caseType: "",
      dateOfFiling: {
        from: "",
        to: ""
      }
    });
    setOpenFilters(false);
  };

  // Apply filters
  const applyFilters = () => {
    refetch();
    setOpenFilters(false);
  };

  // Handle delete
  const handleDelete = () => {
    if (selectedCase) {
      toast({
        title: "Case Deleted",
        description: `${selectedCase.caseTitle} has been deleted.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedCase(null);
      refetch();
    }
  };

  return {
    matters: data?.data || [],
    isLoading,
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
  };
};
