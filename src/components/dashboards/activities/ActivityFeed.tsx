
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Activity {
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
}

export interface ActivityFeedProps {
  title: string;
  description: string;
  activities: Activity[];
  loading?: boolean;
  className?: string;
}

const ActivityFeed = ({ 
  title, 
  description, 
  activities,
  loading = false,
  className
}: ActivityFeedProps) => {
  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
            ))
          ) : (
            activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.desc}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
