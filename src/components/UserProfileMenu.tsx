
import { useState } from "react";
import { User, Settings, HelpCircle, LogOut, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const UserProfileMenu = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      console.log('UserProfileMenu: Starting sign out process');
      setIsOpen(false); // Close the dropdown immediately
      
      await signOut();
      
      console.log('UserProfileMenu: Sign out successful, navigating to login');
      
      // Force navigation to login page
      window.location.href = '/login';
      
    } catch (error: any) {
      console.error('UserProfileMenu: Error signing out:', error);
      
      // Check if it's a session-related error that we can ignore
      const errorMessage = error?.message || '';
      const isSessionError = errorMessage.includes('Session not found') || 
                           errorMessage.includes('session_not_found') ||
                           errorMessage.includes('Invalid session');
      
      if (isSessionError) {
        // If it's just a session error, still redirect to login
        console.log('UserProfileMenu: Session already cleared, redirecting to login');
        window.location.href = '/login';
      } else {
        // Only show toast for non-session errors
        toast({
          title: "Error",
          description: "There was an error signing out. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    if (!firstName && !lastName) return "U";
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-10 h-10 text-slate-300 hover:text-white hover:bg-slate-700 relative"
          title="User Menu"
        >
          {/* Avatar */}
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
            {getInitials(profile?.first_name, profile?.last_name)}
          </div>
          {/* Small chevron indicator */}
          <ChevronUp className={`w-2 h-2 text-slate-400 absolute -bottom-0.5 -right-0.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="center" side="right" className="w-64" sideOffset={8}>
        <DropdownMenuLabel className="pb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {getInitials(profile?.first_name, profile?.last_name)}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="font-medium text-slate-900 truncate">
                {profile?.first_name && profile?.last_name 
                  ? `${profile.first_name} ${profile.last_name}`
                  : profile?.email || "User"
                }
              </div>
              <div className="text-sm text-slate-600 truncate">
                {profile?.email}
              </div>
              <Badge variant="outline" className="text-xs mt-1 w-fit">
                {profile?.user_type === 'carrier' ? 'Carrier' : 'Broker'} Account
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
          <User className="w-4 h-4 mr-3" />
          Profile Settings
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation('/account')}>
          <Settings className="w-4 h-4 mr-3" />
          Account Settings
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation('/support')}>
          <HelpCircle className="w-4 h-4 mr-3" />
          Support & Help
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
