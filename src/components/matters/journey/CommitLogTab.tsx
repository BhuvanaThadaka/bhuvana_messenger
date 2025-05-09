
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GitBranch, GitCommit, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface CommitLogTabProps {
  timelineEvents: any[];
}

const CommitLogTab: React.FC<CommitLogTabProps> = ({ timelineEvents }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GitBranch className="h-5 w-5 mr-2" />
          Commit Log
        </CardTitle>
        <CardDescription>
          View all changes made to this case in a commit-style log
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-card">
          <div className="flex items-center p-4 border-b">
            <div className="w-1/2 font-medium">Commit</div>
            <div className="w-1/4 font-medium">Author</div>
            <div className="w-1/4 font-medium">Date</div>
          </div>
          
          {timelineEvents && timelineEvents.length > 0 ? (
            timelineEvents.map((event: any) => (
              <div key={event.id} className="flex items-center p-4 hover:bg-muted/50">
                <div className="w-1/2 flex items-center">
                  <GitCommit className="h-4 w-4 mr-2 text-primary" />
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs text-muted-foreground">{event.id.substring(0, 8)}</div>
                  </div>
                </div>
                <div className="w-1/4 flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={event.updatedBy?.avatar} />
                    <AvatarFallback className="text-xs">{event.updatedBy?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{event.updatedBy?.name || "Unknown"}</span>
                </div>
                <div className="w-1/4 text-sm">
                  {format(new Date(event.date), "MMM d, yyyy")}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Commits</h3>
              <p className="text-muted-foreground mt-1">
                This case doesn't have any commits yet.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommitLogTab;
