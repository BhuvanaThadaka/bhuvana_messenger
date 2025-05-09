
import React from "react";
import { JourneyVersionHistory, FieldChange } from "@/types/caseJourney";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { History, User, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface VersionHistoryTimelineProps {
  history: JourneyVersionHistory[];
}

const VersionHistoryTimeline: React.FC<VersionHistoryTimelineProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No version history available for this entry.</p>
        </CardContent>
      </Card>
    );
  }

  const getFieldLabel = (field: string): string => {
    switch (field) {
      case "title":
        return "Title";
      case "description":
        return "Description";
      case "status":
        return "Status";
      case "date":
        return "Date";
      default:
        return field.charAt(0).toUpperCase() + field.slice(1);
    }
  };

  const getChangeColor = (field: string): string => {
    switch (field) {
      case "status":
        return "bg-blue-100 text-blue-800";
      case "title":
        return "bg-purple-100 text-purple-800";
      case "description":
        return "bg-green-100 text-green-800";
      case "date":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <History className="h-5 w-5 mr-2" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {history.map((version, index) => (
            <div key={version.id} className="relative pl-8 pb-6">
              {/* Timeline connector */}
              {index !== history.length - 1 && (
                <div className="absolute left-3 top-3 bottom-0 w-px bg-gray-200"></div>
              )}
              
              {/* Version dot */}
              <div className="absolute left-0 top-1.5 rounded-full bg-primary w-6 h-6 flex items-center justify-center text-white text-xs font-bold">
                {version.version}
              </div>
              
              {/* Version content */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-sm mb-2">
                  <User className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="font-medium">{version.modifiedBy.name}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-500">
                    {format(parseISO(version.modifiedAt), "MMM d, yyyy h:mm a")}
                  </span>
                </div>
                
                <Separator className="my-3" />
                
                <div className="space-y-3 mt-2">
                  {version.changes.map((change, i) => (
                    <div key={i} className="text-sm">
                      <Badge className={getChangeColor(change.field)}>
                        {getFieldLabel(change.field)}
                      </Badge>
                      
                      <div className="mt-1 flex items-center">
                        <div className="text-gray-500 line-clamp-1">
                          {change.oldValue || "(empty)"}
                        </div>
                        <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                        <div className="font-medium line-clamp-1">
                          {change.newValue || "(empty)"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VersionHistoryTimeline;
