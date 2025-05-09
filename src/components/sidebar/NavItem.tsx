
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Props for the NavItem component
 * @interface NavItemProps
 * @property {string} href - URL to navigate to when the item is clicked
 * @property {React.ElementType} icon - Icon component to display
 * @property {string} label - Text to display next to the icon
 * @property {boolean} isActive - Whether this item is currently active
 * @property {boolean} expanded - Whether the sidebar is expanded or collapsed
 */
interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  expanded: boolean;
}

/**
 * Navigation item component for the sidebar
 * 
 * Renders a navigation link with an icon and optional label based on sidebar expansion state.
 * Displays a different styling when active vs inactive.
 * 
 * @param {NavItemProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const NavItem = ({ href, icon: Icon, label, isActive, expanded }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-md transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
        !expanded ? "justify-center" : ""
      )}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <Icon className="size-5" />
      </div>
      {expanded && <span className="ml-3 truncate">{label}</span>}
    </Link>
  );
};

export default NavItem;
