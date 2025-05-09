
import { useAuth, hasAccess } from "@/contexts/AuthContext";
import { Modules } from "@/types/auth";

// Types of actions a user can perform
type ActionType = "VIEW" | "CREATE" | "UPDATE" | "DELETE" | "APPROVE" | "ASSIGN";

interface PermissionResult {
  hasAccess: boolean;
  canView: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canAssign: boolean;
  isLoading: boolean;
}

/**
 * Custom hook to check user permissions for a specific module
 * 
 * @param module - The module to check permissions for
 * @returns Object with permission check methods
 */
export const usePermissions = (module: Modules): PermissionResult => {
  const { user, isLoading } = useAuth();
  
  // Check general access to the module
  const checkAccess = (action?: ActionType): boolean => {
    return hasAccess(user, module, action);
  };
  
  return {
    hasAccess: checkAccess(),
    canView: checkAccess("VIEW"),
    canCreate: checkAccess("CREATE"),
    canUpdate: checkAccess("UPDATE"),
    canDelete: checkAccess("DELETE"),
    canApprove: checkAccess("APPROVE"),
    canAssign: checkAccess("ASSIGN"),
    isLoading
  };
};

/**
 * Utility to check if a user has a specific account type
 * 
 * @param accountTypes - Account types to check for
 * @returns Boolean indicating if user has one of the specified account types
 */
export const useAccountTypeCheck = (accountTypes: string | string[]): boolean => {
  const { user } = useAuth();
  
  if (!user) return false;
  
  const typesToCheck = Array.isArray(accountTypes) ? accountTypes : [accountTypes];
  return typesToCheck.includes(user.accountType);
};

/**
 * Check if user has a specific role
 */
export const useRoleCheck = (roles: string | string[]): boolean => {
  const { user } = useAuth();
  
  if (!user) return false;
  
  const rolesToCheck = Array.isArray(roles) ? roles : [roles];
  return user.roles.some(role => rolesToCheck.includes(role));
};
