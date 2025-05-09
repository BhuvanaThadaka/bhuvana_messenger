
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LawFirmFormData } from "@/types/lawFirm";

interface AdminSetupStepProps {
  isViewMode: boolean;
  isEditMode: boolean;
  plans: { id: string; name: string; price: number; }[];
}

const AdminSetupStep = ({ 
  isViewMode, 
  isEditMode, 
  plans 
}: AdminSetupStepProps) => {
  const { control } = useFormContext<LawFirmFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="adminName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Name*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter admin name" 
                  {...field}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormDescription>This person will be the primary administrator</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="adminEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Email*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter admin email" 
                  {...field}
                  disabled={isViewMode || isEditMode}
                />
              </FormControl>
              <FormDescription>
                {isEditMode && "Admin email cannot be changed"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="adminPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Phone Number*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter admin phone number" 
                  {...field}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Selection*</FormLabel>
              <Select
                disabled={isViewMode}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} (${plan.price}/month)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose a subscription plan for this law firm</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-md font-medium text-blue-800 mb-2">Ready to Submit?</h3>
        <p className="text-sm text-blue-700">
          Please review all information before submitting. Once submitted, you'll be able to make changes 
          through the edit function.
        </p>
      </div>
    </div>
  );
};

export default AdminSetupStep;
