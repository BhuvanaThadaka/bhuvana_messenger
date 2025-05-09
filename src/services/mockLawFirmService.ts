import { apiResponse, delay, generateId, showSuccessToast, showErrorToast } from './mockApiService';
import { LawFirm, LawFirmFormData, LawFirmListParams } from '@/types/lawFirm';

// Mock law firm data
let mockLawFirms: LawFirm[] = [
  {
    id: "1",
    name: "Smith & Associates",
    firmCode: "SA-2025",
    registrationNumber: "LAW12345",
    firmType: "Partnership",
    taxId: "84-1234567",
    gstNumber: "29AADCB2230M1ZP",
    panNumber: "AADCB2230M",
    cinNumber: "U72200MH2009PTC123456",
    barAssociation: "New York Bar Association",
    establishmentYear: 2010,
    registrationCertificateUrl: "/assets/certificates/sample-cert.pdf",
    primaryContactName: "John Smith",
    primaryContactNumber: "+1 (212) 555-7890",
    alternativeEmail: "info@smithassociates.com",
    alternativeNumber: "+1 (212) 555-7891",
    country: "United States",
    state: "New York",
    city: "New York City",
    officeAddress: "350 Fifth Avenue, Empire State Building, 21st Floor",
    zipCode: "10118",
    website: "https://www.smithassociates.com",
    logoUrl: "/assets/logos/smith-logo.png",
    adminName: "Sarah Johnson",
    adminEmail: "admin@smithassociates.com",
    adminPhone: "+1 (212) 555-7899",
    plan: "premium",
    isActive: true,
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-04-01T14:22:00Z"
  },
  {
    id: "2",
    name: "Legal Solutions LLC",
    firmCode: "LS-2025",
    registrationNumber: "LAW54321",
    firmType: "Limited Liability Company",
    taxId: "84-7654321",
    gstNumber: "27AABFL7890M1ZP",
    panNumber: "AABFL7890M",
    cinNumber: "L17110MH1973PLC019786",
    barAssociation: "California Bar Association",
    establishmentYear: 2015,
    registrationCertificateUrl: "/assets/certificates/legal-solutions-cert.pdf",
    primaryContactName: "David Wilson",
    primaryContactNumber: "+1 (415) 555-1234",
    alternativeEmail: "info@legalsolutions.com",
    alternativeNumber: "+1 (415) 555-1235",
    country: "United States",
    state: "California",
    city: "San Francisco",
    officeAddress: "101 Market Street, Suite 700",
    zipCode: "94105",
    website: "https://www.legalsolutions.com",
    logoUrl: "/assets/logos/legal-solutions-logo.png",
    adminName: "Michael Brown",
    adminEmail: "admin@legalsolutions.com",
    adminPhone: "+1 (415) 555-1239",
    plan: "standard",
    isActive: true,
    createdAt: "2025-02-10T09:15:00Z",
    updatedAt: "2025-03-28T11:45:00Z"
  },
  {
    id: "3",
    name: "Johnson & Partners",
    firmCode: "JP-2025",
    registrationNumber: "LAW98765",
    firmType: "Partnership",
    taxId: "84-9876543",
    gstNumber: "06AADCJ4567M1ZP",
    panNumber: "AADCJ4567M",
    cinNumber: null,
    barAssociation: "Texas Bar Association",
    establishmentYear: 2008,
    registrationCertificateUrl: "/assets/certificates/johnson-cert.pdf",
    primaryContactName: "Robert Johnson",
    primaryContactNumber: "+1 (512) 555-7777",
    alternativeEmail: "info@johnsonpartners.com",
    alternativeNumber: "+1 (512) 555-7778",
    country: "United States",
    state: "Texas",
    city: "Austin",
    officeAddress: "200 Congress Avenue, Suite 1500",
    zipCode: "78701",
    website: "https://www.johnsonpartners.com",
    logoUrl: "/assets/logos/johnson-logo.png",
    adminName: "Jennifer Davis",
    adminEmail: "admin@johnsonpartners.com",
    adminPhone: "+1 (512) 555-7779",
    plan: "premium",
    isActive: false,
    createdAt: "2025-01-05T14:30:00Z",
    updatedAt: "2025-03-15T16:20:00Z"
  },
  {
    id: "4",
    name: "Robinson & Associates",
    firmCode: "RA-2025",
    registrationNumber: "LAW76543",
    firmType: "Limited Liability Company",
    taxId: "84-4321098",
    gstNumber: "19ADFGR5678M1ZP",
    panNumber: "ADFGR5678M",
    cinNumber: "U72200TN2012PTC098765",
    barAssociation: "Illinois Bar Association",
    establishmentYear: 2012,
    registrationCertificateUrl: "/assets/certificates/robinson-cert.pdf",
    primaryContactName: "Emily Robinson",
    primaryContactNumber: "+1 (312) 555-4444",
    alternativeEmail: "info@robinsonassociates.com",
    alternativeNumber: "+1 (312) 555-4445",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    officeAddress: "200 N Michigan Avenue, Suite 1000",
    zipCode: "60601",
    website: "https://www.robinsonassociates.com",
    logoUrl: "/assets/logos/robinson-logo.png",
    adminName: "Daniel White",
    adminEmail: "admin@robinsonassociates.com",
    adminPhone: "+1 (312) 555-4449",
    plan: "premium",
    isActive: true,
    createdAt: "2025-01-28T11:45:00Z",
    updatedAt: "2025-03-21T09:15:00Z"
  },
  {
    id: "5",
    name: "Thompson Law Group",
    firmCode: "TLG-2025",
    registrationNumber: "LAW24680",
    firmType: "Partnership",
    taxId: "84-5678901",
    gstNumber: "07AHIJK9012M1ZP",
    panNumber: "AHIJK9012M",
    cinNumber: null,
    barAssociation: "Florida Bar Association",
    establishmentYear: 2014,
    registrationCertificateUrl: "/assets/certificates/thompson-cert.pdf",
    primaryContactName: "Laura Thompson",
    primaryContactNumber: "+1 (305) 555-8888",
    alternativeEmail: "info@thompsonlaw.com",
    alternativeNumber: "+1 (305) 555-8889",
    country: "United States",
    state: "Florida",
    city: "Miami",
    officeAddress: "800 Brickell Avenue, 15th Floor",
    zipCode: "33131",
    website: "https://www.thompsonlaw.com",
    logoUrl: "/assets/logos/thompson-logo.png",
    adminName: "Richard Martinez",
    adminEmail: "admin@thompsonlaw.com",
    adminPhone: "+1 (305) 555-8880",
    plan: "standard",
    isActive: true,
    createdAt: "2025-02-15T16:20:00Z",
    updatedAt: "2025-03-30T10:45:00Z"
  },
  {
    id: "6",
    name: "Adams & Baker Law",
    firmCode: "ABL-2025",
    registrationNumber: "LAW13579",
    firmType: "Solo Practice",
    taxId: "84-3456789",
    gstNumber: null,
    panNumber: "ALMNP3456M",
    cinNumber: null,
    barAssociation: "Washington State Bar Association",
    establishmentYear: 2019,
    registrationCertificateUrl: "/assets/certificates/adams-cert.pdf",
    primaryContactName: "James Adams",
    primaryContactNumber: "+1 (206) 555-9999",
    alternativeEmail: "info@adamsbaker.com",
    alternativeNumber: null,
    country: "United States",
    state: "Washington",
    city: "Seattle",
    officeAddress: "500 Pine Street, Suite 300",
    zipCode: "98101",
    website: "https://www.adamsbaker.com",
    logoUrl: "/assets/logos/adams-logo.png",
    adminName: "James Adams",
    adminEmail: "james@adamsbaker.com",
    adminPhone: "+1 (206) 555-9999",
    plan: "basic",
    isActive: true,
    createdAt: "2025-03-01T09:30:00Z",
    updatedAt: "2025-04-05T14:10:00Z"
  }
];

