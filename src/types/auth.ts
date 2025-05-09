
export enum AccountType {
  SUPER_ADMIN = "SUPER_ADMIN",
  ORGANISATION = "ORGANISATION",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum Modules {
  Dashboard = "Dashboard",
  CaseManagement = "CaseManagement",
  StaffManagement = "StaffManagement",
  RoleManagement = "RoleManagement",
  UserManagement = "UserManagement",
  MasterDataManagement = "MasterDataManagement",
  LawFirmManagement = "LawFirmManagement",
  PlanManagement = "PlanManagement",
  CompanyProfile = "CompanyProfile",
  InvoiceManagement = "InvoiceManagement",
  UserProfile = "UserProfile",
  Settings = "Settings",
  AccessManagement = "AccessManagement"
}

export interface User {
  id?: string;
  email?: string;
  name?: string;
  accountType: AccountType;
  firmName?: string;
  firmLogo?: string;
  shortName?: string;
  role?: string;
  roles?: string[];
  username?: string;
  token?: string;
  organization?: string | null;
  featurePrivileges?: {
    [key: string]: string[];
  };
  permissions?: string[];
}

// Auth context type definition
export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Types for authentication API responses and payloads
export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  accountType: AccountType;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Type for sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  module: Modules;
  requiredAction?: string;
  accountTypes?: AccountType[];
  children?: NavItem[];
}
