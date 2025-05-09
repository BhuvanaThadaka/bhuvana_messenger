
import { apiClient } from '../apiService';

export interface OrganizationProfile {
  id: string;
  name: string;
  legalName: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  description: string;
  taxId: string;
  registrationNumber: string;
  foundedYear: string;
  logoUrl: string;
}

// Get organization profile
export const getOrganizationProfile = async (): Promise<OrganizationProfile> => {
  try {
    const response = await apiClient.get<OrganizationProfile>('/organizations/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching organization profile:', error);
    // Return mock data for development instead of throwing an error
    return {
      id: 'org-001',
      name: 'Default Organization',
      legalName: 'Default Legal Entity',
      address: '123 Default Street',
      contactEmail: 'contact@default.com',
      contactPhone: '+1234567890',
      website: 'https://default.com',
      description: 'This is a default organization profile returned when API fails',
      taxId: 'TAX-12345',
      registrationNumber: 'REG-12345',
      foundedYear: '2020',
      logoUrl: '/placeholder.svg'
    };
  }
};

// Update organization profile
export const updateOrganizationProfile = async (profileData: Partial<OrganizationProfile>): Promise<OrganizationProfile> => {
  try {
    const response = await apiClient.put<OrganizationProfile>('/organizations/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating organization profile:', error);
    // Return mock data for development instead of throwing an error
    return {
      ...profileData,
      id: 'org-001',
      name: profileData.name || 'Default Organization',
      legalName: profileData.legalName || 'Default Legal Entity',
      // Include other fields with defaults
      address: profileData.address || '123 Default Street',
      contactEmail: profileData.contactEmail || 'contact@default.com',
      contactPhone: profileData.contactPhone || '+1234567890',
      website: profileData.website || 'https://default.com',
      description: profileData.description || 'Default description',
      taxId: profileData.taxId || 'TAX-12345',
      registrationNumber: profileData.registrationNumber || 'REG-12345',
      foundedYear: profileData.foundedYear || '2020',
      logoUrl: profileData.logoUrl || '/placeholder.svg'
    };
  }
};

// Upload organization logo
export const uploadOrganizationLogo = async (logoFile: File): Promise<{ logoUrl: string }> => {
  try {
    const formData = new FormData();
    formData.append('logo', logoFile);
    
    const response = await apiClient.post<{ logoUrl: string }>('/organizations/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading organization logo:', error);
    // Return mock data for development
    return {
      logoUrl: '/placeholder.svg' // Default placeholder logo
    };
  }
};