// Mock countries, states, cities, and plans
const mockCountries = [
  { id: "1", name: "United States" },
  { id: "2", name: "Canada" },
  { id: "3", name: "United Kingdom" },
  { id: "4", name: "Australia" },
  { id: "5", name: "India" }
];

const mockStates = {
  "1": [ // United States
    { id: "us-1", name: "New York" },
    { id: "us-2", name: "California" },
    { id: "us-3", name: "Texas" },
    { id: "us-4", name: "Florida" },
    { id: "us-5", name: "Illinois" }
  ],
  "2": [ // Canada
    { id: "ca-1", name: "Ontario" },
    { id: "ca-2", name: "Quebec" },
    { id: "ca-3", name: "British Columbia" },
    { id: "ca-4", name: "Alberta" }
  ],
  "5": [ // India
    { id: "in-1", name: "Maharashtra" },
    { id: "in-2", name: "Karnataka" },
    { id: "in-3", name: "Delhi" },
    { id: "in-4", name: "Tamil Nadu" }
  ]
};

const mockCities = {
  "us-1": [ // New York
    { id: "nyc-1", name: "New York City" },
    { id: "nyc-2", name: "Buffalo" },
    { id: "nyc-3", name: "Rochester" }
  ],
  "us-2": [ // California
    { id: "cal-1", name: "Los Angeles" },
    { id: "cal-2", name: "San Francisco" },
    { id: "cal-3", name: "San Diego" }
  ],
  "in-1": [ // Maharashtra
    { id: "mh-1", name: "Mumbai" },
    { id: "mh-2", name: "Pune" },
    { id: "mh-3", name: "Nagpur" }
  ]
};

