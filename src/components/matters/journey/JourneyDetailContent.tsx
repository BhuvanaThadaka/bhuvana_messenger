
import React from "react";
import { CaseJourneyEntry } from "@/types/caseJourney";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { getStatusColor } from "./JourneyDetailHeader";

interface JourneyDetailContentProps {
  entry: CaseJourneyEntry;
}

const JourneyDetailContent: React.FC<JourneyDetailContentProps> = ({ entry }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{entry.title}</CardTitle>
            <CardDescription className="mt-1">
              <span className="inline-flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {format(parseISO(entry.date), "PPP")}
              </span>
            </CardDescription>
          </div>
          <Badge className={getStatusColor(entry.status)}>
            {entry.status.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
          <p className="text-sm">{entry.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyDetailContent;
