
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  loading?: boolean;
  trend?: string;
  trendUp?: boolean;
}

const MetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  loading = false,
  trend,
  trendUp 
}: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{title}</h3>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        
        {loading ? (
          <>
            <Skeleton className="h-9 w-3/4 mt-2" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
            {trend && (
              <div className={cn(
                "text-xs font-medium mt-2",
                trendUp ? "text-green-600" : "text-red-600"
              )}>
                {trend}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
