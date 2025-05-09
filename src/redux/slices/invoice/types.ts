
import { Invoice } from "@/services/invoice/invoiceService";

export interface InvoiceState {
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
  search: string;
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  startDate: string | null;
  endDate: string | null;
}
