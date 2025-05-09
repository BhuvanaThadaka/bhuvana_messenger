import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import { Message } from '@/services/messenger/messageService';
import { User } from '@/services/messenger/userService';
import { useChat } from './store/ChatContext';

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
  user: User;
  onEdit: (messageId: string, newText: string) => void;
  onDelete: (messageId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isMine, 
  user, 
  onEdit, 
  onDelete 
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { setEditingMessage } = useChat();

  const handleEdit = () => {
    setEditingMessage(message);
    setShowOptions(false);
  };

  const handleDelete = () => {
    onDelete(message.id);
    setShowOptions(false);
  };

  // Check if message is deleted
  const isDeleted = message.text === "[deleted]" || message.isDeleted;

  return (
    <div className={`flex mb-4 ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && (
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-8 h-8 rounded-full mt-1 mr-2"
        />
      )}
      
      <div className="relative max-w-xs">
        <div 
          className={`relative group ${
            isMine 
              ? 'bg-blue-500 text-white rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-lg' 
              : 'bg-white text-gray-800 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-lg'
          } px-4 py-2 shadow-sm`}
          onMouseEnter={isMine && !isDeleted ? () => setShowOptions(true) : undefined}
          onMouseLeave={isMine ? () => setShowOptions(false) : undefined}
        >
          {isDeleted ? (
            <p className="text-sm italic opacity-70">Your message was deleted</p>
          ) : (
            <>
              {/* Display attachments if any */}
              {message.attachments && message.attachments.map((attachment, index) => (
                <div key={index} className="mb-2">
                  {attachment.type === 'image' ? (
                    <img 
                      src={attachment.url} 
                      alt={attachment.name} 
                      className="max-w-full rounded mb-2"
                    />
                  ) : (
                    <div className="bg-gray-100 p-2 rounded mb-2 text-sm flex items-center gap-2">
                      <span className="text-gray-800">{attachment.name}</span>
                    </div>
                  )}
                </div>
              ))}
              
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </>
          )}
          
          <div className="text-xs mt-1 text-right">
            {format(message.timestamp, 'h:mm a')}
            {isMine && (
              <span className="ml-1">
                {message.status === 'sent' && '✓'}
                {message.status === 'delivered' && '✓✓'}
                {message.status === 'read' && (
                  <span className="text-blue-300">✓✓</span>
                )}
              </span>
            )}
          </div>
          
          {isMine && showOptions && !isDeleted && (
            <div className="absolute right-0 -top-8 flex flex-row gap-2">
              <button 
                onClick={handleEdit}
                className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-gray-800"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={handleDelete}
                className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isMine && (
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-8 h-8 rounded-full mt-1 ml-2"
        />
      )}
    </div>
  );
};

export default MessageBubble;