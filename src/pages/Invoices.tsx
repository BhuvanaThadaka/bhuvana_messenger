
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuth } from "@/contexts/AuthContext";
import { AccountType } from "@/types/auth";
import { fetchInvoices } from "@/redux/slices/invoice";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";

const Invoices = () => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const { 
    loading, 
    page, 
    pageSize, 
    search,
    status,
    sortBy, 
    sortOrder 
  } = useSelector((state: RootState) => state.invoice);
  
  const isSuperAdmin = user?.accountType === AccountType.SUPER_ADMIN;
  
  useEffect(() => {
    dispatch(fetchInvoices({
      page,
      pageSize,
      search: search || undefined,
      status: status !== "all" ? status : undefined,
      sortBy,
      sortOrder,
      startDate: date?.from ? format(date.from, 'yyyy-MM-dd') : undefined,
      endDate: date?.to ? format(date.to, 'yyyy-MM-dd') : undefined
    }));
  }, [dispatch, page, pageSize, search, status, sortBy, sortOrder, date]);

  return (
    <div className="flex-1 space-y-4 p-6">
      <InvoiceHeader 
        search={search}
        isSuperAdmin={isSuperAdmin}
      />

      <InvoiceList
        loading={loading}
        date={date}
        setDate={setDate}
      />
    </div>
  );
};

export default Invoices;
