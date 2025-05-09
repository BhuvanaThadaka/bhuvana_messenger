
import React from "react";
import { Badge } from "@/components/ui/badge";

type StatusType = "Open" | "Pending" | "Closed" | "Draft" | "Submitted" | "Reviewed" | "Approved";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md", className = "" }) => {
  const getStatusVariant = (status: StatusType) => {
    switch (status) {
      case "Open":
        return "default";
      case "Pending":
        return "warning";
      case "Closed":
        return "secondary";
      case "Draft":
        return "outline";
      case "Submitted":
        return "default";
      case "Reviewed":
        return "success";
      case "Approved":
        return "success";
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
      variant={getStatusVariant(status)} 
      className={`${getSizeClasses(size)} ${className}`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
