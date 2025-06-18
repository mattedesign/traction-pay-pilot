
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import NotificationBell from "./NotificationBell";
import UserProfileMenu from "./UserProfileMenu";

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onLogoClick: () => void;
}

const MobileHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen, onLogoClick }: MobileHeaderProps) => {
  return (
    <div className="md:hidden w-full bg-slate-800 text-white fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <div className="flex items-center space-x-3">
          <div className="cursor-pointer" onClick={onLogoClick}>
            <img 
              alt="Logo" 
              className="w-8 h-8 object-contain hover:opacity-80 transition-opacity" 
              src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <NotificationBell />
          <UserProfileMenu />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-slate-700"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
