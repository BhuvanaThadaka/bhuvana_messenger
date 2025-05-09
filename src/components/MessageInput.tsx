import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { useChat } from './store/ChatContext';

interface Attachment {
  id: string;
  type: 'image' | 'pdf' | 'file';
  url: string;
  name: string;
}

const MessageInput: React.FC = () => {
  const { sendMessage, setTypingStatus, selectedUser, editingMessage, setEditingMessage } = useChat();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Set message text when editing
  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.text);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [editingMessage]);

  // Handle typing indicator
  useEffect(() => {
    if (!selectedUser) return;

    if (message.length > 0 && !isTyping) {
      setIsTyping(true);
      setTypingStatus(true);
    } else if (message.length === 0 && isTyping) {
      setIsTyping(false);
      setTypingStatus(false);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    if (message.length > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingStatus(false);
      }, 2000);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, isTyping, setTypingStatus, selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMessage) {
      sendMessage(message, undefined, editingMessage.id);
      setEditingMessage(null);
    } else if (message.trim() || attachments.length > 0) {
      sendMessage(message, attachments);
      setAttachments([]);
    }
    
    setMessage('');
    setIsTyping(false);
    setTypingStatus(false);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const fileId = `${Date.now()}-${file.name}`;
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        const fileUrl = event.target?.result as string;
        
        let fileType: 'image' | 'pdf' | 'file' = 'file';
        if (file.type.startsWith('image/')) fileType = 'image';
        else if (file.type === 'application/pdf') fileType = 'pdf';
        
        const newAttachment: Attachment = {
          id: fileId,
          type: fileType,
          url: fileUrl,
          name: file.name
        };
        
        setAttachments(prev => [...prev, newAttachment]);
      };
      
      fileReader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setMessage('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white border-t p-4 sticky bottom-0"
    >
      {editingMessage && (
        <div className="mb-2 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
          <div className="text-sm text-blue-700">Editing message</div>
          <button 
            type="button" 
            onClick={handleCancelEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative">
              {attachment.type === 'image' ? (
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <img 
                    src={attachment.url} 
                    alt={attachment.name} 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-gray-100 rounded p-1 pr-6">
                  <span className="text-xs truncate max-w-[100px]">{attachment.name}</span>
                  <button 
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 p-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip size={20} />
        </button>
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-200 max-h-28"
            rows={1}
          />
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept="image/*,.pdf,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() && attachments.length === 0 && !editingMessage}
          className={`rounded-full p-2 ${
            message.trim() || attachments.length > 0 || editingMessage 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;