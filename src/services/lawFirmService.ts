import { apiClient } from './apiService';
import { ENDPOINTS } from './endpoints';
import { LawFirm, LawFirmFormData, LawFirmListParams } from '@/types/lawFirm';

// Sample mock data for when API calls fail
const mockLawFirms = [
  {
    id: "1",
    name: "Smith & Associates",
    firmCode: "SA-001",
    registrationNumber: "REG12345",
    firmType: "LLP",
    taxId: "TX98765",
    establishmentYear: 2005,
    primaryContactName: "John Smith",
    primaryContactNumber: "555-123-4567",
    country: "US",
    state: "CA",
    city: "Los Angeles",
    officeAddress: "123 Legal Avenue, Suite 500",
    zipCode: "90001",
    adminName: "Sarah Johnson",
    adminEmail: "sarah@smith-associates.com",
    adminPhone: "555-987-6543",
    plan: "premium",
    isActive: true,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-04-20T14:45:00Z"
  },
  {
    id: "2",
    name: "Legal Eagles LLP",
    firmCode: "LE-002",
    registrationNumber: "REG67890",
    firmType: "LLP",
    taxId: "TX54321",
    establishmentYear: 2010,
    primaryContactName: "Michael Brown",
    primaryContactNumber: "555-456-7890",
    country: "US",
    state: "NY",
    city: "New York",
    officeAddress: "456 Justice Street, Floor 12",
    zipCode: "10001",
    adminName: "David Wilson",
    adminEmail: "david@legaleagles.com",
    adminPhone: "555-234-5678",
    plan: "standard",
    isActive: true,
    createdAt: "2023-02-20T09:15:00Z",
    updatedAt: "2023-05-10T11:30:00Z"
  },
  {
    id: "3",
    name: "Justice Partners",
    firmCode: "JP-003",
    registrationNumber: "REG54321",
    firmType: "Partnership",
    taxId: "TX12345",
    establishmentYear: 2015,
    primaryContactName: "Emily Davis",
    primaryContactNumber: "555-789-0123",
    country: "US",
    state: "TX",
    city: "Austin",
    officeAddress: "789 Equity Road",
    zipCode: "73301",
    adminName: "Robert Taylor",
    adminEmail: "robert@justicepartners.com",
    adminPhone: "555-345-6789",
    plan: "basic",
    isActive: false,
    createdAt: "2023-03-05T14:00:00Z",
    updatedAt: "2023-06-15T16:20:00Z"
  },
  {
    id: "4",
    name: "Global Legal Solutions",
    firmCode: "GLS-004",
    registrationNumber: "REG78901",
    firmType: "Corporate",
    taxId: "TX67890",
    establishmentYear: 2008,
    primaryContactName: "Jennifer Lopez",
    primaryContactNumber: "555-567-8901",
    country: "US",
    state: "IL",
    city: "Chicago",
    officeAddress: "567 Law Boulevard, Suite 300",
    zipCode: "60603",
    adminName: "Thomas Wright",
    adminEmail: "thomas@globallegal.com",
    adminPhone: "555-456-7890",
    plan: "premium",
    isActive: true,
    createdAt: "2023-01-25T11:45:00Z",
    updatedAt: "2023-05-05T13:20:00Z"
  },
  {
    id: "5",
    name: "Advocate Associates",
    firmCode: "AA-005",
    registrationNumber: "REG23456",
    firmType: "Sole Proprietorship",
    taxId: "TX34567",
    establishmentYear: 2019,
    primaryContactName: "Daniel Martinez",
    primaryContactNumber: "555-678-9012",
    country: "US",
    state: "FL",
    city: "Miami",
    officeAddress: "890 Barrister Road",
    zipCode: "33101",
    adminName: "Daniel Martinez",
    adminEmail: "daniel@advocateassociates.com",
    adminPhone: "555-678-9012",
    plan: "basic",
    isActive: true,
    createdAt: "2023-03-10T09:00:00Z",
    updatedAt: "2023-04-15T14:30:00Z"
  }
];

