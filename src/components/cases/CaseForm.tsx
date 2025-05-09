
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useFormData } from "./form/useFormData";
import BasicInfoSection from "./form/BasicInfoSection";
import StatusSection from "./form/StatusSection";
import CourtDateSection from "./form/CourtDateSection";
import DetailsSection from "./form/DetailsSection";
import SuccessDialog from "./form/SuccessDialog";
import LoadingIndicator from "./form/LoadingIndicator";
import FormActions from "./form/FormActions";
import { CaseFormProps } from "./form/types";

const CaseForm: React.FC<CaseFormProps> = ({ mode }) => {
  const {
    form,
    loading,
    saving,
    showSuccessDialog,
    setShowSuccessDialog,
    onSubmit,
    handleSuccessDialogClose,
    navigate
  } = useFormData(mode);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {mode === "create" ? "Create New Case" : "Edit Case"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <BasicInfoSection form={form} />
              <StatusSection form={form} />
              <CourtDateSection form={form} />
              <DetailsSection form={form} />
              <CardFooter className="flex justify-between pt-6 px-0">
                <FormActions 
                  mode={mode} 
                  saving={saving} 
                  onCancel={() => navigate('/cases')} 
                />
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        mode={mode}
        onClose={handleSuccessDialogClose}
      />
    </>
  );
};

export default CaseForm;
