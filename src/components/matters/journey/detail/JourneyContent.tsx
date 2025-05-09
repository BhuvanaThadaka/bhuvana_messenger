
import React from "react";
import { CaseJourneyEntry } from "@/types/caseJourney";
import JourneyDetailContent from "../JourneyDetailContent";
import JourneyAttachmentList from "../JourneyAttachmentList";
import JourneyDetailFooter from "../JourneyDetailFooter";

interface JourneyContentProps {
  entry: CaseJourneyEntry;
}

const JourneyContent: React.FC<JourneyContentProps> = ({ entry }) => {
  return (
    <div className="space-y-8">
      <JourneyDetailContent entry={entry} />
      
      {entry.attachments && entry.attachments.length > 0 && (
        <JourneyAttachmentList attachments={entry.attachments} />
      )}
      
      <JourneyDetailFooter entry={entry} />
    </div>
  );
};

export default JourneyContent;
