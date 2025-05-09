
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { MessageSquare, User, Search, Bell } from 'lucide-react';

const SidebarNav: React.FC = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null; // Hide on mobile
  }

  return (
    <div className="w-[80px] h-full bg-vakeel-primary flex flex-col items-center">
      <div className="py-4 flex justify-center items-center">
        <div className="w-12 h-12 flex items-center justify-center">
          <img 
            src="/lovable-uploads/6e3be981-8fea-4449-b6f8-36bbae5192dd.png" 
            alt="Vakeel Pro Logo" 
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
      
      <div className="flex-1 w-full mt-8">
        <nav className="flex flex-col items-center gap-6">
        <button className="w-[200px] h-full bg-vakeel-primary flex flex-col">
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 7.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs mt-1">Dashboard</span>
            </div>
        </button>
          <button className="w-full flex justify-center py-3 text-gray-300 hover:text-white">
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs mt-1">Masters</span>
            </div>
          </button>
          <button className="w-full flex justify-center py-3 text-gray-300 hover:text-white">
            <div className="flex flex-col items-center">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Contacts</span>
            </div>
          </button>
          <button className="w-full flex justify-center py-3 bg-blue-600 text-white">
            <div className="flex flex-col items-center">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs mt-1">Messenger</span>
            </div>
          </button>
        </nav>
      </div>
      
      <div className="mt-auto mb-4 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
            <img 
              src="https://i.pravatar.cc/150?img=33" 
              alt="User" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-white text-xs text-center">
            <p>Jenny Wilson</p>
            <p className="text-gray-400">Admin</p>
          </div>
        </div>
        <button className="w-full py-2 text-white text-sm flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 12H3.62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.85 8.65002L2.5 12L5.85 15.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarNav;
