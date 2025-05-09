
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const CalendarTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          Calendar View
        </CardTitle>
        <CardDescription>
          View all case events on a calendar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CalendarDays className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Calendar View</h3>
          <p className="text-muted-foreground mt-1">
            Calendar view of case events will be displayed here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarTab;
