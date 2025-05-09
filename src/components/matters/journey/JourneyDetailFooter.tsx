
import React from "react";
import { CaseJourneyEntry } from "@/types/caseJourney";
import { Separator } from "@/components/ui/separator";
import { User, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

interface JourneyDetailFooterProps {
  entry: CaseJourneyEntry;
}

const JourneyDetailFooter: React.FC<JourneyDetailFooterProps> = ({ entry }) => {
  return (
    <>
      <Separator />
      
      <div className="flex flex-col space-y-2 text-sm">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-500">Created by:</span>
          <span className="ml-1 font-medium">{entry.createdBy.name}</span>
          <span className="ml-2 text-gray-500">
            {format(parseISO(entry.createdAt), "MMM d, yyyy h:mm a")}
          </span>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-500">Last updated:</span>
          <span className="ml-1 font-medium">{entry.updatedBy.name}</span>
          <span className="ml-2 text-gray-500">
            {format(parseISO(entry.updatedAt), "MMM d, yyyy h:mm a")}
          </span>
        </div>
      </div>
    </>
  );
};

export default JourneyDetailFooter;
