
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, AlertTriangle, Loader2, Pencil, Eye } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { Modules } from "@/types/auth";
import { getPlans, updateSubscriptionPlan } from "@/services/mockPlanService";
import { SubscriptionPlan } from "@/types/plan";
import { useApiRequest } from "@/hooks/useApiRequest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Plans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");
  
  const permissions = usePermissions(Modules.PlanManagement);

  // Use the custom API request hook for toggling plan status
  const { execute: togglePlanStatus, isLoading: isToggling } = useApiRequest<
    { id: string; isActive: boolean },
    { data: SubscriptionPlan }
  >(
    async ({ id, isActive }) => {
      return await updateSubscriptionPlan(id, { isActive });
    },
    {
      showSuccessToast: true,
      successMessage: "Plan status updated successfully",
    }
  );

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getPlans();
        setPlans(response.data);
      } catch (err) {
        setError("Failed to load subscription plans");
        console.error("Error loading plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    // Toggle the status
    const result = await togglePlanStatus({ id, isActive: !currentStatus });
    
    if (result) {
      // Update the local state to reflect the change
      setPlans(plans.map(plan => 
        plan.id === id ? { ...plan, isActive: !currentStatus } : plan
      ));
    }
  };

  const filteredPlans = plans.filter(plan => plan.billing.toLowerCase() === activeTab);

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
              <CardTitle>Error</CardTitle>
            </div>
            <CardDescription>There was a problem loading the subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
          <p className="text-muted-foreground mt-1">
            Manage subscription plans and pricing for the platform
          </p>
        </div>
        
        {permissions.canCreate && (
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Plan</span>
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "monthly" | "yearly")} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="monthly">Monthly Plans</TabsTrigger>
          <TabsTrigger value="yearly">Yearly Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                canEdit={permissions.canUpdate}
                canToggle={permissions.canUpdate}
                onToggleStatus={handleToggleStatus}
                isToggling={isToggling}
              />
            ))}
            
            {filteredPlans.length === 0 && (
              <div className="md:col-span-3 p-6 text-center border rounded-lg">
                <p className="text-muted-foreground">No monthly plans available</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="yearly" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                canEdit={permissions.canUpdate}
                canToggle={permissions.canUpdate}
                onToggleStatus={handleToggleStatus}
                isToggling={isToggling}
              />
            ))}
            
            {filteredPlans.length === 0 && (
              <div className="md:col-span-3 p-6 text-center border rounded-lg">
                <p className="text-muted-foreground">No yearly plans available</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface PlanCardProps {
  plan: SubscriptionPlan;
  canEdit: boolean;
  canToggle: boolean;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  isToggling: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  canEdit,
  canToggle,
  onToggleStatus,
  isToggling,
}) => {
  return (
    <Card className={`relative overflow-hidden ${!plan.isActive ? "opacity-70" : ""}`}>
      {!plan.isActive && (
        <div className="absolute top-0 right-0">
          <Badge variant="secondary" className="m-2">
            Inactive
          </Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground ml-1">/{plan.billing.toLowerCase()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32">
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
        
        <Separator className="my-4" />
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
          
          {canEdit && (
            <Button variant="outline" size="sm" className="flex-1">
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
          
          {canToggle && (
            <Button
              variant={plan.isActive ? "destructive" : "default"}
              size="sm"
              className="flex-1"
              onClick={() => onToggleStatus(plan.id, plan.isActive)}
              disabled={isToggling}
            >
              {isToggling ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <>{plan.isActive ? "Disable" : "Enable"}</>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Plans;
