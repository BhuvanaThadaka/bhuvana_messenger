
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeFrameTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TimeFrameTabs = ({ value, onValueChange }: TimeFrameTabsProps) => {
  return (
    <Tabs defaultValue={value} onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TimeFrameTabs;
