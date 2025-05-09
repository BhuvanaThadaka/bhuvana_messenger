
import { SubscriptionPlan, SubscriptionPlanFormData } from '@/types/lawFirm';
import { apiResponse, delay, generateId } from './mockApiService';
import { toast } from "@/hooks/use-toast";

// Mock subscription plans
let mockPlans: SubscriptionPlan[] = [
  {
    id: "plan-1",
    name: "Basic",
    description: "Essential legal practice management for small firms",
    monthlyPrice: 49.99,
    annualPrice: 539.88,
    trialDays: 14,
    maxUsers: 5,
    features: ["case-management", "document-storage", "client-portal"],
    isActive: true,
    billingCycle: "monthly",
    paymentMode: "recurring",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "plan-2",
    name: "Professional",
    description: "Advanced features for growing law practices",
    monthlyPrice: 99.99,
    annualPrice: 1079.88,
    trialDays: 14,
    maxUsers: 15,
    features: ["case-management", "document-storage", "client-portal", "calendar", "billing", "time-tracking"],
    isActive: true,
    billingCycle: "monthly",
    paymentMode: "recurring",
    createdAt: "2025-01-20T14:45:00Z",
    updatedAt: "2025-02-05T09:15:00Z",
  },
  {
    id: "plan-3",
    name: "Enterprise",
    description: "Complete solution for large law firms with multiple offices",
    monthlyPrice: 199.99,
    annualPrice: 2159.88,
    trialDays: 30,
    maxUsers: 50,
    features: ["case-management", "document-storage", "client-portal", "calendar", "billing", "time-tracking", "reporting", "task-management", "api-access"],
    isActive: true,
    billingCycle: "annual",
    paymentMode: "recurring",
    createdAt: "2025-02-01T11:20:00Z",
    updatedAt: "2025-03-10T16:30:00Z",
  }
];

// Get a single subscription plan by ID
export const getSubscriptionPlanById = async (id: string) => {
  await delay(300);
  
  const plan = mockPlans.find(p => p.id === id);
  
  if (!plan) {
    toast({
      title: "Error",
      description: "Plan not found",
      variant: "destructive"
    });
    return { success: false, error: "Plan not found", data: null };
  }
  
  return { success: true, data: plan };
};

// Create a new subscription plan
export const createSubscriptionPlan = async (data: SubscriptionPlanFormData) => {
  await delay(800);
  
  try {
    const newPlan: SubscriptionPlan = {
      id: 'plan-' + generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockPlans.push(newPlan);
    
    toast({
      title: "Success",
      description: `Plan "${data.name}" has been successfully created.`,
    });
    
    return { success: true, data: newPlan };
  } catch (error) {
    toast({
      title: "Error",
      description: "Error creating plan. Please try again.",
      variant: "destructive"
    });
    return { success: false, error: "Error creating plan", data: null };
  }
};

// Update an existing subscription plan
export const updateSubscriptionPlan = async (id: string, data: Partial<SubscriptionPlanFormData>) => {
  await delay(600);
  
  try {
    const planIndex = mockPlans.findIndex(p => p.id === id);
    
    if (planIndex === -1) {
      toast({
        title: "Error",
        description: "Plan not found",
        variant: "destructive"
      });
      return { success: false, error: "Plan not found", data: null };
    }
    
    // Update the plan
    const updatedPlan = {
      ...mockPlans[planIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    mockPlans[planIndex] = updatedPlan;
    
    toast({
      title: "Success",
      description: "Plan updated successfully",
    });
    
    return { success: true, data: updatedPlan };
  } catch (error) {
    toast({
      title: "Error",
      description: "Error updating plan. Please try again.",
      variant: "destructive"
    });
    return { success: false, error: "Error updating plan", data: null };
  }
};
