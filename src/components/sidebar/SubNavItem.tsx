
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Props for the SubNavItem component
 * @interface SubNavItemProps
 * @property {string} href - URL to navigate to when the item is clicked
 * @property {React.ElementType} icon - Icon component to display
 * @property {string} label - Text to display next to the icon
 * @property {boolean} isActive - Whether this item is currently active
 */
interface SubNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

/**
 * SubNavItem component for rendering second-level navigation items in the sidebar
 * 
 * Used within a parent navigation item to show nested navigation options.
 * Displays a different styling when active vs inactive.
 * 
 * @param {SubNavItemProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const SubNavItem = ({ href, icon: Icon, label, isActive }: SubNavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-md transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
      )}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <Icon className="size-5" />
      </div>
      <span className="ml-3 truncate">{label}</span>
    </Link>
  );
};

export default SubNavItem;
