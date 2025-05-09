
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import SubNavItem from "./SubNavItem";
import { NavItem as NavItemType } from "@/types/auth";
import { User, AccountType } from "@/types/auth";

/**
 * Props for the ParentNavItem component
 * @interface ParentNavItemProps
 * @property {NavItemType} item - Navigation item data
 * @property {boolean} expanded - Whether the sidebar is expanded
 * @property {boolean} isActive - Whether this parent item is active
 * @property {Object} expandedSubmenus - Object tracking which submenus are expanded
 * @property {(label: string) => void} toggleSubmenu - Function to toggle a submenu's expansion
 * @property {User | null} user - Current user data for permission checking
 * @property {{ pathname: string }} location - Current location for determining active routes
 */
interface ParentNavItemProps {
  item: NavItemType;
  expanded: boolean;
  isActive: boolean;
  expandedSubmenus: {[key: string]: boolean};
  toggleSubmenu: (label: string) => void;
  user: User | null;
  location: { pathname: string };
}

/**
 * ParentNavItem component for rendering navigation items with children
 * 
 * Renders a collapsible navigation section with submenu items.
 * Handles user permission checking for displaying child items.
 * Manages expansion state and styling based on active routes.
 * 
 * @param {ParentNavItemProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const ParentNavItem = ({ 
  item, 
  expanded, 
  isActive, 
  expandedSubmenus, 
  toggleSubmenu, 
  user, 
  location 
}: ParentNavItemProps) => {
  const isExpanded = expandedSubmenus[item.label] || isActive;
  
  /**
   * Checks if user has necessary permissions to see a module
   * 
   * @param {User | null} user - The current user
   * @param {string} module - Module name to check permissions for
   * @param {string} [action] - Optional specific action to check
   * @returns {boolean} - Whether user has access
   */
  const hasAccess = (
    user: User | null, 
    module: string, 
    action?: string
  ): boolean => {
    if (!user) return false;
    
    // Super admin has access to everything
    if (user.accountType === AccountType.SUPER_ADMIN) return true;
    
    // Check if user has the module permission in featurePrivileges
    if (!user.featurePrivileges) return false;
    
    const modulePermission = user.featurePrivileges[module];
    
    if (!modulePermission) return false;
    
    // If action is specified, check if user has that action permission
    if (action) {
      return modulePermission.includes(action);
    }
    
    // If no action specified, user has some permission for this module
    return modulePermission.length > 0;
  };

  return (
    <div className="space-y-1">
      <button
        onClick={() => toggleSubmenu(item.label)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
          !expanded && "justify-center"
        )}
        aria-expanded={isExpanded}
        aria-controls={`submenu-${item.label}`}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-6 h-6">
            <item.icon className="size-5" />
          </div>
          {expanded && <span className="ml-3 truncate">{item.label}</span>}
        </div>
        {expanded && (isExpanded ? 
          <ChevronUp className="size-4" /> : 
          <ChevronDown className="size-4" />
        )}
      </button>
      
      {expanded && isExpanded && item.children && (
        <div 
          id={`submenu-${item.label}`} 
          className="pl-6 space-y-1 ml-2 border-l border-indigo-100 dark:border-indigo-800/50"
        >
          {item.children.map(subItem => {
            // Only show submenu items the user has access to
            if (!hasAccess(user, subItem.module, subItem.requiredAction)) {
              return null;
            }
            
            const isSubActive = location.pathname === subItem.href || 
                               location.pathname.startsWith(`${subItem.href}/`);
            
            return (
              <SubNavItem
                key={subItem.href}
                href={subItem.href}
                icon={subItem.icon}
                label={subItem.label}
                isActive={isSubActive}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ParentNavItem;
