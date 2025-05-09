import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, Modules, AccountType } from '../types/auth';
import { loginApi } from '../services/authService';
import { isTokenExpired } from '../utils/jwt';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define allowed modules per account type
const modulesByAccountType: Record<AccountType, Modules[]> = {
  [AccountType.SUPER_ADMIN]: Object.values(Modules), // Super Admin gets access to ALL modules
  [AccountType.ORGANISATION]: [
    Modules.Dashboard,
    Modules.CaseManagement,
    Modules.UserManagement,
    Modules.RoleManagement,
    Modules.UserProfile,
    Modules.CompanyProfile,
    Modules.InvoiceManagement,
    Modules.Settings,
    Modules.StaffManagement,
    Modules.MasterDataManagement
  ],
  [AccountType.INDIVIDUAL]: [
    Modules.Dashboard,
    Modules.CaseManagement,
    Modules.UserProfile,
    Modules.Settings
  ]
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedToken) {
        try {
          if (isTokenExpired(storedToken)) {
            // Token expired, clear storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
          } else {
            // Valid token, restore session
            const storedUser = localStorage.getItem('auth_user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
              setToken(storedToken);
              setIsAuthenticated(true);
            }
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user, token } = await loginApi(username, password);
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: `Welcome, ${user.username || user.name}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during login';
      setError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    token,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const hasAccess = (
  user: User | null,
  module: Modules,
  action?: string
): boolean => {
  if (!user) return false;

  // SuperAdmin always has full access to everything
  if (user.accountType === AccountType.SUPER_ADMIN) {
    return true;
  }

  // Check if user's account type has access to this module
  if (user.accountType && !modulesByAccountType[user.accountType].includes(module)) {
    return false;
  }

  // Check if user has access to the module in their feature privileges
  const modulePrivileges = user.featurePrivileges?.[module];
  if (!modulePrivileges) return false;

  // If no specific action is required, just having the module is enough
  if (!action) return true;

  // Check for VIEW vs READ compatibility
  if (action === "VIEW" && modulePrivileges.includes("READ")) {
    return true;
  }
  
  if (action === "READ" && modulePrivileges.includes("VIEW")) {
    return true;
  }

  // Check if user has the specific action privilege
  return modulePrivileges.includes(action);
};

export const getFirstAccessibleModule = (user: User | null): Modules | null => {
  if (!user) return null;

  // Filter modules based on account type
  const allowedModules = modulesByAccountType[user.accountType] || [];
  
  // Define module priority based on user type
  let modulePriority: Modules[] = [];
  
  switch (user.accountType) {
    case AccountType.SUPER_ADMIN:
      modulePriority = [
        Modules.Dashboard,
        Modules.LawFirmManagement,
        Modules.PlanManagement,
        Modules.MasterDataManagement,
        Modules.UserManagement,
        Modules.RoleManagement,
        Modules.Settings,
        Modules.UserProfile
      ];
      break;
    case AccountType.ORGANISATION:
      modulePriority = [
        Modules.Dashboard,
        Modules.CaseManagement,
        Modules.CompanyProfile,
        Modules.MasterDataManagement,
        Modules.UserManagement,
        Modules.RoleManagement,
        Modules.UserProfile,
        Modules.Settings
      ];
      break;
    case AccountType.INDIVIDUAL:
      modulePriority = [
        Modules.Dashboard,
        Modules.CaseManagement,
        Modules.UserProfile,
        Modules.Settings
      ];
      break;
    default:
      modulePriority = [Modules.Dashboard];
  }

  // Check each module in priority order
  for (const module of modulePriority) {
    // Only consider modules that are allowed for this account type
    if (allowedModules.includes(module) && hasAccess(user, module)) {
      return module;
    }
  }

  return null;
};

// Check if a user is in a specific role
export const hasRole = (user: User | null, role: string | string[]): boolean => {
  if (!user) return false;
  
  const rolesToCheck = Array.isArray(role) ? role : [role];
  return (user.roles || []).some(userRole => rolesToCheck.includes(userRole));
};

// Check if a user is of a specific account type
export const isAccountType = (user: User | null, type: AccountType | AccountType[]): boolean => {
  if (!user) return false;
  
  const typesToCheck = Array.isArray(type) ? type : [type];
  return typesToCheck.includes(user.accountType);
};
