
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import FormSection from "@/components/matters/form/FormSection";
import CustomFormField from "@/components/crud/FormField";
import DocumentUploadField from "@/components/matters/form/DocumentUploadField";

interface DetailsSectionProps {
  form: UseFormReturn<any>;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ form }) => {
  const { control, getValues, setValue, watch } = form;
  const documents = watch("documents") || [];

  const handleAddDocument = (file: File) => {
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    };

    const updatedDocuments = [...documents, newDocument];
    setValue("documents", updatedDocuments);
  };

  const handleRemoveDocument = (documentId: string) => {
    const updatedDocuments = documents.filter((doc: any) => doc.id !== documentId);
    setValue("documents", updatedDocuments);
  };

  return (
    <FormSection title="Additional Details" description="Notes and supporting documents">
      <div className="grid gap-6">
        <CustomFormField
          form={form}
          name="notes"
          label="Notes"
          description="Any additional information or notes about the case"
        >
          <Textarea placeholder="Enter notes here" className="min-h-[100px]" />
        </CustomFormField>

        <div>
          <DocumentUploadField
            label="Case Documents"
            description="Upload relevant case documents (max 10MB each)"
            files={documents}
            onAddFile={handleAddDocument}
            onRemoveFile={handleRemoveDocument}
            maxFileSizeMB={10}
          />
        </div>
      </div>
    </FormSection>
  );
};

export default DetailsSection;
