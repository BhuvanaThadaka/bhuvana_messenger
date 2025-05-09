
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceActions } from "./InvoiceActions";
import { Invoice } from "@/services/invoice/invoiceService";
import { ChevronDown, ChevronUp } from "lucide-react";
import { setSortBy, setSortOrder } from "@/redux/slices/invoice";

interface InvoiceTableProps {
  loading: boolean;
  isSuperAdmin: boolean;
}

export const InvoiceTable = ({ loading, isSuperAdmin }: InvoiceTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { invoices = [], sortBy, sortOrder } = useSelector((state: RootState) => state.invoice);

  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(column));
      dispatch(setSortOrder('asc'));
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return <ChevronDown className="h-4 w-4 ml-1 opacity-50" />;
    return sortOrder === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSortChange('id')} className="cursor-pointer">
            <div className="flex items-center">
              Invoice ID {getSortIcon('id')}
            </div>
          </TableHead>
          {isSuperAdmin && (
            <TableHead onClick={() => handleSortChange('lawFirm')} className="cursor-pointer">
              <div className="flex items-center">
                Law Firm {getSortIcon('lawFirm')}
              </div>
            </TableHead>
          )}
          <TableHead onClick={() => handleSortChange('amount')} className="cursor-pointer">
            <div className="flex items-center">
              Amount {getSortIcon('amount')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleSortChange('issueDate')} className="cursor-pointer">
            <div className="flex items-center">
              Issue Date {getSortIcon('issueDate')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleSortChange('dueDate')} className="cursor-pointer">
            <div className="flex items-center">
              Due Date {getSortIcon('dueDate')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleSortChange('plan')} className="cursor-pointer">
            <div className="flex items-center">
              Plan {getSortIcon('plan')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleSortChange('status')} className="cursor-pointer">
            <div className="flex items-center">
              Status {getSortIcon('status')}
            </div>
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(invoices) && invoices.length > 0 ? (
          invoices.map((invoice: Invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              {isSuperAdmin && <TableCell>{invoice.lawFirm}</TableCell>}
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>{formatDate(invoice.issueDate)}</TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>{invoice.plan}</TableCell>
              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
              <TableCell>
                <InvoiceActions invoice={invoice} isSuperAdmin={isSuperAdmin} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={isSuperAdmin ? 8 : 7} className="text-center h-24">
              No invoices found matching your search.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
