
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import { CaseStage } from "@/types/matter";

const statusVariants = cva("font-medium", {
  variants: {
    status: {
      active: "bg-green-100 text-green-800 border-green-300",
      inactive: "bg-gray-100 text-gray-800 border-gray-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      completed: "bg-blue-100 text-blue-800 border-blue-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
      high: "bg-red-100 text-red-800 border-red-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      low: "bg-blue-100 text-blue-800 border-blue-300",
      // Add mappings for CaseStage values
      "Filing": "bg-purple-100 text-purple-800 border-purple-300",
      "Initial Hearing": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "Evidence": "bg-blue-100 text-blue-800 border-blue-300",
      "Arguments": "bg-orange-100 text-orange-800 border-orange-300",
      "Judgment": "bg-green-100 text-green-800 border-green-300",
      "Appeal": "bg-red-100 text-red-800 border-red-300",
      "Closed": "bg-gray-100 text-gray-800 border-gray-300",
    },
  },
  defaultVariants: {
    status: "inactive",
  },
});

interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "completed" | "cancelled" | "high" | "medium" | "low" | CaseStage;
  showDot?: boolean;
}

const StatusBadge = ({ status, showDot = true }: StatusBadgeProps) => {
  return (
    <Badge variant="outline" className={statusVariants({ status })}>
      {showDot && (
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-current" />
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusBadge;
