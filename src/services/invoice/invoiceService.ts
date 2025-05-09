
import { apiClient } from '../apiService';
import { getMockInvoices, getMockInvoiceById, updateMockInvoiceStatus, generateMockInvoice, sendMockInvoiceReminder } from './mockInvoiceService';

export interface Invoice {
  id: string;
  lawFirm: string;
  lawFirmId: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  plan: string;
  billingAddress?: string;
  items?: InvoiceItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  paymentMethod?: string;
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
  quantity: number;
}

export interface InvoiceListParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
}

export interface InvoiceListResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  pageSize: number;
}

// Get invoices with pagination and filtering
export const getInvoices = async (params: InvoiceListParams): Promise<InvoiceListResponse> => {
  try {
    const response = await apiClient.get<InvoiceListResponse>('/invoices', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    // Return mock data for development
    return getMockInvoices(params);
  }
};

// Get a single invoice by ID
export const getInvoiceById = async (invoiceId: string): Promise<Invoice> => {
  try {
    const response = await apiClient.get<Invoice>(`/invoices/${invoiceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoice ${invoiceId}:`, error);
    const mockInvoice = getMockInvoiceById(invoiceId);
    if (mockInvoice) {
      return mockInvoice;
    }
    throw new Error(`Error fetching invoice: ${error}`);
  }
};

// Generate a new invoice
export const generateInvoice = async (invoiceData: Partial<Invoice>): Promise<Invoice> => {
  try {
    const response = await apiClient.post<Invoice>('/invoices', invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error generating invoice:', error);
    // Return mock data for development
    return generateMockInvoice(invoiceData);
  }
};

// Update invoice status
export const updateInvoiceStatus = async (invoiceId: string, status: Invoice['status']): Promise<Invoice> => {
  try {
    const response = await apiClient.put<Invoice>(`/invoices/${invoiceId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating invoice ${invoiceId} status:`, error);
    const updatedInvoice = updateMockInvoiceStatus(invoiceId, status);
    if (updatedInvoice) {
      return updatedInvoice;
    }
    throw new Error(`Error updating invoice status: ${error}`);
  }
};

// Send invoice reminder
export const sendInvoiceReminder = async (invoiceId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post<{ success: boolean; message: string }>(`/invoices/${invoiceId}/reminder`);
    return response.data;
  } catch (error) {
    console.error(`Error sending reminder for invoice ${invoiceId}:`, error);
    // Return mock data for development
    return sendMockInvoiceReminder(invoiceId);
  }
};
