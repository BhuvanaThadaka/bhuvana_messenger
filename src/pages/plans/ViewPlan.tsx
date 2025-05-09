
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSubscriptionPlanById, clearSelectedPlan } from "@/redux/slices/planSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ViewPlan = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPlan, loading } = useSelector((state: RootState) => state.plan);

  useEffect(() => {
    if (id) {
      dispatch(fetchSubscriptionPlanById(id));
    }

    return () => {
      dispatch(clearSelectedPlan());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/plans");
  };

  const handleEdit = () => {
    if (id) {
      navigate(`/plans/edit/${id}`);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="flex-1 space-y-4 p-6">
        <h2 className="text-3xl font-bold">Plan Not Found</h2>
        <p>The subscription plan you are looking for does not exist or you do not have permission to view it.</p>
        <Button onClick={handleBack}>Back to Plans</Button>
      </div>
    );
  }

  // Available features for subscription plans
  const availableFeatures = [
    { id: "case-management", label: "Case Management" },
    { id: "document-storage", label: "Document Storage" },
    { id: "calendar-integration", label: "Calendar Integration" },
    { id: "client-portal", label: "Client Portal" },
    { id: "invoice-billing", label: "Invoice & Billing" },
    { id: "task-management", label: "Task Management" },
    { id: "reporting", label: "Reporting" },
    { id: "api-access", label: "API Access" },
    { id: "mobile-app", label: "Mobile App" },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold">{selectedPlan.name}</h2>
          <Badge variant={selectedPlan.isActive ? "default" : "secondary"}>
            {selectedPlan.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <Button onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-2" /> Edit Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>
              Complete information about this subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
              <p>{selectedPlan.description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Price</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Monthly:</span>
                    <span className="font-medium">{formatCurrency(selectedPlan.monthlyPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual:</span>
                    <span className="font-medium">{formatCurrency(selectedPlan.annualPrice)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Billing Information</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Default Cycle:</span>
                    <span className="font-medium capitalize">{selectedPlan.billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Mode:</span>
                    <span className="font-medium capitalize">{selectedPlan.paymentMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trial Period:</span>
                    <span className="font-medium">{selectedPlan.trialDays} days</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">User Limits</h3>
              <p>This plan allows up to <span className="font-medium">{selectedPlan.maxUsers} users</span></p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Included Features</CardTitle>
            <CardDescription>Features available with this plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {availableFeatures.map((feature) => (
                <li key={feature.id} className="flex items-center gap-2">
                  {selectedPlan.features.includes(feature.id) ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                  <span className={selectedPlan.features.includes(feature.id) ? "font-medium" : "text-muted-foreground"}>
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewPlan;
