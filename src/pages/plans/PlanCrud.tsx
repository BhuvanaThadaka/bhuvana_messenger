
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSubscriptionPlanById, updateSubscriptionPlan, createSubscriptionPlan } from '@/services/mockSubscriptionPlanService';
import { SubscriptionPlan, SubscriptionPlanFormData } from '@/types/lawFirm';

// Define PlanCrudProps interface
interface PlanCrudProps {
  plan?: SubscriptionPlan;
  mode?: 'create' | 'edit';
}

const PlanCrud: React.FC<PlanCrudProps> = ({ plan: initialPlan, mode = 'create' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SubscriptionPlanFormData>({
    name: '',
    description: '',
    monthlyPrice: 0,
    annualPrice: 0,
    trialDays: 0,
    billingCycle: 'monthly',
    maxUsers: 1,
    features: [],
    paymentMode: 'recurring',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await getSubscriptionPlanById(id);
          if (response.data) {
            const planData = response.data;
            setFormData({
              name: planData.name,
              description: planData.description,
              monthlyPrice: planData.monthlyPrice,
              annualPrice: planData.annualPrice,
              trialDays: planData.trialDays,
              billingCycle: planData.billingCycle,
              maxUsers: planData.maxUsers,
              features: planData.features,
              paymentMode: planData.paymentMode,
              isActive: planData.isActive,
            });
          } else {
            toast({
              title: "Error",
              description: "Failed to fetch plan details.",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Error fetching plan details. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPlan();
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Update existing plan
        await updateSubscriptionPlan(id, formData);
        toast({
          title: "Success",
          description: "Plan updated successfully.",
        });
      } else {
        // Create new plan
        await createSubscriptionPlan(formData);
        toast({
          title: "Success",
          description: "Plan created successfully.",
        });
      }
      navigate('/subscription-plans');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{mode === 'edit' ? "Edit Plan" : "Create Plan"}</CardTitle>
          <CardDescription>
            {mode === 'edit' ? "Update an existing subscription plan." : "Create a new subscription plan."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyPrice">Monthly Price</Label>
                <Input
                  type="number"
                  id="monthlyPrice"
                  name="monthlyPrice"
                  value={formData.monthlyPrice}
                  onChange={handleNumberChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="annualPrice">Annual Price</Label>
                <Input
                  type="number"
                  id="annualPrice"
                  name="annualPrice"
                  value={formData.annualPrice}
                  onChange={handleNumberChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="trialDays">Trial Days</Label>
              <Input
                type="number"
                id="trialDays"
                name="trialDays"
                value={formData.trialDays}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="maxUsers">Max Users</Label>
              <Input
                type="number"
                id="maxUsers"
                name="maxUsers"
                value={formData.maxUsers}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                type="text"
                id="features"
                name="features"
                value={formData.features.join(',')}
                onChange={(e) => {
                  const featuresArray = e.target.value.split(',').map(item => item.trim());
                  setFormData(prevData => ({
                    ...prevData,
                    features: featuresArray,
                  }));
                }}
              />
            </div>
            <div>
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select 
                name="billingCycle" 
                value={formData.billingCycle}
                onValueChange={(value) => handleSelectChange('billingCycle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentMode">Payment Mode</Label>
              <Select 
                name="paymentMode" 
                value={formData.paymentMode}
                onValueChange={(value) => handleSelectChange('paymentMode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-Time</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prevData => ({ ...prevData, isActive: checked }))}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Plan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanCrud;
