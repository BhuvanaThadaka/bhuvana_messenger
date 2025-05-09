import { Message } from './messageService';
import { User } from './userService';

type MessageCallback = (message: Message) => void;
type StatusCallback = (userId: string, online: boolean) => void;
type TypingCallback = (userId: string, isTyping: boolean) => void;

class SocketService {
  private socket: WebSocket | null = null;
  private messageCallbacks: MessageCallback[] = [];
  private statusCallbacks: StatusCallback[] = [];
  private typingCallbacks: TypingCallback[] = [];
  private reconnectInterval: number = 3000;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  connect(userId: string): void {
    // Replace with your actual WebSocket server URL
    const socketUrl = `wss://your-websocket-server.com?userId=${userId}`;
    
    this.socket = new WebSocket(socketUrl);
    
    this.socket.onopen = () => {
      console.log('WebSocket connection established');
      this.reconnectAttempts = 0;
    };
    
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'message':
            this.notifyMessageListeners({
              ...data.payload,
              timestamp: new Date(data.payload.timestamp)
            });
            break;
          case 'status':
            this.notifyStatusListeners(data.payload.userId, data.payload.online);
            break;
          case 'typing':
            this.notifyTypingListeners(data.payload.userId, data.payload.isTyping);
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      this.attemptReconnect();
    };
    
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
  
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        // We would need the userId here, which would be stored in a state or context in a real app
        // For now, we're just demonstrating the reconnection mechanism
        this.connect('current-user-id');
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }
  
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
  
  sendMessage(message: Omit<Message, 'id' | 'timestamp' | 'status'>): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'message',
        payload: message
      }));
    } else {
      console.error('WebSocket is not connected');
    }
  }
  
  sendTypingStatus(receiverId: string, isTyping: boolean): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'typing',
        payload: {
          receiverId,
          isTyping
        }
      }));
    }
  }
  
  onMessage(callback: MessageCallback): () => void {
    this.messageCallbacks.push(callback);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    };
  }
  
  onStatusChange(callback: StatusCallback): () => void {
    this.statusCallbacks.push(callback);
    return () => {
      this.statusCallbacks = this.statusCallbacks.filter(cb => cb !== callback);
    };
  }
  
  onTypingStatus(callback: TypingCallback): () => void {
    this.typingCallbacks.push(callback);
    return () => {
      this.typingCallbacks = this.typingCallbacks.filter(cb => cb !== callback);
    };
  }
  
  private notifyMessageListeners(message: Message): void {
    this.messageCallbacks.forEach(callback => callback(message));
  }
  
  private notifyStatusListeners(userId: string, online: boolean): void {
    this.statusCallbacks.forEach(callback => callback(userId, online));
  }
  
  private notifyTypingListeners(userId: string, isTyping: boolean): void {
    this.typingCallbacks.forEach(callback => callback(userId, isTyping));
  }
}

// Export a singleton instance
export const socketService = new SocketService();