
import { login, logout } from '../authService';
import { AccountType } from '@/types/auth';

describe('Auth Service', () => {
  
  it('should login successfully with valid credentials', async () => {
    const response = await login('admin@example.com', 'password123');
    
    expect(response).toBeDefined();
    expect(response.token).toBe('mock-token-super-admin');
    expect(response.user).toHaveProperty('accountType', AccountType.SUPER_ADMIN);
  });
  
  it('should throw an error with invalid credentials', async () => {
    await expect(login('wrong@example.com', 'wrongpassword')).rejects.toThrow();
  });
  
  it('should logout successfully', async () => {
    await expect(logout()).resolves.not.toThrow();
  });
  
});
