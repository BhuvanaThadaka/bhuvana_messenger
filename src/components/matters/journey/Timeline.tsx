
import React from "react";
import TimelineEvent, { TimelineEventStatus } from "./TimelineEvent";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  status: TimelineEventStatus;
  updatedBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface TimelineProps {
  events: TimelineItem[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ events, className = "" }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No timeline events available</p>
      </div>
    );
  }

  // Sort events by date (newest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={`space-y-2 ${className}`}>
      {sortedEvents.map((event, index) => (
        <TimelineEvent
          key={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          status={event.status}
          updatedBy={event.updatedBy}
          isLast={index === sortedEvents.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
