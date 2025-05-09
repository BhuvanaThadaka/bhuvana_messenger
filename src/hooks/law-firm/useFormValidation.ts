
import { UseFormReturn } from "react-hook-form";
import { LawFirmFormData } from "@/types/lawFirm";
import { toast } from "@/hooks/use-toast";

export const useFormValidation = (form: UseFormReturn<LawFirmFormData>) => {
  const validateCurrentStep = async (currentStep: number) => {
    try {
      let isValid = false;
      
      switch (currentStep) {
        case 0: // Basic Information
          isValid = await form.trigger([
            "name", 
            "registrationNumber", 
            "firmType", 
            "taxId", 
            "establishmentYear",
            "barAssociation"
          ]);
          break;
        case 1: // Contact Details
          isValid = await form.trigger([
            "primaryContactName", 
            "primaryContactNumber", 
            "alternativeEmail", 
            "alternativeNumber",
            "website"
          ]);
          break;
        case 2: // Address
          isValid = await form.trigger([
            "country", 
            "state", 
            "city", 
            "officeAddress", 
            "zipCode"
          ]);
          break;
        case 3: // Admin Setup
          isValid = await form.trigger([
            "adminName", 
            "adminEmail", 
            "adminPhone", 
            "plan"
          ]);
          break;
        default:
          isValid = false;
      }
      
      return isValid;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  return {
    validateCurrentStep
  };
};

