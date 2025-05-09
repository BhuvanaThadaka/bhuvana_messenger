import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { Plus } from "lucide-react";
import { 
  getCases, 
  deleteCase, 
  updateCaseStatus,
  Case 
} from "@/services/mockCaseService";

// Import the components
import CaseFilters from "./filters/CaseFilters";
import CaseTable from "./table/CaseTable";
import CasePagination from "./pagination/CasePagination";
import DeleteCaseDialog from "./dialogs/DeleteCaseDialog";
import UpdateStatusDialog from "./dialogs/UpdateStatusDialog";

interface CaseListProps {
  initialStatusFilter?: string;
}

const CaseList = ({ initialStatusFilter = "" }: CaseListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State variables
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter ? initialStatusFilter : "all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [caseToUpdateStatus, setCaseToUpdateStatus] = useState<{ id: string; status: "Open" | "Closed" | "Pending" } | null>(null);

  // Fetch cases on mount and when filters change
  useEffect(() => {
    fetchCases();
  }, [page, pageSize, search, statusFilter, priorityFilter, sortBy, sortOrder]);

  // Function to fetch cases with current filters
  const fetchCases = async () => {
    setLoading(true);
    try {
      const response = await getCases({
        page,
        pageSize,
        search,
        status: statusFilter === "all" ? "" : statusFilter,
        priority: priorityFilter === "all" ? "" : priorityFilter,
        sortBy,
        sortOrder,
      });

      if (response && response.data) {
        setCases(response.data.cases);
        setTotal(response.data.total);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cases",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePriorityFilterChange = (value: string) => {
    setPriorityFilter(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setCaseToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleUpdateStatusClick = (caseItem: { id: string; status: "Open" | "Closed" | "Pending" }) => {
    setCaseToUpdateStatus(caseItem);
    setStatusDialogOpen(true);
  };

  // Action handlers
  const handleDelete = async () => {
    if (!caseToDelete) return;

    try {
      await deleteCase(caseToDelete);
      fetchCases();
      toast({
        title: "Success",
        description: "Case deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete case",
        variant: "destructive",
      });
    } finally {
      setCaseToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!caseToUpdateStatus) return;

    try {
      await updateCaseStatus(caseToUpdateStatus.id, caseToUpdateStatus.status);
      fetchCases();
      toast({
        title: "Success",
        description: `Case status updated to ${caseToUpdateStatus.status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update case status",
        variant: "destructive",
      });
    } finally {
      setCaseToUpdateStatus(null);
      setStatusDialogOpen(false);
    }
  };

  const handleStatusChange = (status: "Open" | "Pending" | "Closed") => {
    if (caseToUpdateStatus) {
      setCaseToUpdateStatus({
        ...caseToUpdateStatus,
        status,
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Case Management</CardTitle>
          <Button onClick={() => navigate("/cases/create")}>
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
        </CardHeader>
        <CardContent>
          {/* Filters section */}
          <CaseFilters 
            search={search}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onSearchChange={handleSearchChange}
            onStatusFilterChange={handleStatusFilterChange}
            onPriorityFilterChange={handlePriorityFilterChange}
            onSearch={fetchCases}
          />

          {/* Cases table */}
          <CaseTable 
            cases={cases}
            loading={loading}
            onUpdateStatus={handleUpdateStatusClick}
            onDelete={handleDeleteClick}
          />

          {/* Pagination */}
          <CasePagination 
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <DeleteCaseDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />

      <UpdateStatusDialog 
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        status={caseToUpdateStatus?.status || "Open"}
        onStatusChange={handleStatusChange}
        onConfirm={handleUpdateStatus}
      />
    </div>
  );
};

export default CaseList;
