
import { apiClient } from '../apiService';
import { ENDPOINTS } from '../endpoints';
import { LawFirm, LawFirmListParams, LawFirmListResponse, LawFirmFormData } from './lawFirmTypes';

export const getLawFirms = async (params: LawFirmListParams): Promise<LawFirmListResponse> => {
  const response = await apiClient.get<LawFirmListResponse>(ENDPOINTS.LAW_FIRM.LIST, { params });
  return response.data;
};

export const getLawFirmById = async (firmId: string): Promise<LawFirm> => {
  const response = await apiClient.get<LawFirm>(ENDPOINTS.LAW_FIRM.DETAILS(firmId));
  return response.data;
};

export const createLawFirm = async (firmData: LawFirmFormData): Promise<LawFirm> => {
  const response = await apiClient.post<LawFirm>(ENDPOINTS.LAW_FIRM.CREATE, firmData);
  return response.data;
};

export const updateLawFirm = async (
  firmId: string,
  updateData: Partial<LawFirmFormData>
): Promise<LawFirm> => {
  const response = await apiClient.put<LawFirm>(ENDPOINTS.LAW_FIRM.UPDATE(firmId), updateData);
  return response.data;
};

export const deleteLawFirm = async (firmId: string): Promise<string> => {
  await apiClient.delete(ENDPOINTS.LAW_FIRM.DELETE(firmId));
  return firmId;
};

export const toggleLawFirmStatus = async (
  firmId: string,
  isActive: boolean
): Promise<LawFirm> => {
  const response = await apiClient.put<LawFirm>(ENDPOINTS.LAW_FIRM.TOGGLE_STATUS(firmId), { isActive });
  return response.data;
};

// Location data retrieval for law firm forms
export const getCountries = async (): Promise<any[]> => {
  const response = await apiClient.get<any[]>(ENDPOINTS.LAW_FIRM.COUNTRIES);
  return response.data;
};

export const getStatesByCountry = async (countryId: string): Promise<any[]> => {
  const response = await apiClient.get<any[]>(ENDPOINTS.LAW_FIRM.STATES(countryId));
  return response.data;
};

export const getCitiesByState = async (stateId: string): Promise<any[]> => {
  const response = await apiClient.get<any[]>(ENDPOINTS.LAW_FIRM.CITIES(stateId));
  return response.data;
};

export const getAvailablePlans = async (): Promise<any[]> => {
  const response = await apiClient.get<any[]>(ENDPOINTS.LAW_FIRM.PLANS);
  return response.data;
};
