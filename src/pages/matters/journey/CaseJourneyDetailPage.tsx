
import React from "react";
import { useParams } from "react-router-dom";
import CaseJourneyDetail from "@/components/matters/journey/CaseJourneyDetail";

const CaseJourneyDetailPage: React.FC = () => {
  const { caseId, journeyId } = useParams<{ caseId: string; journeyId: string }>();
  
  return (
    <div className="container py-6 space-y-6 max-w-4xl">
      <CaseJourneyDetail />
    </div>
  );
};

export default CaseJourneyDetailPage;
