
import { LawFirmState } from "./types";

export const initialState: LawFirmState = {
  lawFirms: [],
  selectedLawFirm: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  countries: [],
  states: [],
  cities: [],
  plans: []
};
