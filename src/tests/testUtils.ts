
import { User, AccountType, Modules } from '@/types/auth';

// Helper to create mock users with different account types
export const createMockUser = (accountType: AccountType): User => {
  switch (accountType) {
    case AccountType.SUPER_ADMIN:
      return {
        id: 'user1',
        username: 'admin',
        accountType: AccountType.SUPER_ADMIN,
        roles: ['ADMIN'],
        featurePrivileges: {
          [Modules.UserManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
          [Modules.Dashboard]: ['VIEW'],
          [Modules.RoleManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
          [Modules.CaseManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
          [Modules.MasterDataManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
          [Modules.UserProfile]: ['VIEW', 'EDIT'],
        },
        token: 'mock-token-admin'
      };
    case AccountType.ORGANISATION:
      return {
        id: 'user2',
        username: 'org_admin',
        accountType: AccountType.ORGANISATION,
        roles: ['ADMIN'],
        featurePrivileges: {
          [Modules.UserManagement]: ['VIEW', 'CREATE', 'EDIT'],
          [Modules.Dashboard]: ['VIEW'],
          [Modules.CaseManagement]: ['VIEW', 'CREATE', 'EDIT'],
          [Modules.UserProfile]: ['VIEW', 'EDIT'],
        },
        token: 'mock-token-org',
        organization: 'Test Organization'
      };
    case AccountType.INDIVIDUAL:
      return {
        id: 'user3',
        username: 'individual',
        accountType: AccountType.INDIVIDUAL,
        roles: ['USER'],
        featurePrivileges: {
          [Modules.Dashboard]: ['VIEW'],
          [Modules.CaseManagement]: ['VIEW', 'CREATE'],
          [Modules.UserProfile]: ['VIEW', 'EDIT'],
        },
        token: 'mock-token-individual'
      };
    default:
      return {
        id: 'guest',
        accountType: AccountType.INDIVIDUAL,
        roles: ['GUEST'],
        featurePrivileges: {}
      };
  }
};

// Helper to check permissions based on user type and module
export const checkPermission = (
  user: User | null, 
  module: Modules, 
  action?: string
): boolean => {
  if (!user) return false;
  
  // Super admin has access to everything
  if (user.accountType === AccountType.SUPER_ADMIN) return true;
  
  // Check specific permissions
  if (!user.featurePrivileges) return false;
  
  const permissions = user.featurePrivileges[module];
  if (!permissions) return false;
  
  if (action) {
    return permissions.includes(action);
  }
  
  return permissions.length > 0;
};
