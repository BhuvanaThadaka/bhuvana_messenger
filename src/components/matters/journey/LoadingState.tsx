
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Loader2 } from "lucide-react";

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="outline"
          className="mr-4"
          disabled
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span>Loading journey details...</span>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
};
