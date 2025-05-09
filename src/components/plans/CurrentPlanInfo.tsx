
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, ArrowUpRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Feature {
  name: string;
  included: boolean;
}

interface PlanData {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: Feature[];
  active: boolean;
  expiryDate?: string;
}

// Mock data - in a real app this would come from an API call
const mockCurrentPlan: PlanData = {
  id: "plan-pro-12345",
  name: "Professional",
  description: "For small and medium law firms",
  price: 49.99,
  billingCycle: "monthly",
  active: true,
  expiryDate: "2025-06-15",
  features: [
    { name: "Unlimited cases", included: true },
    { name: "User management", included: true },
    { name: "Role management", included: true },
    { name: "10 users included", included: true },
    { name: "Email notifications", included: true },
    { name: "Document management", included: true },
    { name: "Custom branding", included: false },
    { name: "API access", included: false },
    { name: "Advanced analytics", included: false },
  ]
};

const CurrentPlanInfo = () => {
  const plan = mockCurrentPlan;
  
  // Format date for display
  const formattedExpiryDate = plan.expiryDate 
    ? new Date(plan.expiryDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    : 'N/A';
  
  // Calculate days until expiry
  const daysUntilExpiry = plan.expiryDate
    ? Math.ceil((new Date(plan.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{plan.name} Plan</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </div>
          <Badge variant={plan.active ? "default" : "outline"} className="ml-2">
            {plan.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground ml-1">/{plan.billingCycle}</span>
        </div>
        
        {plan.active && plan.expiryDate && (
          <Alert variant={daysUntilExpiry < 15 ? "destructive" : "default"} className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Plan Expiry</AlertTitle>
            <AlertDescription>
              Your subscription will {daysUntilExpiry < 0 ? 'expired' : 'expire'} on {formattedExpiryDate}
              {daysUntilExpiry > 0 && daysUntilExpiry <= 30 && ` (in ${daysUntilExpiry} days)`}.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <h3 className="font-medium mb-2">Included Features:</h3>
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={`mr-2 mt-1 ${feature.included ? 'text-green-500' : 'text-gray-300'}`}>
                <Check className="h-4 w-4" />
              </div>
              <span className={!feature.included ? 'text-muted-foreground' : ''}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" className="w-1/2">
          View Plan Details
        </Button>
        <Button className="w-1/2 ml-2">
          Upgrade Plan
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurrentPlanInfo;
