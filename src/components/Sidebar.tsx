
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import { navItems } from "./sidebar/navItems";

/**
 * Main Sidebar component for the application
 * 
 * Renders a responsive sidebar that can be expanded or collapsed.
 * Contains the application logo, navigation items, and handles
 * responsive behavior based on screen size.
 * 
 * @returns {JSX.Element} - Rendered component
 */
const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div
      className={cn(
        "h-screen bg-white dark:bg-gray-900 border-r border-indigo-100 dark:border-indigo-800/30 transition-all duration-300 shadow-lg",
        expanded ? "w-64" : "w-16"
      )}
    >
      <SidebarHeader 
        expanded={expanded} 
        toggleSidebar={() => setExpanded(!expanded)} 
      />
      
      <div className="overflow-y-auto h-[calc(100vh-4rem)] fancy-scrollbar">
        <SidebarNavigation 
          expanded={expanded} 
          navItems={navItems} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
