
import React from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { GitBranch, GitCommit, Clock, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import VersionHistoryPopover from "./VersionHistoryPopover";
import { JourneyVersionHistory } from "@/types/caseJourney";

interface VersionInfoProps {
  createdAt: string;
  updatedAt: string;
  createdBy: { name: string; id: string };
  updatedBy: { name: string; id: string };
  versionHistory: JourneyVersionHistory[];
}

const VersionInfo: React.FC<VersionInfoProps> = ({
  createdAt,
  updatedAt,
  createdBy,
  updatedBy,
  versionHistory
}) => {
  const currentVersion = versionHistory.length > 0 
    ? Math.max(...versionHistory.map(v => v.version))
    : 1;

  return (
    <div className="flex flex-wrap gap-4 items-center text-xs text-muted-foreground">
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center">
              <GitCommit className="mr-1 h-3 w-3" />
              <span>Created by: {createdBy.name}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{format(parseISO(createdAt), "PPPp")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {createdAt !== updatedAt && (
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>Last updated: {format(parseISO(updatedAt), "MMM d, yyyy")}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{format(parseISO(updatedAt), "PPPp")}</p>
                <p className="text-xs">By: {updatedBy.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      <div className="flex items-center">
        <VersionHistoryPopover 
          versionHistory={versionHistory} 
          currentVersion={currentVersion}
        />
      </div>
    </div>
  );
};

export default VersionInfo;
