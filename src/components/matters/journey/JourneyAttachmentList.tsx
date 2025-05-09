
import React from "react";
import { Attachment } from "@/types/caseJourney";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";

interface JourneyAttachmentListProps {
  attachments: Attachment[];
}

const JourneyAttachmentList: React.FC<JourneyAttachmentListProps> = ({ attachments }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
      <div className="space-y-2">
        {attachments.map((attachment) => (
          <div key={attachment.id} className="flex items-center p-2 bg-gray-50 rounded-md">
            <FileText className="h-4 w-4 mr-2 text-blue-500" />
            <div className="flex-1">
              <div className="text-sm font-medium">{attachment.name}</div>
              <div className="text-xs text-gray-500">
                {Math.round(attachment.size / 1024)} KB • 
                {format(parseISO(attachment.uploadedAt), " MMM d, yyyy")}
              </div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyAttachmentList;
