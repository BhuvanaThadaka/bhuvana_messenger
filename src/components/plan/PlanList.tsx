
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  Filter, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2
} from "lucide-react";
import { 
  fetchSubscriptionPlans, 
  setPage, 
  setSearch, 
  setSortBy, 
  setSortOrder,
  toggleSubscriptionPlanStatus,
  deleteSubscriptionPlan
} from "@/redux/slices/planSlice";
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
import { useNavigate } from "react-router-dom";

const PlanList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { plans, loading, page, pageSize, total, sortBy, sortOrder, search } = useSelector(
    (state: RootState) => state.plan
  );
  const [searchQuery, setSearchQuery] = useState(search);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSubscriptionPlans({}));
  }, [dispatch, page, pageSize, sortBy, sortOrder]);

  const handleSearch = () => {
    dispatch(setSearch(searchQuery));
    dispatch(setPage(1));
    dispatch(fetchSubscriptionPlans({}));
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(column));
      dispatch(setSortOrder('asc'));
    }
  };

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    dispatch(toggleSubscriptionPlanStatus({ id, isActive: !currentStatus }));
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

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteSubscriptionPlan(deleteId));
      setDeleteId(null);
    }
  };

  const handleAddNew = () => {
    navigate('/plans/create');
  };

  const handleView = (id: string) => {
    navigate(`/plans/view/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/plans/edit/${id}`);
  };

  const totalPages = Math.ceil(total / pageSize);

  // Ensure plans is initialized as an array even if undefined
  const plansList = plans || [];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Subscription Plan Management</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Create New Plan
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search plans..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button variant="outline" onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Plan Name
                {renderSortIcon('name')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('monthlyPrice')}
              >
                Monthly Price
                {renderSortIcon('monthlyPrice')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('annualPrice')}
              >
                Annual Price
                {renderSortIcon('annualPrice')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('trialDays')}
              >
                Trial Days
                {renderSortIcon('trialDays')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('isActive')}
              >
                Status
                {renderSortIcon('isActive')}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                </TableRow>
              ))
            ) : plansList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No subscription plans found. Click 'Create New Plan' to add one.
                </TableCell>
              </TableRow>
            ) : (
              plansList.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{formatCurrency(plan.monthlyPrice)}</TableCell>
                  <TableCell>{formatCurrency(plan.annualPrice)}</TableCell>
                  <TableCell>{plan.trialDays}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={() => handleToggleStatus(plan.id, plan.isActive)}
                      />
                      <span className={plan.isActive ? "text-green-600" : "text-red-600"}>
                        {plan.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(plan.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(plan.id)}>
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
                              Are you sure you want to delete this subscription plan? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => confirmDelete()} className="bg-red-600">
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

      {/* Pagination */}
      {!loading && plansList.length > 0 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanList;
