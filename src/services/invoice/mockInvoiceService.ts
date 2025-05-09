
import { Invoice, InvoiceListParams, InvoiceListResponse } from './invoiceService';

// Sample invoice data
const mockInvoices: Invoice[] = [
  {
    id: "INV-2025-001",
    lawFirm: "Smith & Associates",
    lawFirmId: "firm-001",
    amount: 1500.00,
    issueDate: "2025-03-15",
    dueDate: "2025-04-15",
    status: "paid",
    plan: "Premium",
    billingAddress: "123 Legal Avenue, Suite 500, New York, NY 10001",
    items: [
      { description: "Premium Plan Monthly Subscription", amount: 1200.00, quantity: 1 },
      { description: "Additional User Licenses (5)", amount: 60.00, quantity: 5 }
    ],
    subtotal: 1500.00,
    tax: 0.00,
    total: 1500.00,
    paymentMethod: "Credit Card",
    notes: "Thank you for your business"
  },
  {
    id: "INV-2025-002",
    lawFirm: "Legal Eagles LLP",
    lawFirmId: "firm-002",
    amount: 999.00,
    issueDate: "2025-03-20",
    dueDate: "2025-04-20",
    status: "pending",
    plan: "Standard",
    billingAddress: "456 Justice Road, Chicago, IL 60601",
    items: [
      { description: "Standard Plan Monthly Subscription", amount: 899.00, quantity: 1 },
      { description: "Document Storage Add-on", amount: 100.00, quantity: 1 }
    ],
    subtotal: 999.00,
    tax: 0.00,
    total: 999.00,
    paymentMethod: "Bank Transfer",
    notes: "Payment due within 30 days"
  },
  {
    id: "INV-2025-003",
    lawFirm: "Johnson Legal Group",
    lawFirmId: "firm-003",
    amount: 699.00,
    issueDate: "2025-03-01",
    dueDate: "2025-04-01",
    status: "overdue",
    plan: "Basic",
    billingAddress: "789 Attorney Street, Los Angeles, CA 90001",
    items: [
      { description: "Basic Plan Monthly Subscription", amount: 499.00, quantity: 1 },
      { description: "Additional Storage (200GB)", amount: 200.00, quantity: 1 }
    ],
    subtotal: 699.00,
    tax: 0.00,
    total: 699.00,
    paymentMethod: "Credit Card",
    notes: "Please contact support for payment issues"
  },
  {
    id: "INV-2025-004",
    lawFirm: "Barrister & Partners",
    lawFirmId: "firm-004",
    amount: 2999.00,
    issueDate: "2025-03-10",
    dueDate: "2025-04-10",
    status: "paid",
    plan: "Enterprise",
    billingAddress: "1010 Legal Plaza, Suite 1200, Boston, MA 02108",
    items: [
      { description: "Enterprise Plan Annual Subscription", amount: 2499.00, quantity: 1 },
      { description: "Premium Support Package", amount: 500.00, quantity: 1 }
    ],
    subtotal: 2999.00,
    tax: 0.00,
    total: 2999.00,
    paymentMethod: "Wire Transfer",
    notes: "Annual subscription renewal"
  },
  {
    id: "INV-2025-005",
    lawFirm: "Matthews & Associates",
    lawFirmId: "firm-005",
    amount: 849.00,
    issueDate: "2025-03-25",
    dueDate: "2025-04-25",
    status: "pending",
    plan: "Standard",
    billingAddress: "222 Counsel Court, Miami, FL 33101",
    items: [
      { description: "Standard Plan Monthly Subscription", amount: 699.00, quantity: 1 },
      { description: "Additional User Licenses (3)", amount: 50.00, quantity: 3 }
    ],
    subtotal: 849.00,
    tax: 0.00,
    total: 849.00,
    paymentMethod: "Credit Card",
    notes: "Thank you for your business"
  }
];

// Get invoices with filtering, sorting, and pagination
export const getMockInvoices = (params: InvoiceListParams): InvoiceListResponse => {
  let filteredInvoices = [...mockInvoices];
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredInvoices = filteredInvoices.filter(invoice => 
      invoice.id.toLowerCase().includes(searchLower) ||
      invoice.lawFirm.toLowerCase().includes(searchLower) ||
      invoice.plan.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply status filter
  if (params.status && params.status !== 'all') {
    filteredInvoices = filteredInvoices.filter(invoice => 
      invoice.status === params.status
    );
  }
  
  // Apply date range filter
  if (params.startDate) {
    filteredInvoices = filteredInvoices.filter(invoice => 
      new Date(invoice.issueDate) >= new Date(params.startDate!)
    );
  }
  
  if (params.endDate) {
    filteredInvoices = filteredInvoices.filter(invoice => 
      new Date(invoice.issueDate) <= new Date(params.endDate!)
    );
  }
  
  // Apply sorting
  if (params.sortBy) {
    filteredInvoices.sort((a, b) => {
      let valueA: any = a[params.sortBy as keyof Invoice];
      let valueB: any = b[params.sortBy as keyof Invoice];
      
      // Handle date comparison
      if (params.sortBy === 'issueDate' || params.sortBy === 'dueDate') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }
      
      if (params.sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }
  
  // Calculate pagination
  const total = filteredInvoices.length;
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedInvoices = filteredInvoices.slice(start, end);
  
  return {
    invoices: paginatedInvoices,
    total,
    page: params.page,
    pageSize: params.pageSize
  };
};

// Get a single invoice by ID
export const getMockInvoiceById = (id: string): Invoice | null => {
  return mockInvoices.find(invoice => invoice.id === id) || null;
};

// Update invoice status
export const updateMockInvoiceStatus = (id: string, status: 'paid' | 'pending' | 'overdue'): Invoice | null => {
  const invoiceIndex = mockInvoices.findIndex(invoice => invoice.id === id);
  
  if (invoiceIndex === -1) {
    return null;
  }
  
  mockInvoices[invoiceIndex] = {
    ...mockInvoices[invoiceIndex],
    status
  };
  
  return mockInvoices[invoiceIndex];
};

// Generate a new invoice
export const generateMockInvoice = (data: Partial<Invoice>): Invoice => {
  const newId = `INV-2025-${(mockInvoices.length + 1).toString().padStart(3, '0')}`;
  
  const newInvoice: Invoice = {
    id: newId,
    lawFirm: data.lawFirm || "New Law Firm",
    lawFirmId: data.lawFirmId || `firm-${mockInvoices.length + 1}`,
    amount: data.amount || 0,
    issueDate: data.issueDate || new Date().toISOString().split('T')[0],
    dueDate: data.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: data.status || 'pending',
    plan: data.plan || 'Basic',
    billingAddress: data.billingAddress || '',
    items: data.items || [],
    subtotal: data.subtotal || 0,
    tax: data.tax || 0,
    total: data.total || 0,
    paymentMethod: data.paymentMethod || '',
    notes: data.notes || ''
  };
  
  mockInvoices.push(newInvoice);
  return newInvoice;
};

// Send invoice reminder (mock)
export const sendMockInvoiceReminder = (id: string): { success: boolean; message: string } => {
  const invoice = mockInvoices.find(inv => inv.id === id);
  
  if (!invoice) {
    return {
      success: false,
      message: "Invoice not found"
    };
  }
  
  return {
    success: true,
    message: `Reminder sent successfully to ${invoice.lawFirm}`
  };
};
