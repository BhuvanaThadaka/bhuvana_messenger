
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";
import VersionControlTimeline from "./VersionControlTimeline";

interface TimelineTabProps {
  timelineEvents: any[];
  canUpdate: boolean;
}

const TimelineTab: React.FC<TimelineTabProps> = ({ timelineEvents, canUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="h-5 w-5 mr-2" />
          Case History
        </CardTitle>
        <CardDescription>
          Complete chronological history of all case events and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VersionControlTimeline 
          timelineEvents={timelineEvents} 
          canUpdate={canUpdate} 
        />
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
