
import React from "react";
import { format } from "date-fns";
import { CheckCircle2, Clock, AlertCircle, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type TimelineEventStatus = "Completed" | "Pending" | "Adjourned";

interface TimelineEventProps {
  title: string;
  description?: string;
  date: string;
  status: TimelineEventStatus;
  updatedBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
  isLast?: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  title,
  description,
  date,
  status,
  updatedBy,
  isLast = false,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "Adjourned":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getLineColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Adjourned":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="relative flex items-start gap-4 pb-8 last:pb-0">
      {!isLast && (
        <div
          className={`absolute top-7 left-3.5 bottom-0 w-0.5 ${getLineColor()}`}
          aria-hidden="true"
        />
      )}
      <div className="flex-none">{getStatusIcon()}</div>
      <div className="flex-1 pt-0.5">
        <h4 className="font-medium">{title}</h4>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        <div className="flex items-center justify-between mt-2">
          <time className="text-xs text-muted-foreground">{format(new Date(date), "PPP")}</time>
          {updatedBy && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-5 w-5">
                      {updatedBy.avatar ? (
                        <AvatarImage src={updatedBy.avatar} alt={updatedBy.name} />
                      ) : (
                        <AvatarFallback className="text-xs">
                          {updatedBy.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-xs text-muted-foreground">Updated by</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>{updatedBy.name}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent;
