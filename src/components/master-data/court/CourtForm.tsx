
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
import { CourtFormValues, courtFormSchema, courtTypes } from "../types";
import { CourtData } from "@/services/master-data";
import { Loader2 } from "lucide-react";

interface CourtFormProps {
  defaultValues?: CourtData;
  onSubmit: (data: CourtFormValues) => Promise<void>;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const CourtForm: React.FC<CourtFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  mode,
}) => {
  const form = useForm<CourtFormValues>({
    resolver: zodResolver(courtFormSchema),
    defaultValues: defaultValues || {
      name: "",
      location: "",
      type: "",
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
              <FormLabel>Court Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter court name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
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
              <FormLabel>Court Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select court type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courtTypes.map((type) => (
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

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <span className="opacity-0">
                  {mode === "create" ? "Create Court" : "Update Court"}
                </span>
                <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin" />
              </>
            ) : mode === "create" ? (
              "Create Court"
            ) : (
              "Update Court"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourtForm;
