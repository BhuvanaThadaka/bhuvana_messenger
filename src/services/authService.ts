
import { apiClient } from './apiService';
import { ENDPOINTS } from './endpoints';
import { User, AccountType, Modules, LoginResponse, SignupPayload } from '../types/auth';

// Mock data for the demo
const mockUserResponses: Record<AccountType, User> = {
  [AccountType.SUPER_ADMIN]: {
    username: "admin",
    accountType: AccountType.SUPER_ADMIN,
    roles: ["ADMIN"],
    featurePrivileges: {
      [Modules.UserManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.Dashboard]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.RoleManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.CaseManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.MasterDataManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.UserProfile]: ["VIEW", "EDIT"],
      [Modules.LawFirmManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.PlanManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.Settings]: ["VIEW", "EDIT"],
      [Modules.StaffManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.AccessManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.InvoiceManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.CompanyProfile]: ["VIEW", "EDIT", "CREATE", "UPDATE"]
    },
    organization: null,
    token: null
  },
  [AccountType.ORGANISATION]: {
    username: "company",
    accountType: AccountType.ORGANISATION,
    roles: ["ADMIN"],
    featurePrivileges: {
      [Modules.UserManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.Dashboard]: ["VIEW"],
      [Modules.CaseManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.UserProfile]: ["VIEW", "EDIT"],
      [Modules.CompanyProfile]: ["VIEW", "EDIT", "CREATE", "UPDATE"],
      [Modules.MasterDataManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.Settings]: ["VIEW", "EDIT"],
      [Modules.StaffManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.RoleManagement]: ["VIEW", "CREATE", "EDIT", "DELETE"],
      [Modules.InvoiceManagement]: ["VIEW", "CREATE", "EDIT"]
    },
    organization: "VakeelPro Legal Services",
    token: null
  },
  [AccountType.INDIVIDUAL]: {
    username: "saikoti rongali",
    accountType: AccountType.INDIVIDUAL,
    roles: ["USER"],
    featurePrivileges: {
      [Modules.Dashboard]: ["VIEW"],
      [Modules.CaseManagement]: ["VIEW", "CREATE", "EDIT"],
      [Modules.UserProfile]: ["VIEW", "EDIT"],
      [Modules.Settings]: ["VIEW", "EDIT"]
    },
    organization: null,
    token: null
  }
};

// Generate mock token (for demo purposes)
const generateMockToken = (username: string, accountType: AccountType): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: username,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
    user: mockUserResponses[accountType]
  }));
  const signature = btoa("fake-signature");
  
  return `${header}.${payload}.${signature}`;
};

// Mock login function for development (will be replaced by actual API calls in production)
export const loginApi = async (username: string, password: string): Promise<{ token: string, user: User }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate credentials check
  if (username.length < 3 || password.length < 3) {
    throw new Error("Invalid credentials");
  }
  
  // Determine account type based on username for demo purposes
  let accountType: AccountType = AccountType.INDIVIDUAL;
  
  if (username.toLowerCase().includes("admin")) {
    accountType = AccountType.SUPER_ADMIN;
  } else if (username.toLowerCase().includes("company") || username.toLowerCase().includes("org")) {
    accountType = AccountType.ORGANISATION;
  }
  
  const token = generateMockToken(username, accountType);
  const user = { 
    ...mockUserResponses[accountType],
    token
  };
  
  return { token, user };
};

// Real API integration functions (to be used in production)
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    // For demo, use the mock function
    return await loginApi(username, password);
    // In production, uncomment below:
    /*
    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN, 
      { username, password }
    );
    return response.data;
    */
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = async (payload: SignupPayload): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    ENDPOINTS.AUTH.SIGNUP, 
    payload
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    // In production, uncomment below:
    /*
    await apiClient.post<void>(ENDPOINTS.AUTH.LOGOUT);
    */
    
    // For demo, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage regardless of API call success
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }
};

// Handle user profile
export const fetchUserProfile = async () => {
  const response = await apiClient.get(ENDPOINTS.USER.PROFILE);
  return response.data;
};

export const updateUserProfile = async (profileData: any) => {
  const response = await apiClient.put(
    ENDPOINTS.USER.UPDATE_PROFILE, 
    profileData
  );
  return response.data;
};
