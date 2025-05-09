
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import PriorityBadge from "../common/PriorityBadge";
import CaseTypeBadge from "../common/CaseTypeBadge";

interface CaseInfoHeaderProps {
  id: string;
  title: string;
  status: string;
  priority: string;
  type: string;
  lastUpdated: string;
  onEdit?: () => void;
  showBackButton?: boolean;
  className?: string;
}

const CaseInfoHeader: React.FC<CaseInfoHeaderProps> = ({
  id,
  title,
  status,
  priority,
  type,
  lastUpdated,
  onEdit,
  showBackButton = true,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`space-y-4 ${className}`}>
      {showBackButton && (
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      
      <div>
        <div className="text-sm text-muted-foreground">Case ID: {id}</div>
        <h1 className="text-2xl font-bold mt-1">{title}</h1>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <StatusBadge status={status as any} />
          <PriorityBadge priority={priority as any} />
          <CaseTypeBadge type={type} />
        </div>
        
        <div className="text-sm text-muted-foreground mt-2">
          Last Updated: {lastUpdated}
        </div>
        
        {onEdit && (
          <Button 
            variant="outline" 
            onClick={onEdit} 
            className="mt-3"
          >
            Edit Case
          </Button>
        )}
      </div>
    </div>
  );
};

export default CaseInfoHeader;
