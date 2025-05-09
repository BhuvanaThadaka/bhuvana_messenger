
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface DescriptionFieldProps {
  form: UseFormReturn<any>;
}

export const DescriptionField: React.FC<DescriptionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Provide details about this journey entry" 
              {...field} 
              rows={4}
            />
          </FormControl>
          <FormDescription>
            Detailed description of what happened at this stage
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
