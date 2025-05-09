
import React, { useState } from "react";
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
import { Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { LawFirmFormData } from "@/types/lawFirm";

interface BasicInfoStepProps {
  isViewMode: boolean;
  selectedLawFirm?: any;
  handleFileChange: (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  registrationFile: File | null;
}

const BasicInfoStep = ({ 
  isViewMode, 
  selectedLawFirm, 
  handleFileChange,
  registrationFile 
}: BasicInfoStepProps) => {
  const { control } = useFormContext<LawFirmFormData>();

  const handleRegistrationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange('registrationFile', e);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Law Firm Name*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter law firm name" 
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
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter registration number" 
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
          name="firmType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Law Firm Type*</FormLabel>
              <Select 
                disabled={isViewMode}
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select firm type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LLP">LLP</SelectItem>
                  <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax ID*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter tax ID" 
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
          name="barAssociation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bar Association</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter bar association (optional)" 
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
          name="establishmentYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Establishment Year*</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter year" 
                  {...field}
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="mt-4">
        <FormItem>
          <FormLabel>Registration Certificate</FormLabel>
          <FormControl>
            <Input 
              type="file" 
              onChange={handleRegistrationFileChange}
              disabled={isViewMode}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </FormControl>
          <FormDescription>Upload PDF or image file (max 5MB)</FormDescription>
        </FormItem>
        
        {registrationFile && (
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <Check className="mr-1 h-4 w-4" />
            File selected: {registrationFile.name}
          </div>
        )}
        
        {isViewMode && selectedLawFirm?.registrationCertificateUrl && (
          <div className="mt-2">
            <a 
              href={selectedLawFirm.registrationCertificateUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <span>View Registration Certificate</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;
