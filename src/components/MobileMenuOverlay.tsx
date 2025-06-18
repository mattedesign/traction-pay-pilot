
import { Button } from "@/components/ui/button";

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
  onClose: () => void;
}

const MobileMenuOverlay = ({ 
  isOpen, 
  navigationItems, 
  isActive, 
  onNavClick, 
  onClose 
}: MobileMenuOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-slate-800 text-white border-t border-slate-700">
      <div className="px-4 py-2 space-y-1">
        {navigationItems.map(item => (
          <Button
            key={item.label}
            variant="ghost"
            onClick={() => onNavClick(item.path)}
            className={`w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 h-12 ${
              isActive(item.path) ? 'bg-slate-700 text-white' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
