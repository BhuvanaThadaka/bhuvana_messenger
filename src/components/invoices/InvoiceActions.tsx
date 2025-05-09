
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Invoice } from "@/services/invoice/invoiceService";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Printer, 
  MoreHorizontal, 
  Mail, 
  Check, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { updateInvoiceStatusThunk, sendInvoiceReminderThunk } from "@/redux/slices/invoice";
import { useToast } from "@/hooks/useToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface InvoiceActionsProps {
  invoice: Invoice;
  isSuperAdmin: boolean;
}

export const InvoiceActions = ({ invoice, isSuperAdmin }: InvoiceActionsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const handleUpdateStatus = (invoiceId: string, newStatus: 'paid' | 'pending' | 'overdue') => {
    dispatch(updateInvoiceStatusThunk({ invoiceId, status: newStatus }))
      .unwrap()
      .then(() => {
        toast({
          title: "Status Updated",
          description: `Invoice status changed to ${newStatus}`,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: typeof error === 'string' ? error : "Failed to update status",
          variant: "destructive",
        });
      });
  };

  const handleSendReminder = (invoiceId: string) => {
    dispatch(sendInvoiceReminderThunk(invoiceId))
      .unwrap()
      .then(() => {
        toast({
          title: "Reminder Sent",
          description: "Payment reminder email has been sent successfully",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: typeof error === 'string' ? error : "Failed to send reminder",
          variant: "destructive",
        });
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FileText className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </DropdownMenuItem>
        
        {isSuperAdmin && (
          <>
            <DropdownMenuSeparator />
            {invoice.status !== 'paid' && (
              <DropdownMenuItem onClick={() => handleUpdateStatus(invoice.id, 'paid')}>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Mark as Paid
              </DropdownMenuItem>
            )}
            {invoice.status !== 'pending' && (
              <DropdownMenuItem onClick={() => handleUpdateStatus(invoice.id, 'pending')}>
                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                Mark as Pending
              </DropdownMenuItem>
            )}
            {invoice.status !== 'overdue' && (
              <DropdownMenuItem onClick={() => handleUpdateStatus(invoice.id, 'overdue')}>
                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                Mark as Overdue
              </DropdownMenuItem>
            )}
            {invoice.status === 'pending' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Mail className="mr-2 h-4 w-4 text-blue-500" />
                    Send Reminder
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Send Payment Reminder</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will send an email reminder to {invoice.lawFirm} regarding their pending invoice.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleSendReminder(invoice.id)}
                    >
                      Send Reminder
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
