
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LawTypeFormValues, lawTypeFormSchema } from "../types";
import { LawTypeData } from "@/services/master-data";
import { Loader2 } from "lucide-react";

interface LawTypeFormProps {
  defaultValues?: LawTypeData;
  onSubmit: (data: LawTypeFormValues) => Promise<void>;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const LawTypeForm: React.FC<LawTypeFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  mode,
}) => {
  const form = useForm<LawTypeFormValues>({
    resolver: zodResolver(lawTypeFormSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Law Type Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter law type name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter a detailed description" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <span className="opacity-0">
                  {mode === "create" ? "Create Law Type" : "Update Law Type"}
                </span>
                <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin" />
              </>
            ) : mode === "create" ? (
              "Create Law Type"
            ) : (
              "Update Law Type"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LawTypeForm;
