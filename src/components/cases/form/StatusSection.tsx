
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "@/components/matters/form/FormSection";
import CustomFormField from "@/components/crud/FormField";

interface StatusSectionProps {
  form: UseFormReturn<any>;
}

const StatusSection: React.FC<StatusSectionProps> = ({ form }) => {
  return (
    <FormSection title="Status & Priority" description="Set the current status and priority level">
      <div className="grid gap-4 sm:grid-cols-2">
        <CustomFormField
          form={form}
          name="status"
          label="Status"
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </CustomFormField>

        <CustomFormField
          form={form}
          name="priority"
          label="Priority"
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </CustomFormField>

        <CustomFormField
          form={form}
          name="assignedTo"
          label="Assigned To"
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="John Doe">John Doe</SelectItem>
              <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
              <SelectItem value="Mark Williams">Mark Williams</SelectItem>
            </SelectContent>
          </Select>
        </CustomFormField>
      </div>
    </FormSection>
  );
};

export default StatusSection;
