
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "@/components/matters/form/FormSection";
import CustomFormField from "@/components/crud/FormField";

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
}

const caseTypes = [
  "Contract",
  "Intellectual Property",
  "Employment",
  "Corporate",
  "Real Estate",
  "Tax",
  "Compliance",
  "Other"
];

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ form }) => {
  return (
    <FormSection title="Basic Information" description="Enter the basic details of the case">
      <div className="grid gap-4 sm:grid-cols-2">
        <CustomFormField
          form={form}
          name="title"
          label="Case Title"
          description="Enter a descriptive title for this case"
        >
          <Input placeholder="e.g. Contract Dispute - ABC Corp" />
        </CustomFormField>

        <CustomFormField
          form={form}
          name="type"
          label="Case Type"
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              {caseTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CustomFormField>

        <CustomFormField
          form={form}
          name="client"
          label="Client Name"
        >
          <Input placeholder="Client name" />
        </CustomFormField>

        <CustomFormField
          form={form}
          name="clientId"
          label="Client ID"
          description="Client reference number"
        >
          <Input placeholder="Optional" />
        </CustomFormField>

        <div className="sm:col-span-2">
          <CustomFormField
            form={form}
            name="description"
            label="Case Description"
            description="Briefly describe the case"
          >
            <Textarea placeholder="Enter case description" className="min-h-[100px]" />
          </CustomFormField>
        </div>
      </div>
    </FormSection>
  );
};

export default BasicInfoSection;
