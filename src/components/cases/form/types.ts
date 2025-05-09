
import { z } from "zod";

// Define the schema for form validation
export const caseFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  client: z.string().min(1, { message: "Client is required" }),
  clientId: z.string().min(1, { message: "Client ID is required" }),
  status: z.enum(["Open", "Closed", "Pending", "Draft"]),
  priority: z.enum(["High", "Medium", "Low"]),
  type: z.string().min(1, { message: "Case type is required" }),
  assignedTo: z.string().min(1, { message: "Assigned user is required" }),
  assignedUserId: z.string().min(1, { message: "Assigned user ID is required" }),
  description: z.string().optional(),
  court: z.string().min(1, { message: "Court is required" }),
  filingDate: z.date().optional(),
  hearingDate: z.date().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional()
});

// Define the form values type from the schema
export type CaseFormValues = z.infer<typeof caseFormSchema>;

// Define the form data type (different from form values - dates are strings)
export interface CaseFormData {
  title: string;
  client: string;
  clientId: string;
  status: "Open" | "Closed" | "Pending" | "Draft";
  priority: "High" | "Medium" | "Low";
  type: string;
  assignedTo: string;
  assignedUserId: string;
  description?: string;
  court: string;
  filingDate?: string;
  hearingDate?: string;
  notes?: string;
  tags?: string[];
}

export interface CaseFormProps {
  mode: "create" | "edit";
}

// Default values for the form
export const getDefaultValues = (): CaseFormValues => ({
  title: "",
  client: "",
  clientId: "",
  status: "Draft",
  priority: "Medium",
  type: "",
  assignedTo: "",
  assignedUserId: "",
  description: "",
  court: "",
  filingDate: undefined,
  hearingDate: undefined,
  notes: "",
  tags: []
});
