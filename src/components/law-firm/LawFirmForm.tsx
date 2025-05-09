
import React from "react";
import { FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";

// Import form steps
import BasicInfoStep from "./form-steps/BasicInfoStep";
import ContactDetailsStep from "./form-steps/ContactDetailsStep";
import AddressStep from "./form-steps/AddressStep";
import AdminSetupStep from "./form-steps/AdminSetupStep";
import FormStepIndicator from "./form-steps/FormStepIndicator";
import FormNavigation from "./form-steps/FormNavigation";
import LawFirmFormHeader from "./LawFirmFormHeader";

// Import custom hook for form logic
import { useLawFirmForm } from "@/hooks/law-firm/useLawFirmForm";
import { formSteps } from "@/hooks/law-firm/config/formSteps";

interface LawFirmFormProps {
  mode: "create" | "edit" | "view";
}

const LawFirmForm = ({ mode }: LawFirmFormProps) => {
  const {
    form,
    formState,
    isViewMode,
    isEditMode,
    loading,
    currentStep,
    countries,
    states,
    cities,
    plans,
    selectedLawFirm,
    registrationFile,
    logoFile,
    isSubmitting,
    handleNext,
    handlePrevious,
    onSubmit,
    handleFileChange,
    handleEditRedirect,
    id
  } = useLawFirmForm(mode);

  // Render loading state
  if (loading && (isEditMode || isViewMode) && !selectedLawFirm) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading law firm data...</span>
      </div>
    );
  }

  // Render the form
  return (
    <div className="space-y-6">
      {/* Header */}
      <LawFirmFormHeader 
        mode={mode} 
        hasErrors={Object.keys(formState.errors).length > 0} 
      />

      {/* Step Indicator */}
      <FormStepIndicator steps={formSteps} currentStep={currentStep} />

      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Step Content */}
            <div className="space-y-4 transition-all duration-300">
              {currentStep === 0 && (
                <BasicInfoStep
                  isViewMode={isViewMode}
                  selectedLawFirm={selectedLawFirm}
                  handleFileChange={handleFileChange}
                  registrationFile={registrationFile}
                />
              )}
              
              {currentStep === 1 && (
                <ContactDetailsStep
                  isViewMode={isViewMode}
                  selectedLawFirm={selectedLawFirm}
                  handleFileChange={handleFileChange}
                  logoFile={logoFile}
                />
              )}
              
              {currentStep === 2 && (
                <AddressStep
                  isViewMode={isViewMode}
                  countries={countries}
                  states={states}
                  cities={cities}
                />
              )}
              
              {currentStep === 3 && (
                <AdminSetupStep
                  isViewMode={isViewMode}
                  isEditMode={isEditMode}
                  plans={plans}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <FormNavigation
              currentStep={currentStep}
              totalSteps={formSteps.length}
              isViewMode={isViewMode}
              isEditMode={isEditMode}
              isSubmitting={isSubmitting}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              handleEdit={handleEditRedirect}
              id={id}
            />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default LawFirmForm;
