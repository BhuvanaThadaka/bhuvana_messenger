
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isActive: boolean;
  billing: 'Monthly' | 'Yearly';
  createdAt: string;
  updatedAt: string;
}
