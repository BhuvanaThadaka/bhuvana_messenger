
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { SubscriptionPlan, SubscriptionPlanFormData } from "@/types/lawFirm";
import { createSubscriptionPlan, updateSubscriptionPlan } from "@/redux/slices/planSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Plan name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  monthlyPrice: z.coerce.number().min(0, "Monthly price must be a positive number"),
  annualPrice: z.coerce.number().min(0, "Annual price must be a positive number"),
  trialDays: z.coerce.number().min(0, "Trial days must be a positive number"),
  billingCycle: z.enum(["monthly", "annual"]),
  maxUsers: z.coerce.number().min(1, "Maximum users must be at least 1"),
  features: z.array(z.string()).min(1, "Select at least one feature"),
  paymentMode: z.enum(["one-time", "recurring"]),
  isActive: z.boolean().default(true),
});

interface PlanFormProps {
  plan?: SubscriptionPlan;
  mode: "create" | "edit";
}

// Features available for subscription plans
const availableFeatures = [
  { id: "case-management", label: "Case Management" },
  { id: "document-storage", label: "Document Storage" },
  { id: "calendar-integration", label: "Calendar Integration" },
  { id: "client-portal", label: "Client Portal" },
  { id: "invoice-billing", label: "Invoice & Billing" },
  { id: "task-management", label: "Task Management" },
  { id: "reporting", label: "Reporting" },
  { id: "api-access", label: "API Access" },
  { id: "mobile-app", label: "Mobile App" },
];

const PlanForm = ({ plan, mode }: PlanFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing plan data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: plan?.name || "",
      description: plan?.description || "",
      monthlyPrice: plan?.monthlyPrice || 0,
      annualPrice: plan?.annualPrice || 0,
      trialDays: plan?.trialDays || 0,
      billingCycle: plan?.billingCycle || "monthly",
      maxUsers: plan?.maxUsers || 1,
      features: plan?.features || [],
      paymentMode: plan?.paymentMode || "recurring",
      isActive: plan?.isActive !== undefined ? plan.isActive : true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Create a proper SubscriptionPlanFormData object with all required fields
      const formData: SubscriptionPlanFormData = {
        name: values.name,
        description: values.description,
        monthlyPrice: values.monthlyPrice,
        annualPrice: values.annualPrice,
        trialDays: values.trialDays,
        billingCycle: values.billingCycle,
        maxUsers: values.maxUsers,
        features: values.features,
        paymentMode: values.paymentMode,
        isActive: values.isActive,
      };

      if (mode === "create") {
        await dispatch(createSubscriptionPlan(formData)).unwrap();
        navigate("/plans");
      } else if (mode === "edit" && plan) {
        await dispatch(updateSubscriptionPlan({ id: plan.id, data: formData })).unwrap();
        navigate("/plans");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Basic, Premium, Enterprise" {...field} />
                    </FormControl>
                    <FormDescription>Enter a unique and descriptive name for this plan</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Status</FormLabel>
                      <FormDescription>
                        Is this plan currently active and available for subscription?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the features and benefits of this plan" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>This description will be shown to users when selecting a plan</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Pricing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="monthlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingCycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Billing Cycle</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing cycle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Users will see this cycle by default</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trialDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trial Period (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormDescription>Set to 0 for no trial period</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Mode</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="one-time">One-time</SelectItem>
                        <SelectItem value="recurring">Recurring</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxUsers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Users</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1" {...field} />
                    </FormControl>
                    <FormDescription>Maximum number of users allowed</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Plan Features</h3>
            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Available Features</FormLabel>
                    <FormDescription>
                      Select the features included in this plan
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableFeatures.map((feature) => (
                      <FormField
                        key={feature.id}
                        control={form.control}
                        name="features"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={feature.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature.id)}
                                  onCheckedChange={(checked) => {
                                    const currentFeatures = field.value || [];
                                    return checked
                                      ? field.onChange([...currentFeatures, feature.id])
                                      : field.onChange(
                                          currentFeatures.filter((value) => value !== feature.id)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {feature.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/plans")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "create" ? "Create Plan" : "Update Plan"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PlanForm;
