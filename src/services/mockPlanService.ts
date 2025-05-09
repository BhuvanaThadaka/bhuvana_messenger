
import { SubscriptionPlan } from '@/types/plan';

// Mock data for subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Free',
    description: 'Basic plan for individuals',
    price: 0,
    features: [
      'Up to 5 cases',
      'Basic document generation',
      'Email support',
    ],
    isActive: true,
    billing: 'Monthly',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Pro',
    description: 'For small law firms',
    price: 29.99,
    features: [
      'Up to 50 cases',
      'Advanced document generation',
      'Priority email support',
      '5 team members',
      'Client portal',
    ],
    isActive: true,
    billing: 'Monthly',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'For medium to large law firms',
    price: 99.99,
    features: [
      'Unlimited cases',
      'Premium document generation',
      'Priority phone & email support',
      'Unlimited team members',
      'Client portal',
      'Custom integrations',
      'Dedicated account manager',
    ],
    isActive: true,
    billing: 'Monthly',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
];

// Get all plans
export const getPlans = async (): Promise<{ data: SubscriptionPlan[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: subscriptionPlans });
    }, 500);
  });
};

// Get plan by ID
export const getPlanById = async (id: string): Promise<{ data: SubscriptionPlan | null }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = subscriptionPlans.find((p) => p.id === id) || null;
      resolve({ data: plan });
    }, 500);
  });
};

// Create plan
export const createPlan = async (plan: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ data: SubscriptionPlan }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPlan: SubscriptionPlan = {
        ...plan,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      resolve({ data: newPlan });
    }, 500);
  });
};

// Update plan
export const updatePlan = async (id: string, updatedPlan: Partial<SubscriptionPlan>): Promise<{ data: SubscriptionPlan | null }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const planIndex = subscriptionPlans.findIndex((p) => p.id === id);
      if (planIndex === -1) {
        resolve({ data: null });
        return;
      }
      const plan = {
        ...subscriptionPlans[planIndex],
        ...updatedPlan,
        updatedAt: new Date().toISOString(),
      };
      resolve({ data: plan });
    }, 500);
  });
};

// Delete plan
export const deletePlan = async (id: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const planIndex = subscriptionPlans.findIndex((p) => p.id === id);
      if (planIndex === -1) {
        resolve({ success: false });
        return;
      }
      resolve({ success: true });
    }, 500);
  });
};

// Export aliases for compatibility
export const getSubscriptionPlans = getPlans;
export const getSubscriptionPlanById = getPlanById;
export const createSubscriptionPlan = createPlan;
export const updateSubscriptionPlan = updatePlan;
export const deleteSubscriptionPlan = deletePlan;
export const toggleSubscriptionPlanStatus = updatePlan;