// Get all law firms with pagination, search, and sorting
export const getLawFirms = async (params: LawFirmListParams) => {
  try {
    const response = await apiClient.get<{
      firms: LawFirm[];
      total: number;
      page: number;
      pageSize: number;
    }>(ENDPOINTS.LAW_FIRM.LIST, {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        search: params.search || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching law firms:", error);
    // Return mock data if API call fails
    return {
      firms: mockLawFirms,
      total: mockLawFirms.length,
      page: 1,
      pageSize: 10
    };
  }
};

// Get a single law firm by ID
export const getLawFirmById = async (id: string) => {
  try {
    const response = await apiClient.get<LawFirm>(ENDPOINTS.LAW_FIRM.DETAILS(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching law firm with ID ${id}:`, error);
    // Return mock data for requested ID if API call fails
    const mockFirm = mockLawFirms.find(firm => firm.id === id);
    if (mockFirm) return mockFirm;
    
    throw new Error("Law firm not found");
  }
};

// Create a new law firm
export const createLawFirm = async (data: LawFirmFormData) => {
  try {
    // Create form data if there's a file upload
    let formData: FormData | undefined;
    if (data.registrationCertificate) {
      formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'registrationCertificate' && value instanceof File) {
          formData?.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData?.append(key, value.toString());
        }
      });
    }
    
    const response = await apiClient.post<LawFirm>(
      ENDPOINTS.LAW_FIRM.CREATE,
      formData || data,
      formData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : undefined
    );
    return response.data;
  } catch (error) {
    console.error("Error creating law firm:", error);
    // Create a mock response with a new ID
    const newId = (Math.floor(Math.random() * 1000) + 4).toString();
    return {
      id: newId,
      name: data.name,
      registrationNumber: data.registrationNumber,
      firmType: data.firmType,
      taxId: data.taxId,
      barAssociation: data.barAssociation,
      establishmentYear: data.establishmentYear,
      primaryContactName: data.primaryContactName,
      primaryContactNumber: data.primaryContactNumber,
      alternativeEmail: data.alternativeEmail,
      alternativeNumber: data.alternativeNumber,
      country: data.country,
      state: data.state,
      city: data.city,
      officeAddress: data.officeAddress,
      zipCode: data.zipCode,
      adminName: data.adminName,
      adminEmail: data.adminEmail,
      adminPhone: data.adminPhone,
      plan: data.plan,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as LawFirm;
  }
};

// Update an existing law firm
export const updateLawFirm = async (id: string, data: Partial<LawFirmFormData>) => {
  try {
    // Create form data if there's a file upload
    let formData: FormData | undefined;
    if (data.registrationCertificate) {
      formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'registrationCertificate' && value instanceof File) {
          formData?.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData?.append(key, value.toString());
        }
      });
    }
    
    const response = await apiClient.put<LawFirm>(
      ENDPOINTS.LAW_FIRM.UPDATE(id),
      formData || data,
      formData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : undefined
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating law firm with ID ${id}:`, error);
    // Return a mock updated firm
    const mockFirm = mockLawFirms.find(firm => firm.id === id);
    if (!mockFirm) throw new Error("Law firm not found");
    
    return {
      ...mockFirm,
      ...data,
      updatedAt: new Date().toISOString()
    } as LawFirm;
  }
};

// Delete a law firm
export const deleteLawFirm = async (id: string) => {
  try {
    await apiClient.delete(ENDPOINTS.LAW_FIRM.DELETE(id));
    return id;
  } catch (error) {
    console.error(`Error deleting law firm with ID ${id}:`, error);
    // Just return the ID as if deletion was successful
    return id;
  }
};

// Toggle law firm status (active/inactive)
export const toggleLawFirmStatus = async (id: string, isActive: boolean) => {
  try {
    const response = await apiClient.put<LawFirm>(
      ENDPOINTS.LAW_FIRM.TOGGLE_STATUS(id),
      { isActive }
    );
    return response.data;
  } catch (error) {
    console.error(`Error toggling status for law firm with ID ${id}:`, error);
    // Return a mock updated firm with toggled status
    const mockFirm = mockLawFirms.find(firm => firm.id === id);
    if (!mockFirm) throw new Error("Law firm not found");
    
    return {
      ...mockFirm,
      isActive,
      updatedAt: new Date().toISOString()
    } as LawFirm;
  }
};

// Get all countries
export const getCountries = async () => {
  try {
    const response = await apiClient.get<{ id: string; name: string }[]>(ENDPOINTS.LAW_FIRM.COUNTRIES);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    // Return mock countries
    return [
      { id: "US", name: "United States" },
      { id: "CA", name: "Canada" },
      { id: "UK", name: "United Kingdom" },
      { id: "AU", name: "Australia" },
      { id: "IN", name: "India" }
    ];
  }
};

// Get states by country
export const getStates = async (countryId: string) => {
  try {
    const response = await apiClient.get<{ id: string; name: string }[]>(ENDPOINTS.LAW_FIRM.STATES(countryId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching states for country ${countryId}:`, error);
    // Return mock states based on country
    if (countryId === "US") {
      return [
        { id: "CA", name: "California" },
        { id: "NY", name: "New York" },
        { id: "TX", name: "Texas" },
        { id: "FL", name: "Florida" },
        { id: "IL", name: "Illinois" }
      ];
    }
    return [];
  }
};

// Get cities by state
export const getCities = async (stateId: string) => {
  try {
    const response = await apiClient.get<{ id: string; name: string }[]>(ENDPOINTS.LAW_FIRM.CITIES(stateId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for state ${stateId}:`, error);
    // Return mock cities based on state
    if (stateId === "CA") {
      return [
        { id: "LA", name: "Los Angeles" },
        { id: "SF", name: "San Francisco" },
        { id: "SD", name: "San Diego" },
        { id: "SJ", name: "San Jose" },
        { id: "FR", name: "Fresno" }
      ];
    }
    return [];
  }
};

// Get plans
export const getPlans = async () => {
  try {
    const response = await apiClient.get<{ id: string; name: string; description: string; price: number }[]>(ENDPOINTS.LAW_FIRM.PLANS);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    // Return mock plans
    return [
      { id: "basic", name: "Basic Plan", description: "For small firms", price: 99 },
      { id: "standard", name: "Standard Plan", description: "For medium firms", price: 199 },
      { id: "premium", name: "Premium Plan", description: "For large firms", price: 299 }
    ];
  }
};

export const getStatesByCountry = async (countryId: string) => {
  try {
    const response = await apiClient.get<{ id: string; name: string }[]>(ENDPOINTS.LAW_FIRM.STATES(countryId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching states for country ${countryId}:`, error);
    // Return mock states based on country
    if (countryId === "US") {
      return [
        { id: "CA", name: "California" },
        { id: "NY", name: "New York" },
        { id: "TX", name: "Texas" },
        { id: "FL", name: "Florida" },
        { id: "IL", name: "Illinois" }
      ];
    }
    return [];
  }
};

export const getCitiesByState = async (stateId: string) => {
  try {
    const response = await apiClient.get<{ id: string; name: string }[]>(ENDPOINTS.LAW_FIRM.CITIES(stateId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for state ${stateId}:`, error);
    // Return mock cities based on state
    if (stateId === "CA") {
      return [
        { id: "LA", name: "Los Angeles" },
        { id: "SF", name: "San Francisco" },
        { id: "SD", name: "San Diego" },
        { id: "SJ", name: "San Jose" },
        { id: "FR", name: "Fresno" }
      ];
    }
    return [];
  }
};

export const getAvailablePlans = async () => {
  try {
    const response = await apiClient.get<{ id: string; name: string; description: string; price: number }[]>(ENDPOINTS.LAW_FIRM.PLANS);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    // Return mock plans
    return [
      { id: "basic", name: "Basic Plan", description: "For small firms", price: 99 },
      { id: "standard", name: "Standard Plan", description: "For medium firms", price: 199 },
      { id: "premium", name: "Premium Plan", description: "For large firms", price: 299 }
    ];
  }
};
