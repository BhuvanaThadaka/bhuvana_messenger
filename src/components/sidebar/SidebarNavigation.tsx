
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth, hasAccess } from "@/contexts/AuthContext";
import { User, AccountType, Modules } from "@/types/auth";
import { NavItem } from "@/types/auth";
import NavItemComponent from "./NavItem";
import ParentNavItem from "./ParentNavItem";

interface SidebarNavigationProps {
  expanded: boolean;
  navItems: NavItem[];
}

const SidebarNavigation = ({ expanded, navItems }: SidebarNavigationProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const [expandedSubmenus, setExpandedSubmenus] = useState<{ [key: string]: boolean }>({});
  
  // Toggle a submenu's expanded state
  const toggleSubmenu = (label: string) => {
    setExpandedSubmenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Check if user has necessary permissions to see a module
  const hasAccessToModule = (
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
  
  // Filter nav items based on user permissions - for SUPER_ADMIN, show all items
  const filteredNavItems = navItems.filter(item => {
    // Super admin sees everything
    if (user?.accountType === AccountType.SUPER_ADMIN) {
      return true;
    }

    // Check if accountType restriction applies and if user has the required account type
    if (item.accountTypes && user) {
      if (!item.accountTypes.includes(user.accountType)) {
        return false;
      }
    }
    
    // Check module permission
    return hasAccessToModule(user, item.module, item.requiredAction);
  });
  
  // Recursively render nav items
  const renderNavItems = (items: NavItem[]) => {
    return items.map(item => {
      const isActive = location.pathname === item.href ||
                       location.pathname.startsWith(`${item.href}/`);
                       
      // Handle items with children
      if (item.children && item.children.length > 0) {
        return (
          <ParentNavItem
            key={item.href}
            item={item}
            expanded={expanded}
            isActive={isActive}
            expandedSubmenus={expandedSubmenus}
            toggleSubmenu={toggleSubmenu}
            user={user}
            location={location}
          />
        );
      }
      
      // Regular nav items
      return (
        <NavItemComponent
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={isActive}
          expanded={expanded}
        />
      );
    });
  };
  
  return (
    <div className="space-y-2 p-4 overflow-y-auto">
      {renderNavItems(filteredNavItems)}
    </div>
  );
};

export default SidebarNavigation;
