
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CaseSummaryCardProps {
  title: string;
  count: number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  viewAllLink?: string;
  className?: string;
}

const CaseSummaryCard: React.FC<CaseSummaryCardProps> = ({
  title,
  count,
  icon = <FileText className="h-5 w-5" />,
  trend,
  viewAllLink,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <div className="rounded-full bg-muted p-1.5">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"} mt-1`}>
            {trend.isPositive ? "+" : "-"}{trend.value}% from last month
          </p>
        )}
      </CardContent>
      {viewAllLink && (
        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            className="p-0 h-auto text-sm text-muted-foreground"
            onClick={() => navigate(viewAllLink)}
          >
            View all
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CaseSummaryCard;
