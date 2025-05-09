
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LegalCase } from "@/types/matter";

interface DeleteMatterDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCase: LegalCase | null;
  onDelete: () => void;
}

const DeleteMatterDialog: React.FC<DeleteMatterDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedCase,
  onDelete
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Case</DialogTitle>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertDescription>
            Are you sure you want to delete "{selectedCase?.caseTitle}" (#{selectedCase?.caseNumber})?
            This action cannot be undone.
          </AlertDescription>
        </Alert>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMatterDialog;
