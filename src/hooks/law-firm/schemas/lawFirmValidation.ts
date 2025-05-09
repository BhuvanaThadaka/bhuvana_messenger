
import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  registrationNumber: z.string().min(2, "Registration number is required"),
  firmType: z.string().min(1, "Firm type is required"),
  taxId: z.string().min(2, "Tax ID is required"),
  establishmentYear: z.coerce
    .number()
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear(), `Year cannot be later than ${new Date().getFullYear()}`),
  barAssociation: z.string().optional(),
});

export const contactSchema = z.object({
  primaryContactName: z.string().min(2, "Primary contact name is required"),
  primaryContactNumber: z.string().min(6, "Valid phone number is required"),
  alternativeEmail: z.string().email().optional().or(z.literal("")),
  alternativeNumber: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
});

export const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  officeAddress: z.string().min(5, "Office address is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
});

export const adminSchema = z.object({
  adminName: z.string().min(2, "Admin name is required"),
  adminEmail: z.string().email("Valid email is required"),
  adminPhone: z.string().min(6, "Valid phone number is required"),
  plan: z.string().min(1, "Plan selection is required"),
});

export const formSchema = basicInfoSchema.merge(contactSchema).merge(addressSchema).merge(adminSchema);

