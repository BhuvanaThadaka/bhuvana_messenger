
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClientForm from "./ClientForm";
import { ClientFormValues } from "../types";
import { ClientData } from "@/services/master-data";

interface ClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormValues) => Promise<void>;
  client?: ClientData;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const ClientDialog: React.FC<ClientDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  client,
  isSubmitting,
  mode,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-lg border-t-4 border-t-primary shadow-lg animate-in fade-in-80 duration-300">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? (
              <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                Add New Client
              </span>
            ) : (
              <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                Edit Client
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <ClientForm
          defaultValues={client}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ClientDialog;
