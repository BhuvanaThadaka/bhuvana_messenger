
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: "Open" | "Pending" | "Closed";
  onStatusChange: (status: "Open" | "Pending" | "Closed") => void;
  onConfirm: () => void;
}

const UpdateStatusDialog = ({
  open,
  onOpenChange,
  status,
  onStatusChange,
  onConfirm,
}: UpdateStatusDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Case Status</DialogTitle>
          <DialogDescription>
            Choose a new status for this case.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select
            value={status}
            onValueChange={(value: "Open" | "Pending" | "Closed") => onStatusChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusDialog;
