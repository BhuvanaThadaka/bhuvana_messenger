
import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getInvoices, 
  getInvoiceById, 
  updateInvoiceStatus, 
  sendInvoiceReminder,
  generateInvoice,
  InvoiceListParams
} from '@/services/invoice/invoiceService';
import { RootState } from '@/redux/store';

export const fetchInvoices = createAsyncThunk(
  'invoice/fetchInvoices',
  async (params: InvoiceListParams, { rejectWithValue }) => {
    try {
      const response = await getInvoices(params);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch invoices');
    }
  }
);

export const fetchInvoiceById = createAsyncThunk(
  'invoice/fetchInvoiceById',
  async (invoiceId: string, { rejectWithValue }) => {
    try {
      const invoice = await getInvoiceById(invoiceId);
      return invoice;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch invoice');
    }
  }
);

export const updateInvoiceStatusThunk = createAsyncThunk(
  'invoice/updateStatus',
  async ({ invoiceId, status }: { invoiceId: string; status: 'paid' | 'pending' | 'overdue' }, { rejectWithValue, dispatch, getState }) => {
    try {
      const updatedInvoice = await updateInvoiceStatus(invoiceId, status);
      
      // Refresh invoices list after updating status
      const state = getState() as RootState;
      const { page, pageSize, search, status: statusFilter, sortBy, sortOrder, startDate, endDate } = state.invoice;
      
      dispatch(fetchInvoices({
        page,
        pageSize,
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        sortBy,
        sortOrder,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      }));
      
      return updatedInvoice;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update invoice status');
    }
  }
);

export const sendInvoiceReminderThunk = createAsyncThunk(
  'invoice/sendReminder',
  async (invoiceId: string, { rejectWithValue }) => {
    try {
      const result = await sendInvoiceReminder(invoiceId);
      return { invoiceId, result };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send reminder');
    }
  }
);

export const generateInvoiceThunk = createAsyncThunk(
  'invoice/generateInvoice',
  async (invoiceData: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const newInvoice = await generateInvoice(invoiceData);
      
      // Refresh invoices list after generating a new invoice
      const state = getState() as RootState;
      const { page, pageSize, search, status, sortBy, sortOrder, startDate, endDate } = state.invoice;
      
      dispatch(fetchInvoices({
        page,
        pageSize,
        search: search || undefined,
        status: status !== 'all' ? status : undefined,
        sortBy,
        sortOrder,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      }));
      
      return newInvoice;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to generate invoice');
    }
  }
);
