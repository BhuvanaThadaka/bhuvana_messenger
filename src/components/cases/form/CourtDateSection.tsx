
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "@/components/matters/form/FormSection";
import CustomFormField from "@/components/crud/FormField";
import { DatePicker } from "@/components/ui/date-picker";

interface CourtDateSectionProps {
  form: UseFormReturn<any>;
}

const CourtDateSection: React.FC<CourtDateSectionProps> = ({ form }) => {
  const { control, getValues, setValue } = form;

  return (
    <FormSection title="Court & Date Information" description="Court details and important dates">
      <div className="grid gap-4 sm:grid-cols-2">
        <CustomFormField
          form={form}
          name="court"
          label="Court"
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select court" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Supreme Court">Supreme Court</SelectItem>
              <SelectItem value="High Court">High Court</SelectItem>
              <SelectItem value="District Court">District Court</SelectItem>
              <SelectItem value="Federal Court">Federal Court</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </CustomFormField>

        <CustomFormField
          form={form}
          name="caseNumber"
          label="Case Number"
          description="Court reference number"
        >
          <Input placeholder="e.g. CR-2025-1234" />
        </CustomFormField>

        <CustomFormField
          form={form}
          name="judge"
          label="Judge"
          description="Assigned judge (if known)"
        >
          <Input placeholder="Judge name" />
        </CustomFormField>

        <CustomFormField
          form={form}
          name="filingDate"
          label="Filing Date"
        >
          <DatePicker
            date={getValues("filingDate") ? new Date(getValues("filingDate")) : undefined}
            onSelect={(date) => setValue("filingDate", date?.toISOString())}
            id="filing-date"
          />
        </CustomFormField>

        <CustomFormField
          form={form}
          name="hearingDate"
          label="Hearing Date"
        >
          <DatePicker
            date={getValues("hearingDate") ? new Date(getValues("hearingDate")) : undefined}
            onSelect={(date) => setValue("hearingDate", date?.toISOString())}
            id="hearing-date"
          />
        </CustomFormField>
      </div>
    </FormSection>
  );
};

export default CourtDateSection;
