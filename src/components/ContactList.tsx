
import React, { useState } from 'react';
// import { useChat } from '../store/ChatContext';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { useChat } from './store/ChatContext';

const ContactList: React.FC = () => {
  const { 
    filteredUsers, 
    selectedUser, 
    setSelectedUser, 
    searchTerm, 
    setSearchTerm,
    messages
  } = useChat();

  // Get the last message for each user
  const getLastMessage = (userId: string) => {
    const userMessages = messages[userId] || [];
    if (userMessages.length === 0) return '';
    return userMessages[userMessages.length - 1].text;
  };

  // Format the date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear()) {
      return format(date, 'h:mm a');
    } else if (date.getDate() === yesterday.getDate() && 
              date.getMonth() === yesterday.getMonth() && 
              date.getFullYear() === yesterday.getFullYear()) {
      return 'Yesterday';
    } else {
      return format(date, 'MM/dd/yyyy');
    }
  };

  return (
    <div className="h-full w-[440px] fixed-width border-r bg-white overflow-hidden lg:block">
  <div className="px-5 py-4 border-b">
    <h2 className="text-xl font-semibold">Messenger</h2>
    <div className="mt-4 relative rounded-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search By Name/Phone No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-2 px-4 pl-12 border border-gray-300 rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </div>
      </div>
    </div>
  </div>

  <div className="overflow-y-auto h-[calc(100%-80px)]">
    {filteredUsers.map(user => {
      const lastMessageText = getLastMessage(user.id);
      const lastMessage = messages[user.id]?.[messages[user.id]?.length - 1];
      const lastMessageTime = lastMessage ? formatDate(lastMessage.timestamp) : '';
      
      return (
        <div 
          key={user.id}
          onClick={() => setSelectedUser(user)}
          className={`flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedUser?.id === user.id ? 'bg-vakeel-light' : ''
          }`}
        >
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="rounded-full w-12 h-12 object-cover"
            />
            {user.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-sm text-gray-900 truncate">{user.name}</h3>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-1">{lastMessageTime}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{lastMessageText}</p>
          </div>
          {user.unreadCount ? (
            <div className="flex-shrink-0">
              <div className="bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {user.unreadCount}
              </div>
            </div>
          ) : null}
        </div>
      );
    })}
    {filteredUsers.length === 0 && (
      <div className="p-4 text-center text-gray-500">
        No contacts found
      </div>
    )}
  </div>
</div>
  );
};

export default ContactList;
