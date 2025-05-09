
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isViewMode: boolean;
  isEditMode: boolean;
  isSubmitting: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  handleEdit?: () => void;
  id?: string;
}

const FormNavigation = ({
  currentStep,
  totalSteps,
  isViewMode,
  isEditMode,
  isSubmitting,
  handlePrevious,
  handleNext,
  handleEdit,
  id
}: FormNavigationProps) => {
  return (
    <div className="flex justify-between pt-4 mt-8 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 0 || isViewMode}
        className="flex items-center"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex gap-2">
        {isViewMode && handleEdit && id && (
          <Button 
            type="button" 
            onClick={handleEdit}
          >
            Edit Law Firm
          </Button>
        )}
        
        {currentStep < totalSteps - 1 ? (
          <Button 
            type="button" 
            onClick={handleNext}
            disabled={isViewMode}
            className="flex items-center"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isViewMode || isSubmitting}
            className="flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Create Law Firm"}
              </>
            ) : (
              isEditMode ? "Update Law Firm" : "Create Law Firm"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
