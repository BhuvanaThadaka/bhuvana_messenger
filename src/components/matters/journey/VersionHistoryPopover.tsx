
import React from "react";
import { format, parseISO } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GitBranch, ArrowRight, History, RefreshCw } from "lucide-react";
import { JourneyVersionHistory } from "@/types/caseJourney";

interface VersionHistoryPopoverProps {
  versionHistory: JourneyVersionHistory[];
  currentVersion: number;
  onRevertToVersion?: (version: number) => void;
}

const VersionHistoryPopover: React.FC<VersionHistoryPopoverProps> = ({
  versionHistory,
  currentVersion,
  onRevertToVersion
}) => {
  if (!versionHistory || versionHistory.length === 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        <History className="mr-2 h-4 w-4" />
        No History
      </Button>
    );
  }

  const sortedHistory = [...versionHistory].sort((a, b) => b.version - a.version);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <GitBranch className="mr-2 h-4 w-4" />
          v{currentVersion}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Version History</h4>
          <p className="text-xs text-muted-foreground">Current version: {currentVersion}</p>
          <Separator />
          
          <div className="max-h-80 overflow-y-auto space-y-4 py-2">
            {sortedHistory.map((version) => (
              <div
                key={version.id}
                className={`p-2 rounded-md ${
                  version.version === currentVersion ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <Badge variant={version.version === currentVersion ? "default" : "outline"}>
                    v{version.version}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(parseISO(version.modifiedAt), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                
                <div className="text-xs mb-2">
                  Modified by: <span className="font-medium">{version.modifiedBy.name}</span>
                </div>
                
                <div className="space-y-1">
                  {version.changes.map((change, idx) => (
                    <div key={idx} className="text-xs flex items-center gap-1">
                      <span className="text-muted-foreground w-20 truncate">{change.field}:</span>
                      <span className="text-muted-foreground truncate">{change.oldValue || "(empty)"}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                      <span className="truncate">{change.newValue || "(empty)"}</span>
                    </div>
                  ))}
                </div>
                
                {version.version !== currentVersion && onRevertToVersion && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => onRevertToVersion(version.version)}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Revert to this version
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VersionHistoryPopover;
