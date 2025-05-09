
import React from "react";
import { Badge } from "@/components/ui/badge";

type PriorityType = "High" | "Medium" | "Low";

interface PriorityBadgeProps {
  priority: PriorityType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = "md", className = "" }) => {
  const getPriorityVariant = (priority: PriorityType) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "outline";
      default:
        return "default";
    }
  };

  const getSizeClasses = (size: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-sm px-3 py-1";
      default:
        return ""; // Default size from Badge component
    }
  };

  return (
    <Badge 
      variant={getPriorityVariant(priority)} 
      className={`${getSizeClasses(size)} ${className}`}
    >
      {priority}
    </Badge>
  );
};

export default PriorityBadge;
