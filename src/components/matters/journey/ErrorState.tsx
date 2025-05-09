
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string | null;
  backUrl?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  error, 
  backUrl = "/case-journey" 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="mb-2 text-center text-lg font-medium">Error Loading Data</h3>
      <p className="mb-6 text-center text-gray-500 md:text-lg">
        {error || "There was an error loading the requested data."}
      </p>
      <Button
        onClick={() => navigate(backUrl)}
        variant="default"
      >
        Go Back
      </Button>
    </div>
  );
};

export default ErrorState;
