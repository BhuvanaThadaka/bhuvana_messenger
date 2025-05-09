
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from '../AuthContext';
import { AccountType, Modules } from '@/types/auth';

// Mock the authService
jest.mock('../../services/authService', () => ({
  login: jest.fn().mockImplementation((username, password) => {
    if (username === 'admin@example.com' && password === 'password123') {
      return Promise.resolve({
        token: 'mock-token',
        user: {
          username: 'admin@example.com',
          accountType: AccountType.SUPER_ADMIN,
          roles: ['ADMIN'],
          featurePrivileges: {
            [Modules.UserManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
            [Modules.Dashboard]: ['VIEW'],
          }
        }
      });
    }
    return Promise.reject(new Error('Invalid credentials'));
  }),
  logout: jest.fn().mockResolvedValue(undefined)
}));

// Test component to access auth context
const TestComponent = () => {
  const { isAuthenticated, isLoading, user, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <div data-testid="loading-status">{isLoading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="user-type">{user ? user.accountType : 'No User'}</div>
      <button onClick={() => login('admin@example.com', 'password123')} data-testid="login-button">Login</button>
      <button onClick={logout} data-testid="logout-button">Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  
  it('provides initial authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.getByTestId('loading-status')).toHaveTextContent('Not Loading');
    expect(screen.getByTestId('user-type')).toHaveTextContent('No User');
  });
  
  it('handles login correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('login-button'));
    
    // Should show loading state
    expect(screen.getByTestId('loading-status')).toHaveTextContent('Loading');
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('loading-status')).toHaveTextContent('Not Loading');
      expect(screen.getByTestId('user-type')).toHaveTextContent(AccountType.SUPER_ADMIN);
    });
  });
  
  it('handles logout correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // First login
    fireEvent.click(screen.getByTestId('login-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });
    
    // Then logout
    fireEvent.click(screen.getByTestId('logout-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('user-type')).toHaveTextContent('No User');
    });
  });
  
});
