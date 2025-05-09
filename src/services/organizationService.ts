
import { apiClient } from './apiService';
import { ENDPOINTS } from './endpoints';

export interface OrganizationProfile {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  legalIdentifier: string;
  logoUrl?: string;
  // Add any other organization profile fields
}

export interface UpdateOrganizationProfilePayload {
  name?: string;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  legalIdentifier?: string;
  logoUrl?: string;
  // Add any other fields that can be updated
}

export const getCompanyProfile = async (): Promise<OrganizationProfile> => {
  const response = await apiClient.get<OrganizationProfile>(
    ENDPOINTS.ORGANIZATION.COMPANY_PROFILE
  );
  return response.data;
};

export const updateCompanyProfile = async (
  profileData: UpdateOrganizationProfilePayload
): Promise<OrganizationProfile> => {
  const response = await apiClient.put<OrganizationProfile>(
    ENDPOINTS.ORGANIZATION.UPDATE_COMPANY_PROFILE, 
    profileData
  );
  return response.data;
};
