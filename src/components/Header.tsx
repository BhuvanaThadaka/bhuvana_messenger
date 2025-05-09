
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/format";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shadow-sm transition-all duration-300">
      <div className="flex-1 flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-gray-100/80 transition-colors duration-200"
        >
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 hover:bg-gray-100/80 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-indigo-700 flex items-center justify-center text-primary-foreground shadow-sm">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline-block font-medium">
                {user ? capitalizeFirstLetter(user.username) : "User"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-56 border border-gray-100 shadow-lg rounded-lg animate-in fade-in-80 zoom-in-95"
          >
            <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild className="hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-150 cursor-pointer">
              <Link to="/profile" className="flex items-center gap-2 w-full">
                <User size={16} className="text-primary" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-red-50 focus:bg-red-50 transition-colors duration-150"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
