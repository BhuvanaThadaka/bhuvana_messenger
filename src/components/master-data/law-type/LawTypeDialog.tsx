import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LawTypeForm from "./LawTypeForm";
import { LawTypeFormValues } from "../types";
import { LawTypeData } from "@/services/master-data";

interface LawTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LawTypeFormValues) => Promise<void>;
  lawType?: LawTypeData;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const LawTypeDialog: React.FC<LawTypeDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lawType,
  isSubmitting,
  mode,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Law Type" : "Edit Law Type"}
          </DialogTitle>
        </DialogHeader>
        <LawTypeForm
          defaultValues={lawType}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LawTypeDialog;
