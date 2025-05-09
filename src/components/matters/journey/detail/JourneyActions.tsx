
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import JourneyDetailHeader from "../JourneyDetailHeader";
import { CaseJourneyEntry } from "@/types/caseJourney";
import { deleteCaseJourneyEntry } from "@/services/caseJourneyService";

interface JourneyActionsProps {
  entry: CaseJourneyEntry;
  caseId: string;
  canEditJourney: boolean;
}

const JourneyActions: React.FC<JourneyActionsProps> = ({ 
  entry, 
  caseId, 
  canEditJourney 
}) => {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleDelete = async () => {
    if (!entry.id || !caseId) return;
    
    try {
      setDeleting(true);
      await deleteCaseJourneyEntry(entry.id);
      
      toast({
        title: "Success",
        description: "Journey entry deleted successfully",
      });
      
      navigate(`/cases/${caseId}/journey`);
    } catch (err: any) {
      console.error("Error deleting journey entry:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to delete journey entry",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };
  
  return (
    <JourneyDetailHeader 
      entry={entry} 
      canEditJourney={canEditJourney} 
      onBack={() => navigate(`/cases/${caseId}/journey`)} 
      onEdit={() => navigate(`/cases/${caseId}/journey/edit/${entry.id}`)}
      onDelete={handleDelete}
      deleting={deleting}
    />
  );
};

export default JourneyActions;