const mockPlans = [
  {
    id: "free",
    name: "Free Trial",
    description: "30-day free trial with basic features",
    price: 0
  },
  {
    id: "basic",
    name: "Basic",
    description: "Essential features for small law firms",
    price: 99
  },
  {
    id: "standard",
    name: "Standard",
    description: "Complete solution for growing law firms",
    price: 199
  },
  {
    id: "premium",
    name: "Premium",
    description: "Advanced features for established law firms",
    price: 299
  }
];

// Get all law firms with pagination, search, and sorting
export const getLawFirms = async (params: LawFirmListParams) => {
  await delay(800);
  
  let filteredFirms = [...mockLawFirms];
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredFirms = filteredFirms.filter(
      (firm) => 
        firm.name.toLowerCase().includes(searchLower) ||
        firm.firmCode?.toLowerCase().includes(searchLower) ||
        firm.registrationNumber.toLowerCase().includes(searchLower) ||
        firm.adminName.toLowerCase().includes(searchLower) ||
        firm.adminEmail.toLowerCase().includes(searchLower) ||
        firm.city.toLowerCase().includes(searchLower) ||
        firm.country.toLowerCase().includes(searchLower) ||
        firm.state.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  if (params.sortBy) {
    filteredFirms.sort((a: any, b: any) => {
      let aValue = a[params.sortBy];
      let bValue = b[params.sortBy];
      
      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return params.sortOrder === 'asc' ? -1 : 1;
      if (bValue === null || bValue === undefined) return params.sortOrder === 'asc' ? 1 : -1;
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      // Compare values based on sort order
      if (params.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
  
  // Calculate pagination
  const total = filteredFirms.length;
  const pageSize = params.pageSize || 10;
  const page = params.page || 1;
  const startIndex = (page - 1) * pageSize;
  const paginatedFirms = filteredFirms.slice(startIndex, startIndex + pageSize);
  
  console.log('[MockAPI] GET /api/lawfirms', {
    params,
    results: paginatedFirms.length,
    total
  });
  
  return apiResponse({
    firms: paginatedFirms,
    total,
    page,
    pageSize
  });
};

// Get a single law firm by ID
export const getLawFirmById = async (id: string) => {
  await delay(500);
  
  const firm = mockLawFirms.find((f) => f.id === id);
  
  console.log('[MockAPI] GET /api/lawfirms/' + id, firm);
  
  if (!firm) {
    showErrorToast("Law firm not found");
    return apiResponse(null, false, "Law firm not found");
  }
  
  return apiResponse(firm);
};

// Create a new law firm
export const createLawFirm = async (data: LawFirmFormData) => {
  await delay(1200);
  
  try {
    // Generate registration certificate URL if file is provided
    let registrationCertificateUrl = undefined;
    if (data.registrationCertificate) {
      registrationCertificateUrl = URL.createObjectURL(data.registrationCertificate);
    }
    
    // Generate logo URL if file is provided
    let logoUrl = undefined;
    if (data.logo) {
      logoUrl = URL.createObjectURL(data.logo);
    }
    
    const newFirm: LawFirm = {
      id: generateId(),
      ...data,
      registrationCertificateUrl,
      logoUrl,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockLawFirms.push(newFirm);
    
    console.log('[MockAPI] POST /api/lawfirms/create', newFirm);
    showSuccessToast(`Law firm "${data.name}" has been successfully added.`);
    
    return apiResponse(newFirm);
  } catch (error) {
    showErrorToast("Error creating law firm. Please try again.");
    return apiResponse(null, false, "Error creating law firm");
  }
};

// Update an existing law firm
export const updateLawFirm = async (id: string, data: Partial<LawFirmFormData>) => {
  await delay(1000);
  
  try {
    const firmIndex = mockLawFirms.findIndex((f) => f.id === id);
    
    if (firmIndex === -1) {
      showErrorToast("Law firm not found");
      return apiResponse(null, false, "Law firm not found");
    }
    
    // Generate registration certificate URL if file is provided
    let registrationCertificateUrl = mockLawFirms[firmIndex].registrationCertificateUrl;
    if (data.registrationCertificate) {
      registrationCertificateUrl = URL.createObjectURL(data.registrationCertificate);
    }
    
    // Generate logo URL if file is provided
    let logoUrl = mockLawFirms[firmIndex].logoUrl;
    if (data.logo) {
      logoUrl = URL.createObjectURL(data.logo);
    }
    
    // Update the firm
    const updatedFirm = {
      ...mockLawFirms[firmIndex],
      ...data,
      registrationCertificateUrl,
      logoUrl,
      updatedAt: new Date().toISOString()
    };
    
    mockLawFirms[firmIndex] = updatedFirm;
    
    console.log('[MockAPI] PUT /api/lawfirms/update/' + id, updatedFirm);
    showSuccessToast("Law firm updated successfully");
    
    return apiResponse(updatedFirm);
  } catch (error) {
    showErrorToast("Error updating law firm. Please try again.");
    return apiResponse(null, false, "Error updating law firm");
  }
};

// Delete a law firm
export const deleteLawFirm = async (id: string) => {
  await delay(800);
  
  try {
    const firmIndex = mockLawFirms.findIndex((f) => f.id === id);
    
    if (firmIndex === -1) {
      showErrorToast("Law firm not found");
      return apiResponse(null, false, "Law firm not found");
    }
    
    // Simulate checking for dependencies (like cases linked to this firm)
    if (mockLawFirms[firmIndex].name.includes("Johnson")) {
      showErrorToast("Cannot delete law firm. It has active cases or other dependencies.");
      return apiResponse(null, false, "Cannot delete law firm with active dependencies");
    }
    
    // Delete the firm
    mockLawFirms = mockLawFirms.filter((f) => f.id !== id);
    
    console.log('[MockAPI] DELETE /api/lawfirms/delete/' + id);
    showSuccessToast("Law firm deleted successfully");
    
    return apiResponse({ id });
  } catch (error) {
    showErrorToast("Error deleting law firm. Please try again.");
    return apiResponse(null, false, "Error deleting law firm");
  }
};

// Toggle law firm status (active/inactive)
export const toggleLawFirmStatus = async (id: string, isActive: boolean) => {
  await delay(500);
  
  try {
    const firmIndex = mockLawFirms.findIndex((f) => f.id === id);
    
    if (firmIndex === -1) {
      showErrorToast("Law firm not found");
      return apiResponse(null, false, "Law firm not found");
    }
    
    // Update status
    mockLawFirms[firmIndex].isActive = isActive;
    mockLawFirms[firmIndex].updatedAt = new Date().toISOString();
    
    console.log('[MockAPI] PUT /api/lawfirms/' + id + '/toggle-status', {
      isActive
    });
    showSuccessToast(`Law firm ${isActive ? 'activated' : 'deactivated'} successfully`);
    
    return apiResponse(mockLawFirms[firmIndex]);
  } catch (error) {
    showErrorToast("Error updating law firm status. Please try again.");
    return apiResponse(null, false, "Error updating status");
  }
};

// Get all countries
export const getCountries = async () => {
  await delay(300);
  
  console.log('[MockAPI] GET /api/countries', mockCountries);
  
  return apiResponse(mockCountries);
};

// Get states by country
export const getStates = async (countryId: string) => {
  await delay(300);
  
  const states = mockStates[countryId as keyof typeof mockStates] || [];
  
  console.log('[MockAPI] GET /api/states', {
    countryId,
    states
  });
  
  return apiResponse(states);
};

// Get cities by state
export const getCities = async (stateId: string) => {
  await delay(300);
  
  const cities = mockCities[stateId as keyof typeof mockCities] || [];
  
  console.log('[MockAPI] GET /api/cities', {
    stateId,
    cities
  });
  
  return apiResponse(cities);
};

// Get plans
export const getPlans = async () => {
  await delay(400);
  
  console.log('[MockAPI] GET /api/plans', mockPlans);
  
  return apiResponse(mockPlans);
};
