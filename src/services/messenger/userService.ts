import { fetchWithAuth } from '../api';

export type User = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  unreadCount: number;
  role?: string;
  designation?: string;
  phone?: string;
  email?: string;
  // Add other user properties as needed
};

export const userService = {
  /**
   * Get current user's profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      return await fetchWithAuth('/users/me');
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  },

  /**
   * Get all users/contacts
   */
  getUsers: async (): Promise<User[]> => {
    try {
      return await fetchWithAuth('/users');
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  /**
   * Get a specific user's profile
   */
  getUserProfile: async (userId: string): Promise<User> => {
    try {
      return await fetchWithAuth(`/users/${userId}`);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  },

  /**
   * Update user's online status
   */
  updateOnlineStatus: async (online: boolean): Promise<void> => {
    try {
      await fetchWithAuth('/users/status', {
        method: 'PATCH',
        body: JSON.stringify({ online }),
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error;
    }
  }
};