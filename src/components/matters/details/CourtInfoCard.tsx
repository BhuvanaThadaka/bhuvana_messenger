
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CourtInfoCardProps {
  courtName: string;
  filingDate?: string;
  hearingDate?: string;
  judge?: string;
  caseNumber?: string;
  className?: string;
}

const CourtInfoCard: React.FC<CourtInfoCardProps> = ({
  courtName,
  filingDate,
  hearingDate,
  judge,
  caseNumber,
  className = "",
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Court Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-3">
          <div className="bg-muted rounded-full p-2">
            <Gavel className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium">{courtName}</h4>
            {caseNumber && (
              <p className="text-sm text-muted-foreground mt-1">Case Number: {caseNumber}</p>
            )}
            {judge && (
              <p className="text-sm text-muted-foreground">Judge: {judge}</p>
            )}
            
            {(filingDate || hearingDate) && (
              <div className="mt-3 space-y-2">
                {filingDate && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span>Filed: {format(new Date(filingDate), "PPP")}</span>
                  </div>
                )}
                {hearingDate && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span>Next Hearing: {format(new Date(hearingDate), "PPP")}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourtInfoCard;
