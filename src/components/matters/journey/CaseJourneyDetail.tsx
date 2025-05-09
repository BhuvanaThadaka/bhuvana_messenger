
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CaseJourneyEntry } from "@/types/caseJourney";
import { getCaseJourneyEntry, getJourneyVersionHistory } from "@/services/caseJourneyService";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState } from "./LoadingState";
import ErrorState from "./ErrorState";
import JourneyActions from "./detail/JourneyActions";
import JourneyContent from "./detail/JourneyContent";
import VersionHistorySection from "./detail/VersionHistorySection";
import { toUIJourneyEntry } from "@/services/journey/journeyTypeAdapter";

const CaseJourneyDetail: React.FC = () => {
  const { caseId, journeyId } = useParams<{ caseId: string; journeyId: string }>();
  const [entry, setEntry] = useState<CaseJourneyEntry | null>(null);
  const [versionHistory, setVersionHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const canEditJourney = user?.roles.some(role => ["LAWYER", "ADMIN"].includes(role)) || false;

  useEffect(() => {
    const fetchData = async () => {
      if (!journeyId) {
        setError("Journey ID is missing");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching journey entry:", journeyId);
        // Fetch journey entry details
        const entryData = await getCaseJourneyEntry(journeyId);
        console.log("Journey entry data:", entryData);

        // Convert service model to UI model using the adapter
        const uiEntryData = toUIJourneyEntry(entryData);
        setEntry(uiEntryData);
        
        // Fetch version history
        console.log("Fetching version history for:", journeyId);
        const historyData = await getJourneyVersionHistory(journeyId);
        console.log("Version history data:", historyData);
        setVersionHistory(historyData);
      } catch (err: any) {
        console.error("Error fetching journey details:", err);
        setError(err.message || "Failed to load journey details");
        toast({
          title: "Error",
          description: "Failed to load case journey details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [journeyId, toast]);
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error || !entry || !caseId) {
    return <ErrorState error={error || "Journey entry not found"} backUrl={`/cases/${caseId}/journey`} />;
  }
  
  return (
    <div className="space-y-8">
      {/* Journey header with actions */}
      <JourneyActions 
        entry={entry} 
        caseId={caseId} 
        canEditJourney={canEditJourney} 
      />
      
      {/* Journey content */}
      <JourneyContent entry={entry} />
      
      {/* Version history */}
      <VersionHistorySection versionHistory={versionHistory} />
    </div>
  );
};

export default CaseJourneyDetail;
