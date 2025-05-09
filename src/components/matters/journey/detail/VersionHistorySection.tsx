
import React from "react";
import { JourneyVersionHistory } from "@/types/caseJourney";
import VersionHistoryTimeline from "../VersionHistoryTimeline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

interface VersionHistorySectionProps {
  versionHistory: JourneyVersionHistory[];
}

const VersionHistorySection: React.FC<VersionHistorySectionProps> = ({ versionHistory }) => {
  return (
    <Card className="mt-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <History className="h-5 w-5 mr-2" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <VersionHistoryTimeline history={versionHistory} />
      </CardContent>
    </Card>
  );
};

export default VersionHistorySection;
