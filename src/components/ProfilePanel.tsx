
import React from 'react';
// import { useChat } from '../store/ChatContext';
import { X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useChat } from './store/ChatContext';

const ProfilePanel: React.FC = () => {
  const { selectedUser, showProfile, setShowProfile } = useChat();
  const isMobile = useIsMobile();
  
  // Hide the profile panel on mobile if no user is selected
  if (!selectedUser || (!showProfile && !isMobile)) {
    return null;
  }

  return (
    <div className={`h-full w-[500px] border-l bg-white overflow-y-auto ${showProfile ? 'block' : 'hidden'} xl:block`}>
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-medium">Profile</h3>
        <button 
          onClick={() => setShowProfile(false)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <X size={18} />
        </button>
      </div>

      {/* User profile content */}
      <div className="p-4 flex flex-col items-center">
        <img 
          src={selectedUser.avatar} 
          alt={selectedUser.name} 
          className="rounded-full w-20 h-20 object-cover mb-4"
        />
        <h2 className="text-xl font-semibold mb-1">{selectedUser.name}</h2>
        <span className="text-sm text-gray-500">{selectedUser.role}</span>
      </div>

      {/* Profile sections */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Basic Information</h4>
        <div className="grid grid-cols-2 gap-y-3 text-sm mb-6">
          <div className="text-gray-500">Designation</div>
          <div className="text-gray-900">{selectedUser.designation || 'N/A'}</div>
          
          <div className="text-gray-500">Accounts</div>
          <div className="text-gray-900">3 Active</div>
        </div>

        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
        <div className="grid grid-cols-1 gap-y-3 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500 mb-1">Phone Number</span>
            <span className="text-gray-900">{selectedUser.phone || 'N/A'}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 mb-1">Email</span>
            <span className="text-gray-900">{selectedUser.email || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
