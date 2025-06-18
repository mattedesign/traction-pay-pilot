
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
  navigationItems: NavigationItem[];
  isActive: (path: string) => boolean;
  onNavClick: (path: string) => void;
  onLogoClick: () => void;
  onClose: () => void;
}

const MobileMenuOverlay = ({ 
  isOpen, 
  navigationItems, 
  isActive, 
  onNavClick, 
  onLogoClick, 
  onClose 
}: MobileMenuOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-slate-800 text-white w-64 h-full p-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="cursor-pointer" onClick={onLogoClick}>
            <img 
              alt="Logo" 
              className="w-8 h-8 object-contain hover:opacity-80 transition-opacity" 
              src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-2">
          {navigationItems.map(item => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => onNavClick(item.path)}
              className={`w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 ${
                isActive(item.path) ? 'bg-slate-700 text-white' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
