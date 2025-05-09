
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TitleField } from "./form/TitleField";
import { DescriptionField } from "./form/DescriptionField";
import { DateStatusSection } from "./form/DateStatusSection";
import { FormActions } from "./form/FormActions";
import { JourneyStatus } from "@/types/caseJourney";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  status: z.enum(["completed", "in-progress", "pending", "adjourned", "cancelled"] as const),
  date: z.date()
});

export type JourneyFormData = z.infer<typeof formSchema>;

export interface JourneyFormProps {
  onSubmit: (data: JourneyFormData) => void;
  onCancel: () => void;
  isEdit: boolean;
  initialData?: Partial<JourneyFormData>;
}

const JourneyForm: React.FC<JourneyFormProps> = ({ 
  onSubmit, 
  onCancel,
  isEdit = false,
  initialData 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Parse the date string to Date object if it exists
  const parsedInitialData = initialData ? {
    ...initialData,
    date: initialData.date ? new Date(initialData.date as any) : undefined
  } : undefined;
  
  const form = useForm<JourneyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: parsedInitialData || {
      title: "",
      description: "",
      status: "pending" as JourneyStatus,
      date: new Date()
    }
  });
  
  const handleFormSubmit = async (data: JourneyFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <TitleField form={form} />
        
        <DescriptionField form={form} />
        
        <DateStatusSection form={form} />
        
        <FormActions 
          isSubmitting={isSubmitting} 
          isEdit={isEdit}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
};

export default JourneyForm;
