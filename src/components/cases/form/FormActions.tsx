
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, SaveAll, X } from "lucide-react";

interface FormActionsProps {
  mode: "create" | "edit";
  saving: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ mode, saving, onCancel }) => {
  return (
    <div className="flex justify-between pt-6 px-0">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        <X className="mr-2 h-4 w-4" />
        Cancel
      </Button>
      <Button type="submit" disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <SaveAll className="mr-2 h-4 w-4" />
            {mode === "create" ? "Create Case" : "Update Case"}
          </>
        )}
      </Button>
    </div>
  );
};

export default FormActions;
