
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { History, CalendarDays, GitBranch, GitCommit } from "lucide-react";
import TimelineTab from "./TimelineTab";
import CalendarTab from "./CalendarTab";
import CommitLogTab from "./CommitLogTab";

interface JourneyTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  timelineEvents: any[];
  canUpdate: boolean;
}

const JourneyTabs: React.FC<JourneyTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  timelineEvents, 
  canUpdate 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="timeline" className="flex items-center">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="commitLog" className="flex items-center">
            <GitBranch className="h-4 w-4 mr-2" />
            Commit Log
          </TabsTrigger>
        </TabsList>
        
        {canUpdate && (
          <Button size="sm">
            <GitCommit className="h-4 w-4 mr-2" />
            New Commit
          </Button>
        )}
      </div>
      
      <TabsContent value="timeline" className="mt-6">
        <TimelineTab 
          timelineEvents={timelineEvents} 
          canUpdate={canUpdate} 
        />
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-6">
        <CalendarTab />
      </TabsContent>
      
      <TabsContent value="commitLog" className="mt-6">
        <CommitLogTab timelineEvents={timelineEvents} />
      </TabsContent>
    </Tabs>
  );
};

export default JourneyTabs;
