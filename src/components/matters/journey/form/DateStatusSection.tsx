
import React from "react";
import { DatePickerField } from "../DatePickerField";
import { StatusSelectField } from "../StatusSelectField";
import { UseFormReturn } from "react-hook-form";

interface DateStatusSectionProps {
  form: UseFormReturn<any>;
}

export const DateStatusSection: React.FC<DateStatusSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DatePickerField 
        form={form}
        name="date"
        label="Date"
        description="The date this entry occurred"
      />
      
      <StatusSelectField
        form={form}
        name="status"
        label="Status"
        description="Current status of this journey entry"
      />
    </div>
  );
};
