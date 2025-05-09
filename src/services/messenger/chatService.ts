// chatServices.ts
import { format } from 'date-fns';

// Base URL for the API (replace with your backend URL)
const API_BASE_URL = 'https://api.yourbackend.com';

// Types for API responses and requests
interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  designation?: string;
  phone?: string;
  email?: string;
  online: boolean;
  unreadCount?: number;
}

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: { type: string; url: string; name: string }[];
  isDeletedForEveryone?: boolean; // Indicates if deleted for all users
  deletedFor?: string[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  headers: HeadersInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add authorization header when available, e.g., 'Authorization': `Bearer ${token}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result: ApiResponse<T> = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'API request failed');
  }
  return result.data;
}

// Service functions
export const chatServices = {
  // Fetch all users (for ContactList)
  async getUsers(): Promise<User[]> {
    return apiRequest<User[]>('/users');
  },

  // Search users by name or phone (for ContactList search)
  async searchUsers(query: string): Promise<User[]> {
    return apiRequest<User[]>(`/users/search?query=${encodeURIComponent(query)}`);
  },

  // Fetch messages for a specific user (for ChatThread)
  async getMessages(userId: string): Promise<Message[]> {
    const messages = await apiRequest<Message[]>(`/messages/${userId}`);
    // Ensure timestamps are Date objects
    return messages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  },

  // Send a new message (for MessageInput in ChatThread)
  async sendMessage(userId: string, text: string, senderId: string): Promise<Message> {
    const message = await apiRequest<Message>('/messages', 'POST', {
      userId,
      text,
      senderId,
      timestamp: new Date().toISOString(),
    });
    return {
      ...message,
      timestamp: new Date(message.timestamp),
    };
  },

  // Edit an existing message (for MessageBubble in ChatThread)
  async editMessage(userId: string, messageId: string, newText: string): Promise<Message> {
    const message = await apiRequest<Message>(`/messages/${userId}/${messageId}`, 'PATCH', {
      text: newText,
    });
    return {
      ...message,
      timestamp: new Date(message.timestamp),
    };
  },

  // Delete a message (for MessageBubble in ChatThread)
  async deleteMessage(userId: string, messageId: string): Promise<void> {
    await apiRequest<void>(`/messages/${userId}/${messageId}`, 'DELETE');
  },

  // Fetch user profile details (for ProfilePanel)
  async getUserProfile(userId: string): Promise<User> {
    return apiRequest<User>(`/users/${userId}`);
  },

  // Update user profile (optional, for future ProfilePanel edits)
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    return apiRequest<User>(`/users/${userId}`, 'PATCH', updates);
  },

  // Check if a user is typing (for ChatThread isTyping indicator)
  async setTypingStatus(userId: string, isTyping: boolean): Promise<void> {
    await apiRequest<void>(`/users/${userId}/typing`, 'POST', { isTyping });
  },

  // Get the last message for a user (for ContactList)
  async getLastMessage(userId: string): Promise<string> {
    const messages = await apiRequest<Message[]>(`/messages/${userId}?limit=1`);
    return messages.length > 0 ? messages[0].text : '';
  },

  // Format message date for ChatThread
  formatMessageDate(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  },
};