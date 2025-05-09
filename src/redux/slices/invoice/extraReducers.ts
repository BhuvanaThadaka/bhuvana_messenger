
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { InvoiceState } from './types';
import { 
  fetchInvoices, 
  fetchInvoiceById, 
  updateInvoiceStatusThunk, 
  sendInvoiceReminderThunk,
  generateInvoiceThunk
} from './thunks';

export const buildExtraReducers = (builder: ActionReducerMapBuilder<InvoiceState>) => {
  // Fetch Invoices
  builder.addCase(fetchInvoices.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchInvoices.fulfilled, (state, action) => {
    state.loading = false;
    state.invoices = action.payload.invoices || [];
    state.total = action.payload.total;
    state.page = action.payload.page;
    state.pageSize = action.payload.pageSize;
  });
  builder.addCase(fetchInvoices.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.invoices = []; // Ensure invoices is at least an empty array on error
  });

  // Fetch Invoice By ID
  builder.addCase(fetchInvoiceById.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(fetchInvoiceById.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedInvoice = action.payload;
  });
  builder.addCase(fetchInvoiceById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });

  // Update Invoice Status
  builder.addCase(updateInvoiceStatusThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(updateInvoiceStatusThunk.fulfilled, (state, action) => {
    state.loading = false;
    const updatedInvoice = action.payload;
    // Update both the selected invoice and the invoice in the list
    if (state.selectedInvoice && state.selectedInvoice.id === updatedInvoice.id) {
      state.selectedInvoice = updatedInvoice;
    }
    const index = state.invoices.findIndex(invoice => invoice.id === updatedInvoice.id);
    if (index !== -1) {
      state.invoices[index] = updatedInvoice;
    }
  });
  builder.addCase(updateInvoiceStatusThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });

  // Send Invoice Reminder
  builder.addCase(sendInvoiceReminderThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(sendInvoiceReminderThunk.fulfilled, (state) => {
    state.loading = false;
  });
  builder.addCase(sendInvoiceReminderThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
  
  // Generate Invoice
  builder.addCase(generateInvoiceThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(generateInvoiceThunk.fulfilled, (state, action) => {
    state.loading = false;
    // We don't need to update the invoices array here since fetchInvoices will be called after generation
  });
  builder.addCase(generateInvoiceThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};
