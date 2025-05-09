
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CaseTypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CaseTypeBadge: React.FC<CaseTypeBadgeProps> = ({ type, size = "md", className = "" }) => {
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
      variant="secondary" 
      className={`${getSizeClasses(size)} ${className}`}
    >
      {type}
    </Badge>
  );
};

export default CaseTypeBadge;
