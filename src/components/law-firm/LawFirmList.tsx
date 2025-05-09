import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { 
  fetchLawFirms,
  setPage,
  setSortBy,
  setSortOrder,
  toggleLawFirmStatus,
  deleteLawFirm 
} from "@/redux/slices/law-firm";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { LawFirm } from "@/types/lawFirm";

const LawFirmList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { 
    lawFirms, 
    loading, 
    page, 
    pageSize, 
    total, 
    sortBy, 
    sortOrder 
  } = useSelector((state: RootState) => state.lawFirm);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchLawFirms({
      page,
      pageSize,
      sortBy,
      sortOrder
    }));
  }, [dispatch, page, pageSize, sortBy, sortOrder]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(column));
      dispatch(setSortOrder('asc'));
    }
    
    dispatch(setPage(1));
  };

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    dispatch(toggleLawFirmStatus({ id, isActive: !currentStatus }))
      .unwrap()
      .then(() => {
        toast({
          title: "Status Updated",
          description: `Law firm ${currentStatus ? 'deactivated' : 'activated'} successfully`,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: typeof error === 'string' ? error : "Failed to update status",
          variant: "destructive",
        });
      });
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return <ChevronDown className="ml-1 h-4 w-4" />;
    return sortOrder === 'asc' ? 
      <ChevronDown className="ml-1 h-4 w-4 transform rotate-180" /> : 
      <ChevronDown className="ml-1 h-4 w-4" />;
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteLawFirm(deleteId))
        .unwrap()
        .then(() => {
          toast({
            title: "Law Firm Deleted",
            description: "The law firm has been deleted successfully",
          });
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: typeof error === 'string' ? error : "Failed to delete law firm",
            variant: "destructive",
          });
        });
      setDeleteId(null);
    }
  };

  const handleView = (id: string) => {
    navigate(`/law-firms/view/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/law-firms/edit/${id}`);
  };

  const totalPages = Math.ceil(total / pageSize);

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'premium':
        return "bg-purple-500 hover:bg-purple-600";
      case 'standard':
        return "bg-blue-500 hover:bg-blue-600";
      case 'basic':
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'premium':
        return "Premium";
      case 'standard':
        return "Standard";
      case 'basic':
        return "Basic";
      default:
        return plan;
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer w-[200px]"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Law Firm Name
                  {renderSortIcon('name')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('firmType')}
              >
                <div className="flex items-center">
                  Type
                  {renderSortIcon('firmType')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('primaryContactNumber')}
              >
                <div className="flex items-center">
                  Contact
                  {renderSortIcon('primaryContactNumber')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('adminName')}
              >
                <div className="flex items-center">
                  Admin
                  {renderSortIcon('adminName')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('plan')}
              >
                <div className="flex items-center">
                  Plan
                  {renderSortIcon('plan')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('isActive')}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon('isActive')}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                </TableRow>
              ))
            ) : lawFirms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No law firms found
                </TableCell>
              </TableRow>
            ) : (
              lawFirms.map((firm: LawFirm) => (
                <TableRow key={firm.id}>
                  <TableCell className="font-medium">{firm.name}</TableCell>
                  <TableCell>{firm.firmType}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{firm.primaryContactName}</span>
                      <span className="text-xs text-muted-foreground">{firm.primaryContactNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{firm.adminName}</span>
                      <span className="text-xs text-muted-foreground">{firm.adminEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlanBadgeColor(firm.plan)}>
                      {getPlanName(firm.plan)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={firm.isActive}
                        onCheckedChange={() => handleToggleStatus(firm.id, firm.isActive)}
                      />
                      <span className="flex items-center">
                        {firm.isActive ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={firm.isActive ? "text-green-600" : "text-red-600"}>
                          {firm.isActive ? "Active" : "Inactive"}
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleView(firm.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(firm.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this law firm? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                              setDeleteId(firm.id);
                              confirmDelete();
                            }} className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && lawFirms.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={page > 1 ? () => handlePageChange(page - 1) : undefined}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={page === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 3 && (
              <PaginationItem>
                <span className="flex h-9 w-9 items-center justify-center">
                  ...
                </span>
              </PaginationItem>
            )}
            
            {totalPages > 3 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext
                onClick={page < totalPages ? () => handlePageChange(page + 1) : undefined}
                className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default LawFirmList;
