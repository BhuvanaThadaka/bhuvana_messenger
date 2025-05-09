
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
import { Check } from "lucide-react";
import { LawFirmFormData } from "@/types/lawFirm";

interface ContactDetailsStepProps {
  isViewMode: boolean;
  selectedLawFirm?: any;
  handleFileChange: (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  logoFile: File | null;
}

const ContactDetailsStep = ({ 
  isViewMode, 
  selectedLawFirm,
  handleFileChange,
  logoFile 
}: ContactDetailsStepProps) => {
  const { control } = useFormContext<LawFirmFormData>();

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange('logoFile', e);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="primaryContactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Contact Name*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter primary contact name" 
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
          name="primaryContactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Contact Number*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter primary contact number" 
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
          name="alternativeEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter alternative email (optional)" 
                  {...field}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="alternativeNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter alternative number (optional)" 
                  {...field}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firm Website URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://yourfirmwebsite.com" 
                  {...field}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormItem>
          <FormLabel>Law Firm Logo</FormLabel>
          <FormControl>
            <Input 
              type="file" 
              onChange={handleLogoFileChange}
              disabled={isViewMode}
              accept=".jpg,.jpeg,.png,.svg"
            />
          </FormControl>
          <FormDescription>Upload your firm logo (max 2MB)</FormDescription>
        </FormItem>
      </div>
      
      {logoFile && (
        <div className="mt-2 text-sm text-green-600 flex items-center">
          <Check className="mr-1 h-4 w-4" />
          Logo selected: {logoFile.name}
        </div>
      )}
      
      {isViewMode && selectedLawFirm?.logoUrl && (
        <div className="mt-4 flex justify-start">
          <div className="w-32 h-32 rounded-md overflow-hidden border">
            <img 
              src={selectedLawFirm.logoUrl} 
              alt="Law firm logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetailsStep;
