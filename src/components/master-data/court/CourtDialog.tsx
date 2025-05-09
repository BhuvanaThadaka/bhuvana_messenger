
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CourtForm from "./CourtForm";
import { CourtFormValues } from "../types";
import { CourtData } from "@/services/master-data";

interface CourtDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CourtFormValues) => Promise<void>;
  court?: CourtData;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const CourtDialog: React.FC<CourtDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  court,
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
                Add New Court
              </span>
            ) : (
              <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                Edit Court
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <CourtForm
          defaultValues={court}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CourtDialog;
