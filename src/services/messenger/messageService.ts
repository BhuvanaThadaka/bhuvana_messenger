import { Attachment } from '@/components/store/ChatContext';
import { fetchWithAuth } from '../api';
// import { Attachment } from '../store/ChatContext';

export type Message = {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
  isDeleted?: boolean;
  // Add any other fields your messages might have
};

export const messageService = {
  /**
   * Fetch messages for a specific conversation
   */
  getMessages: async (userId: string): Promise<Message[]> => {
    try {
      const response = await fetchWithAuth(`/messages/${userId}`);
      // Transform dates from string to Date objects
      return response.map((message: any) => ({
        ...message,
        timestamp: new Date(message.timestamp)
      }));
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw error;
    }
  },

  /**
   * Send a new message
   */
  sendMessage: async (message: Omit<Message, 'id' | 'timestamp' | 'status'>): Promise<Message> => {
    try {
      const response = await fetchWithAuth('/messages', {
        method: 'POST',
        body: JSON.stringify(message),
      });
      return {
        ...response,
        timestamp: new Date(response.timestamp)
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  },

  /**
   * Edit an existing message
   */
  editMessage: async (messageId: string, newText: string): Promise<Message> => {
    try {
      const response = await fetchWithAuth(`/messages/${messageId}`, {
        method: 'PATCH',
        body: JSON.stringify({ text: newText }),
      });
      return {
        ...response,
        timestamp: new Date(response.timestamp)
      };
    } catch (error) {
      console.error('Failed to edit message:', error);
      throw error;
    }
  },

  /**
   * Delete a message (mark as deleted)
   */
  deleteMessage: async (messageId: string): Promise<void> => {
    try {
      await fetchWithAuth(`/messages/${messageId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  },
  
  /**
   * Mark messages as read
   */
  markAsRead: async (userId: string): Promise<void> => {
    try {
      await fetchWithAuth(`/messages/read/${userId}`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
      throw error;
    }
  },

  /**
   * Upload file attachments
   */
  uploadAttachments: async (files: File[]): Promise<Attachment[]> => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetchWithAuth('/uploads', {
        method: 'POST',
        body: formData,
        headers: {
          // Remove Content-Type header to let the browser set it with the boundary for FormData
          'Content-Type': undefined as any,
        },
      });

      return response;
    } catch (error) {
      console.error('Failed to upload attachments:', error);
      throw error;
    }
  }
};