
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, PlusCircle } from "lucide-react";
import { setSearch, setPage } from "@/redux/slices/invoice";
import { generateInvoice } from "@/services/invoice/invoiceService";
import { useToast } from "@/hooks/useToast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface InvoiceHeaderProps {
  search: string;
  isSuperAdmin: boolean;
}

export const InvoiceHeader = ({ search, isSuperAdmin }: InvoiceHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lawFirm, setLawFirm] = useState("Smith & Associates");
  const [lawFirmId, setLawFirmId] = useState("firm-001");
  const [amount, setAmount] = useState(1000);
  const [plan, setPlan] = useState("Standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    dispatch(setPage(1));
  };

  const handleGenerateInvoice = async () => {
    setIsSubmitting(true);
    try {
      // Calculate due date (30 days from now)
      const issueDate = new Date().toISOString().split('T')[0];
      const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      await generateInvoice({
        lawFirm,
        lawFirmId,
        amount,
        plan,
        issueDate,
        dueDate,
        status: 'pending',
        billingAddress: "123 Legal Avenue, Suite 500, New York, NY 10001",
        items: [
          { description: `${plan} Plan Subscription`, amount, quantity: 1 }
        ],
        subtotal: amount,
        tax: 0,
        total: amount,
        paymentMethod: "Credit Card",
        notes: "Thank you for your business"
      });
      
      // Close dialog and show success message
      setIsDialogOpen(false);
      toast({
        title: "Invoice Generated",
        description: `New invoice created for ${lawFirm}`,
      });
      
      // Refresh the invoice list
      dispatch(setPage(1));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 className="text-3xl font-bold tracking-tight">Invoice Management</h2>
      
      <div className="flex w-full sm:w-auto gap-2">
        <div className="relative w-full sm:w-auto">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="w-full sm:w-[250px] pl-8"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        
        {isSuperAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Generate Invoice</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate New Invoice</DialogTitle>
                <DialogDescription>
                  Create a new invoice for a law firm. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lawFirm" className="text-right">
                    Law Firm
                  </Label>
                  <Select 
                    value={lawFirm} 
                    onValueChange={(value) => {
                      setLawFirm(value);
                      // Set corresponding firm ID
                      if (value === "Smith & Associates") setLawFirmId("firm-001");
                      else if (value === "Legal Eagles LLP") setLawFirmId("firm-002");
                      else if (value === "Johnson Legal Group") setLawFirmId("firm-003");
                      else if (value === "Barrister & Partners") setLawFirmId("firm-004");
                      else if (value === "Matthews & Associates") setLawFirmId("firm-005");
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a law firm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Smith & Associates">Smith & Associates</SelectItem>
                      <SelectItem value="Legal Eagles LLP">Legal Eagles LLP</SelectItem>
                      <SelectItem value="Johnson Legal Group">Johnson Legal Group</SelectItem>
                      <SelectItem value="Barrister & Partners">Barrister & Partners</SelectItem>
                      <SelectItem value="Matthews & Associates">Matthews & Associates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan" className="text-right">
                    Plan
                  </Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic ($499/mo)</SelectItem>
                      <SelectItem value="Standard">Standard ($999/mo)</SelectItem>
                      <SelectItem value="Premium">Premium ($1499/mo)</SelectItem>
                      <SelectItem value="Enterprise">Enterprise ($2999/mo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount ($)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerateInvoice} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Generating..." : "Generate Invoice"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
