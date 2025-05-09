
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LawFirmFormHeaderProps {
  mode: "create" | "edit" | "view";
  hasErrors: boolean;
}

const LawFirmFormHeader = ({ mode, hasErrors }: LawFirmFormHeaderProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">
        {mode === "view"
          ? "View Law Firm"
          : mode === "edit"
          ? "Edit Law Firm"
          : "Add Law Firm"}
      </h2>
      <p className="text-muted-foreground">
        {mode === "view"
          ? "View all details of the law firm"
          : mode === "edit"
          ? "Update law firm details"
          : "Add a new law firm to the platform"}
      </p>

      {hasErrors && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            Please fix the errors highlighted below before proceeding.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LawFirmFormHeader;
