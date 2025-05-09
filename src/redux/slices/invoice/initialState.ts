
import { InvoiceState } from './types';

export const initialState: InvoiceState = {
  invoices: [],
  selectedInvoice: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
  search: '',
  status: 'all',
  sortBy: 'issueDate',
  sortOrder: 'desc',
  startDate: null,
  endDate: null
};
