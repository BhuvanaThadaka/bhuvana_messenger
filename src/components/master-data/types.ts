
import { z } from "zod";

// Court form schema
export const courtFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  type: z.string().min(1, { message: "Type is required" }),
});

export type CourtFormValues = z.infer<typeof courtFormSchema>;

// Law Type form schema
export const lawTypeFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
});

export type LawTypeFormValues = z.infer<typeof lawTypeFormSchema>;

// Client form schema
export const clientFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  type: z.enum(["Corporate", "Individual"]),
  industry: z.string().min(1, { message: "Industry is required" }).or(z.literal("N/A")),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;

export const courtTypes = ["Federal", "State", "Specialized", "Administrative", "International"];

export const clientTypes = ["Corporate", "Individual"];

export const industries = [
  "Banking & Finance",
  "Construction",
  "Education",
  "Energy",
  "Entertainment",
  "Healthcare",
  "Hospitality",
  "Information Technology",
  "Manufacturing",
  "Media",
  "Real Estate",
  "Retail",
  "Services",
  "Technology",
  "Telecommunications",
  "Transportation",
  "N/A"
];
