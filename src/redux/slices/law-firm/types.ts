
import { LawFirm, LawFirmFormData, LawFirmListParams } from "@/types/lawFirm";

export interface LawFirmState {
  lawFirms: LawFirm[];
  selectedLawFirm: LawFirm | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  countries: {id: string, name: string}[];
  states: {id: string, name: string}[];
  cities: {id: string, name: string}[];
  plans: {id: string, name: string, description: string, price: number}[];
}

export type UpdateLawFirmPayload = {
  id: string;
  data: Partial<LawFirmFormData>;
};

export type ToggleStatusPayload = {
  id: string;
  isActive: boolean;
};
