
import { Button } from "@/components/ui/button";
import NotificationBell from "./NotificationBell";
import UserProfileMenu from "./UserProfileMenu";

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

interface DesktopSidebarProps {
  navigationItems: NavigationItem[];
  isActive: (path: string) => boolean;
  onNavClick: (path: string) => void;
  onLogoClick: () => void;
}

const DesktopSidebar = ({ navigationItems, isActive, onNavClick, onLogoClick }: DesktopSidebarProps) => {
  return (
    <div className="hidden md:flex w-16 bg-slate-800 text-white min-h-screen flex-col items-center py-4">
      {/* Logo - clickable to navigate to appropriate dashboard */}
      <div className="mb-8 cursor-pointer" onClick={onLogoClick}>
        <img 
          alt="Logo" 
          className="w-8 h-8 object-contain hover:opacity-80 transition-opacity" 
          src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
        />
      </div>

      {/* Main navigation items */}
      <div className="space-y-4 flex flex-col items-center">
        {navigationItems.map(item => (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            onClick={() => onNavClick(item.path)}
            className={`w-12 h-12 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center ${
              isActive(item.path) ? 'bg-slate-700 text-white' : ''
            }`}
            title={item.label}
          >
            <item.icon className="w-6 h-6" />
          </Button>
        ))}
      </div>
      
      {/* Push notification bell and user menu to bottom */}
      <div className="mt-auto flex flex-col items-center space-y-2">
        <div className="p-2">
          <NotificationBell />
        </div>
        <div className="p-2">
          <UserProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
