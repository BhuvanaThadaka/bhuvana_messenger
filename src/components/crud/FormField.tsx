
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface CustomFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description?: string;
  children: React.ReactNode;
}

const CustomFormField = ({
  form,
  name,
  label,
  description,
  children,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{React.cloneElement(children as React.ReactElement, { ...field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
