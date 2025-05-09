
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface TitleFieldProps {
  form: UseFormReturn<any>;
}

export const TitleField: React.FC<TitleFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter a title for this journey entry" {...field} />
          </FormControl>
          <FormDescription>
            A concise title describing this stage of the case
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
