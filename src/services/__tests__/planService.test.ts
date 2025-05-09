
import { 
  getSubscriptionPlans, 
  getSubscriptionPlanById,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  toggleSubscriptionPlanStatus,
  SubscriptionPlanFormData
} from '../plan/planService';

describe('Subscription Plan Service', () => {
  
  it('should fetch subscription plans successfully', async () => {
    const result = await getSubscriptionPlans({
      page: 1,
      pageSize: 10,
      search: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    
    expect(result).toBeDefined();
    expect(result.plans.length).toBeGreaterThan(0);
    expect(result.plans[0].name).toBeDefined();
  });
  
  it('should fetch a single subscription plan by ID', async () => {
    const result = await getSubscriptionPlanById('1');
    
    expect(result).toBeDefined();
    expect(result.name).toBeDefined();
  });
  
  it('should create a new subscription plan', async () => {
    const newPlan: SubscriptionPlanFormData = {
      name: 'Test Plan',
      description: 'This is a test plan',
      monthlyPrice: 149.99,
      annualPrice: 1499.99,
      features: ['Feature 1', 'Feature 2'],
      billingCycle: 'monthly',
      trialDays: 14,
      userLimit: 10,
      isActive: true
    };
    
    const result = await createSubscriptionPlan(newPlan);
    
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe('Test Plan');
  });
  
  it('should update an existing subscription plan', async () => {
    const updateData = {
      name: 'Updated Plan Name',
      monthlyPrice: 199.99
    };
    
    const result = await updateSubscriptionPlan('1', updateData);
    
    expect(result).toBeDefined();
    expect(result.name).toBe('Updated Plan Name');
  });
  
  it('should toggle subscription plan status', async () => {
    const result = await toggleSubscriptionPlanStatus('1', false);
    
    expect(result).toBeDefined();
    expect(result.isActive).toBe(false);
  });
  
  it('should delete a subscription plan', async () => {
    await expect(deleteSubscriptionPlan('1')).resolves.toBe('1');
  });
  
});
