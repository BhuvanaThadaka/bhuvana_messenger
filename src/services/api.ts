
import axios from 'axios';
import { User, AccountType, Modules } from '../types/auth';

// Mock user data with token property included
const superAdminUser: User = {
  username: 'admin@example.com',
  accountType: AccountType.SUPER_ADMIN,
  roles: ['ADMIN'],
  token: 'mock-super-admin-token',
  featurePrivileges: {
    [Modules.UserManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
    [Modules.Dashboard]: ['VIEW'],
    [Modules.RoleManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
    [Modules.CaseManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
    [Modules.MasterDataManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
    [Modules.UserProfile]: ['VIEW', 'EDIT'],
    [Modules.CompanyProfile]: ['VIEW', 'EDIT'],
    [Modules.InvoiceManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE']
  },
  organization: null
};

const organizationAdminUser: User = {
  username: 'org_admin@example.com',
  accountType: AccountType.ORGANISATION,
  roles: ['ADMIN'],
  token: 'mock-org-admin-token',
  featurePrivileges: {
    [Modules.UserManagement]: ['VIEW', 'CREATE', 'EDIT'],
    [Modules.Dashboard]: ['VIEW'],
    [Modules.CaseManagement]: ['VIEW', 'CREATE', 'EDIT'],
    [Modules.UserProfile]: ['VIEW', 'EDIT'],
    [Modules.CompanyProfile]: ['VIEW', 'EDIT'],
    [Modules.InvoiceManagement]: ['VIEW', 'CREATE']
  },
  organization: 'Acme Legal Services'
};

const individualUser: User = {
  username: 'user@example.com',
  accountType: AccountType.INDIVIDUAL,
  roles: ['USER'],
  token: 'mock-individual-user-token',
  featurePrivileges: {
    [Modules.Dashboard]: ['VIEW'],
    [Modules.CaseManagement]: ['VIEW', 'CREATE'],
    [Modules.UserProfile]: ['VIEW', 'EDIT']
  },
  organization: null
};

// Mock API response functions
export const mockLogin = async (username: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple user matching
  if (username === 'admin@example.com' && password === 'password123') {
    return { user: superAdminUser, token: superAdminUser.token };
  }
  else if (username === 'org_admin@example.com' && password === 'password123') {
    return { user: organizationAdminUser, token: organizationAdminUser.token };
  }
  else if (username === 'user@example.com' && password === 'password123') {
    return { user: individualUser, token: individualUser.token };
  }
  
  throw new Error('Invalid credentials');
};

// Mock API to simulate signup
export const mockSignup = async (username: string, password: string, email: string, accountType: AccountType) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For demonstration, always return a successful signup
  const newUser: User = {
    username: username,
    accountType: accountType,
    roles: ['USER'],
    token: 'mock-new-user-token',
    featurePrivileges: {
      [Modules.Dashboard]: ['VIEW'],
      [Modules.CaseManagement]: ['VIEW', 'CREATE'],
      [Modules.UserProfile]: ['VIEW', 'EDIT']
    },
    organization: null
  };

  return { user: newUser, token: newUser.token };
};

// Mock API to simulate logout
export const mockLogout = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, you might invalidate the token on the server
  return { success: true, message: 'Logged out successfully' };
};

export default {
  mockLogin,
  mockSignup,
  mockLogout
};
