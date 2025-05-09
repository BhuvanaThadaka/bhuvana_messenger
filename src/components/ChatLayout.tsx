import React from 'react';
import SidebarNav from './SidebarNav';
import ContactList from './ContactList';
import ChatThread from './ChatThread';
import ProfilePanel from './ProfilePanel';
import { ChatProvider } from './store/ChatContext';

const ChatLayout: React.FC = () => {
  return (
    <ChatProvider>
      <div className="flex h-screen">
        <div className="chat-layout flex flex-1 bg-white">
          <div className="flex flex-1">
            <ContactList />
            <ChatThread />
            <ProfilePanel />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default ChatLayout;