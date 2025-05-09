import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { format } from 'date-fns';
import { useChat } from './store/ChatContext';

const ChatThread: React.FC = () => {
  const { 
    selectedUser, 
    messages, 
    currentUser, 
    setShowProfile,
    isTyping,
    editMessage,
    deleteMessage
  } = useChat();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [lastDate, setLastDate] = useState<string | null>(null);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser, isTyping]);

  // Group messages by date
  const groupMessagesByDate = () => {
    if (!selectedUser) return [];

    const userMessages = messages[selectedUser.id] || [];
    const groupedMessages: { date: string; messages: typeof userMessages }[] = [];
    
    userMessages.forEach((message) => {
      const messageDate = format(message.timestamp, 'yyyy-MM-dd');
      
      const existingGroup = groupedMessages.find(group => group.date === messageDate);
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groupedMessages.push({
          date: messageDate,
          messages: [message]
        });
      }
    });
    
    return groupedMessages;
  };

  // Format the date for display
  const formatMessageDate = (dateStr: string) => {
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
  };

  // Handle message edit
  const handleEditMessage = (messageId: string, newText: string) => {
    if (!selectedUser) return;
    editMessage(selectedUser.id, messageId, newText);
  };

  // Handle message deletion
  const handleDeleteMessage = (messageId: string) => {
    if (!selectedUser) return;
    deleteMessage(selectedUser.id, messageId);
  };

  if (!selectedUser) {
    return (
      <div className="h-full w-[1200px] flex flex-col items-center justify-center bg-vakeel-gray border">
        <div className="text-center p-6">
          <img 
            src="/lovable-uploads/Frame 427321507.png" 
            alt="Select a chat" 
            className="w-48 h-48 mx-auto mb-4" 
          />
          <h2 className="text-xl font-medium text-gray-700 mt-4">Select a Chat to Start Messaging</h2>
          <p className="text-gray-500 mt-2">Choose from your existing conversations or start a new one</p>
        </div>
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate();

  // Toggle profile visibility
  const toggleProfile = () => {
    setShowProfile(true); // Explicitly set to true to show profile
  };

  return (
    <div className="h-[calc(100%-50px)] w-full flex flex-col bg-vakeel-gray">
      {/* Chat header */}
      <div className="bg-blue-50 p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={selectedUser.avatar} 
              alt={selectedUser.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
            {selectedUser.online && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <h2 className="font-medium">{selectedUser.name}</h2>
        </div>
        <button 
          onClick={toggleProfile}
          className="text-gray-600 hover:text-gray-900"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 chat-messages">
        {groupedMessages.map((group, groupIndex) => (
          <div key={group.date}>
            <div className="flex justify-center my-4">
              <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {formatMessageDate(group.date)}
              </div>
            </div>
            
            {group.messages.map((message) => {
              const isMine = message.senderId === currentUser.id;
              return (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  isMine={isMine}
                  user={isMine ? currentUser : selectedUser}
                  onEdit={handleEditMessage}
                  onDelete={handleDeleteMessage}
                />
              );
            })}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2 mb-4 ml-2">
            <img 
              src={selectedUser.avatar} 
              alt={selectedUser.name} 
              className="w-8 h-8 rounded-full mt-1"
            />
            <div className="bg-white rounded-lg px-4 py-2 max-w-xs shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatThread;