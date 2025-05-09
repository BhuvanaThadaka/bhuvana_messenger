
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientFormValues, clientFormSchema, clientTypes, industries } from "../types";
import { ClientData } from "@/services/master-data";
import { Loader2 } from "lucide-react";

interface ClientFormProps {
  defaultValues?: ClientData;
  onSubmit: (data: ClientFormValues) => Promise<void>;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const ClientForm: React.FC<ClientFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  mode,
}) => {
  // Create form default values that match the expected type
  const formDefaultValues: ClientFormValues = defaultValues 
    ? {
        // Cast string type to the specific union type expected by the form
        name: defaultValues.name,
        type: defaultValues.type as "Corporate" | "Individual",
        industry: defaultValues.industry
      }
    : {
        name: "",
        type: "Corporate",
        industry: "",
      };

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: formDefaultValues,
  });

  // Show N/A for industry only when Individual is selected
  const watchType = form.watch("type");

  React.useEffect(() => {
    if (watchType === "Individual") {
      form.setValue("industry", "N/A");
    } else if (form.getValues("industry") === "N/A") {
      form.setValue("industry", "");
    }
  }, [watchType, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter client name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={watchType === "Individual"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries
                    .filter(industry => watchType === "Individual" ? industry === "N/A" : industry !== "N/A")
                    .map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
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
                  {mode === "create" ? "Create Client" : "Update Client"}
                </span>
                <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin" />
              </>
            ) : mode === "create" ? (
              "Create Client"
            ) : (
              "Update Client"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
