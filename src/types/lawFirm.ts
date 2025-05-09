export interface LawFirm {
  id: string;
  name: string;
  firmCode?: string;
  registrationNumber: string;
  firmType: string;
  taxId: string;
  gstNumber?: string;
  panNumber?: string;
  cinNumber?: string;
  barAssociation?: string;
  establishmentYear: number;
  registrationCertificateUrl?: string;
  primaryContactName: string;
  primaryContactNumber: string;
  alternativeEmail?: string;
  alternativeNumber?: string;
  country: string;
  state: string;
  city: string;
  officeAddress: string;
  zipCode: string;
  website?: string;
  logoUrl?: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  plan: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LawFirmFormData {
  name: string;
  firmCode?: string;
  registrationNumber: string;
  firmType: string;
  taxId: string;
  gstNumber?: string;
  panNumber?: string;
  cinNumber?: string;
  barAssociation?: string;
  establishmentYear: number;
  registrationCertificate?: File;
  primaryContactName: string;
  primaryContactNumber: string;
  alternativeEmail?: string;
  alternativeNumber?: string;
  country: string;
  state: string;
  city: string;
  officeAddress: string;
  zipCode: string;
  website?: string;
  logo?: File;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  plan: string;
}

export interface LawFirmListParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  trialDays: number;
  billingCycle: 'monthly' | 'annual';
  maxUsers: number;
  features: string[];
  paymentMode: 'one-time' | 'recurring';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlanFormData {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  trialDays: number;
  billingCycle: 'monthly' | 'annual';
  maxUsers: number;
  features: string[];
  paymentMode: 'one-time' | 'recurring';
  isActive: boolean;
}

export interface SubscriptionPlanListParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}
