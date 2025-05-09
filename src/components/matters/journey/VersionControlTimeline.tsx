
import React from "react";
import { Button } from "@/components/ui/button";
import { GitCommit, Undo, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { History } from "lucide-react";
import { format } from "date-fns";

interface VersionControlTimelineProps {
  timelineEvents: any[];
  canUpdate: boolean;
}

const VersionControlTimeline: React.FC<VersionControlTimelineProps> = ({ 
  timelineEvents, 
  canUpdate 
}) => {
  // Function to format event status as Git commit metaphor
  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">Committed</Badge>;
      case "Pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Staged</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">In Progress</Badge>;
      case "Adjourned":
        return <Badge variant="outline" className="text-purple-500 border-purple-500">Branched</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!timelineEvents || timelineEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <History className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No History Events</h3>
        <p className="text-muted-foreground mt-1">
          This case doesn't have any history events yet.
        </p>
        
        {canUpdate && (
          <Button className="mt-4">
            <GitCommit className="h-4 w-4 mr-2" />
            Add First Event
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {timelineEvents.map((event: any) => (
        <div key={event.id} className="flex gap-4 pb-6 border-l-2 border-gray-200 pl-6 relative">
          {/* Commit marker */}
          <div className="absolute -left-2 top-0">
            <div className="bg-primary h-4 w-4 rounded-full" />
          </div>
          
          <div className="w-full bg-card rounded-lg border p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium flex items-center">
                  <GitCommit className="h-4 w-4 mr-2 text-primary" />
                  {event.title}
                </h4>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span className="h-3 w-3 mr-1" />
                  {format(new Date(event.date), "MMM d, yyyy 'at' h:mm a")}
                </div>
              </div>
              {getEventStatusBadge(event.status)}
            </div>
            
            <p className="text-sm">{event.description}</p>
            
            <Separator className="my-3" />
            
            <div className="flex justify-between items-center">
              {/* Author info */}
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={event.updatedBy?.avatar} />
                  <AvatarFallback className="text-xs">
                    {event.updatedBy?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">
                  <span className="font-medium">{event.updatedBy?.name || "Unknown"}</span>
                  {" authored"}
                </span>
              </div>
              
              {/* Action buttons */}
              {canUpdate && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Amend
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Undo className="h-3 w-3 mr-1" />
                    Revert
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VersionControlTimeline;
