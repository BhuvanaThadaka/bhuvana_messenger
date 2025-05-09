import { Message } from '@/services/messenger/messageService';
import { User } from '@/services/messenger/userService';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


export interface Attachment {
  id: string;
  type: 'image' | 'pdf' | 'audio' | 'file';
  url: string;
  name: string;
}

// Dummy data for initial development
const dummyCurrentUser: User = {
  id: 'current-user',
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  online: true,
  unreadCount: 0,
  role: 'Developer',
  designation: 'Frontend Engineer',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567'
};

const dummyUsers: User[] = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    online: true,
    unreadCount: 3,
    role: 'Designer',
    designation: 'UI/UX Designer',
    email: 'alice@example.com',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 'user2',
    name: 'Bob Smith',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    online: false,
    unreadCount: 0,
    role: 'Manager',
    designation: 'Project Manager',
    email: 'bob@example.com',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 'user3',
    name: 'Carol Williams',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    online: true,
    unreadCount: 1,
    role: 'Developer',
    designation: 'Backend Engineer',
    email: 'carol@example.com',
    phone: '+1 (555) 456-7890'
  }
];

const dummyMessages: Record<string, Message[]> = {
  'user1': [
    {
      id: 'msg1',
      senderId: 'current-user',
      receiverId: 'user1',
      text: 'Alice, have you reviewed the discovery documents for the Smith case?',
      timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
      status: 'read'
    },
    {
      id: 'msg2',
      senderId: 'user1',
      receiverId: 'current-user',
      text: 'Hi John, I’ve completed the review and flagged key documents. Sending you the summary now.',
      timestamp: new Date(Date.now() - 3600000 * 23), // 23 hours ago
      status: 'read'
    },
    {
      id: 'msg3',
      senderId: 'current-user',
      receiverId: 'user1',
      text: 'Great work, Alice. Let’s discuss the strategy for the deposition tomorrow.',
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      status: 'delivered'
    }
  ],
  'user2': [
    {
      id: 'msg4',
      senderId: 'user2',
      receiverId: 'current-user',
      text: 'John, have you finalized the motion to dismiss for the Johnson case?',
      timestamp: new Date(Date.now() - 3600000 * 48), // 2 days ago
      status: 'read'
    },
    {
      id: 'msg5',
      senderId: 'current-user',
      receiverId: 'user2',
      text: 'Yes, Bob. The draft is ready and will be filed by this afternoon.',
      timestamp: new Date(Date.now() - 3600000 * 47), // 47 hours ago
      status: 'read'
    }
  ],
  'user3': [
    {
      id: 'msg6',
      senderId: 'current-user',
      receiverId: 'user3',
      text: 'Carol, can we schedule a call to review the settlement offer for your case?',
      timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
      status: 'delivered'
    }
  ]
};
interface ChatContextProps {
  currentUser: User;
  users: User[];
  filteredUsers: User[];
  selectedUser: User | null;
  messages: Record<string, Message[]>;
  isTyping: boolean;
  searchTerm: string;
  showProfile: boolean;
  editingMessage: Message | null;
  setSelectedUser: (user: User | null) => void;
  setSearchTerm: (term: string) => void;
  setShowProfile: (show: boolean) => void;
  setEditingMessage: (message: Message | null) => void;
  sendMessage: (text: string, attachments?: Attachment[], messageIdToEdit?: string) => void;
  editMessage: (userId: string, messageId: string, newText: string) => void;
  deleteMessage: (userId: string, messageId: string) => void;
  setTypingStatus: (isTyping: boolean) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(dummyCurrentUser);
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(dummyMessages);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone && user.phone.includes(searchTerm))
  );

  // Initialize the chat system
  useEffect(() => {

    const initializeChat = async () => {
      try {

      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    };

    initializeChat();
    
    return () => {
    };
  }, []);


  useEffect(() => {
    if (selectedUser) {
      const fetchUserMessages = async () => {
        try {
          setUsers(prevUsers => 
            prevUsers.map(user => 
              user.id === selectedUser.id ? { ...user, unreadCount: 0 } : user
            )
          );
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      };

      fetchUserMessages();
    }
  }, [selectedUser]);

  // Handler for incoming messages
  const handleIncomingMessage = (message: Message) => {
    setMessages(prevMessages => {
      const userMessages = prevMessages[message.senderId] || [];
      return {
        ...prevMessages,
        [message.senderId]: [...userMessages, message]
      };
    });

    // Update unread count if it's not from the currently selected user
    if (selectedUser?.id !== message.senderId) {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === message.senderId ? { ...user, unreadCount: (user.unreadCount || 0) + 1 } : user
        )
      );
    }
  };

  // Handler for user status changes
  const handleStatusChange = (userId: string, online: boolean) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, online } : user
      )
    );
  };

  // Handler for typing status
  const handleTypingStatus = (userId: string, typing: boolean) => {
    if (selectedUser?.id === userId) {
      setIsTyping(typing);
    }
  };

  // Send a message
  const sendMessage = async (text: string, attachments?: Attachment[], messageIdToEdit?: string) => {
    if (!selectedUser) return;

    if (messageIdToEdit) {
      // Edit existing message
      editMessage(selectedUser.id, messageIdToEdit, text);
      return;
    }

    const newMessage: Omit<Message, 'id' | 'timestamp' | 'status'> = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: text.trim(),
      attachments: attachments
    };

    try {
      // Optimistically add the message to the UI
      const tempId = `temp-${Date.now()}`;
      const tempMessage: Message = {
        ...newMessage,
        id: tempId,
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages(prevMessages => {
        const userMessages = prevMessages[selectedUser.id] || [];
        return {
          ...prevMessages,
          [selectedUser.id]: [...userMessages, tempMessage]
        };
      });

      // socketService.sendMessage(newMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error, maybe remove the temp message or mark it as failed
    }
  };

  // Edit a message
  const editMessage = async (userId: string, messageId: string, newText: string) => {
    try {
      // Optimistically update the UI
      setMessages(prevMessages => {
        const userMessages = prevMessages[userId] || [];
        return {
          ...prevMessages,
          [userId]: userMessages.map(msg => 
            msg.id === messageId ? { ...msg, text: newText } : msg
          )
        };
      });

      // Clear the editing message state
      setEditingMessage(null);

    } catch (error) {
      console.error('Failed to edit message:', error);
      // Revert the optimistic update on error
    }
  };

  // Delete a message
  const deleteMessage = async (userId: string, messageId: string) => {
    try {
      // Optimistically update the UI to show a deleted message
      setMessages(prevMessages => {
        const userMessages = prevMessages[userId] || [];
        return {
          ...prevMessages,
          [userId]: userMessages.map(msg => 
            msg.id === messageId ? { ...msg, text: "[deleted]", isDeleted: true } : msg
          )
        };
      });

    } catch (error) {
      console.error('Failed to delete message:', error);
      // Revert the optimistic update on error
    }
  };

  // Send typing status
  const setTypingStatus = (isTyping: boolean) => {
    if (selectedUser) {
    }
  };

  return (
    <ChatContext.Provider value={{
      currentUser,
      users,
      filteredUsers,
      selectedUser,
      messages,
      isTyping,
      searchTerm,
      showProfile,
      editingMessage,
      setSelectedUser,
      setSearchTerm,
      setShowProfile,
      setEditingMessage,
      sendMessage,
      editMessage,
      deleteMessage,
      setTypingStatus
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};