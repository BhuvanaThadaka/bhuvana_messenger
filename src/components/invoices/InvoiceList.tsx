
import { useAuth } from "@/contexts/AuthContext";
import { AccountType } from "@/types/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceFilters } from "./InvoiceFilters";
import { InvoiceTable } from "./InvoiceTable";
import { InvoicePagination } from "./InvoicePagination";
import { DateRange } from "react-day-picker";
import { DateRangeFilter } from "./DateRangeFilter";

interface InvoiceListProps {
  loading: boolean;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export const InvoiceList = ({ loading, date, setDate }: InvoiceListProps) => {
  const { user } = useAuth();
  const isSuperAdmin = user?.accountType === AccountType.SUPER_ADMIN;

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            {isSuperAdmin 
              ? "Manage subscription invoices for law firms" 
              : "View and manage your subscription invoices"}
          </CardDescription>
        </div>
        
        <div className="flex items-center gap-2">
          <DateRangeFilter date={date} onDateChange={setDate} />
          <InvoiceFilters />
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceTable loading={loading} isSuperAdmin={isSuperAdmin} />
        <InvoicePagination />
      </CardContent>
    </Card>
  );
};
