
// LawFirm types file to export the necessary types for tests and components

export interface LawFirmListParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface LawFirmFormData {
  name: string;
  firmCode: string;
  registrationNumber: string;
  firmType: string;
  taxId: string;
  establishmentYear: number;
  primaryContactName: string;
  primaryContactNumber: string;
  country: string;
  state: string;
  city: string;
  officeAddress: string;
  zipCode: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  plan: string;
}

export interface LawFirm {
  id: string;
  name: string;
  firmCode: string;
  registrationNumber: string;
  firmType: string;
  taxId: string;
  establishmentYear: number;
  primaryContactName: string;
  primaryContactNumber: string;
  country: string;
  state: string;
  city: string;
  officeAddress: string;
  zipCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  plan: string;
}

// Add the missing LawFirmListResponse interface
export interface LawFirmListResponse {
  firms: LawFirm[];
  total: number;
  page: number;
  pageSize: number;
}
