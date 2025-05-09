
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { usePermissions } from "@/hooks/usePermissions";
import { Modules } from "@/types/auth";

interface CaseJourneyHeaderProps {
  caseData: {
    id: string;
    title?: string;
    caseTitle?: string;
    status?: string;
    priority?: string;
    type?: string;
    lastUpdated?: string;
    caseNumber?: string;
    courtType?: string;
    caseType?: string;
    court?: string;
  };
}

const CaseJourneyHeader: React.FC<CaseJourneyHeaderProps> = ({ caseData }) => {
  const navigate = useNavigate();
  const permissions = usePermissions(Modules.CaseManagement);
  
  // Handle both Matter and LegalCase data models
  const title = caseData.title || caseData.caseTitle || "Case Details";
  const type = caseData.type || caseData.caseType || "";
  const caseNumber = caseData.caseNumber || "";
  const courtInfo = caseData.courtType || caseData.court || "";

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/matters')} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Matters
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <div>
              <div className="text-sm text-muted-foreground">{caseNumber}</div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <div className="flex mt-2 gap-2">
                {type && <Badge variant="outline">{type}</Badge>}
                {courtInfo && <Badge variant="secondary">{courtInfo}</Badge>}
              </div>
            </div>
            {permissions.canUpdate && (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/matters/edit/${caseData.id}`)}
              >
                Edit Case
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CaseJourneyHeader;
