
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Hearing {
  id: string;
  caseId: string;
  caseTitle: string;
  date: string;
  time: string;
  court: string;
}

interface UpcomingHearingsCardProps {
  hearings: Hearing[];
  className?: string;
}

const UpcomingHearingsCard: React.FC<UpcomingHearingsCardProps> = ({ hearings, className = "" }) => {
  const navigate = useNavigate();

  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Hearings</CardTitle>
      </CardHeader>
      <CardContent>
        {hearings.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Calendar className="mx-auto h-8 w-8 mb-2 text-muted-foreground/60" />
            <p>No upcoming hearings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {hearings.map((hearing) => (
              <div
                key={hearing.id}
                className="flex items-start border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 mr-3 bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{hearing.caseTitle}</p>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {format(new Date(hearing.date), "dd MMM yyyy")} at {hearing.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{hearing.court}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => handleViewCase(hearing.caseId)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingHearingsCard;
