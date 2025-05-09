
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Props for the SidebarHeader component
 * @interface SidebarHeaderProps
 * @property {boolean} expanded - Whether the sidebar is expanded or collapsed
 * @property {() => void} toggleSidebar - Function to toggle sidebar expansion state
 */
interface SidebarHeaderProps {
  expanded: boolean;
  toggleSidebar: () => void;
}

/**
 * SidebarHeader component for the top section of the sidebar
 * 
 * Displays the application logo/name and a toggle button to expand/collapse the sidebar.
 * For law firm users, displays their custom logo if available.
 * Adjusts the display based on the sidebar's expansion state.
 * 
 * @param {SidebarHeaderProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const SidebarHeader = ({ expanded, toggleSidebar }: SidebarHeaderProps) => {
  const { user } = useAuth();
  const firmLogo = user?.firmLogo || "/assets/logos/default-logo.png";
  const firmName = user?.firmName || "VakeelPro";
  const shortName = user?.shortName || "VP";

  return (
    <div className="h-16 px-3 border-b flex items-center justify-between bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20">
      {expanded ? (
        <div className="flex items-center">
          {user?.accountType === "ORGANISATION" ? (
            <div className="flex items-center gap-2">
              <img src={firmLogo} alt={firmName} className="h-8 w-8 rounded-md object-contain" />
              <span className="font-semibold text-lg text-primary truncate max-w-[120px]">
                {firmName}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">VP</span>
              </div>
              <span className="font-semibold text-lg text-primary">VakeelPro</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center w-full">
          {user?.accountType === "ORGANISATION" ? (
            <img src={firmLogo} alt={shortName} className="h-8 w-8 rounded-md object-contain" />
          ) : (
            <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">VP</span>
            </div>
          )}
        </div>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className={cn(
          "transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30",
          !expanded && "absolute right-0"
        )}
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {expanded ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
