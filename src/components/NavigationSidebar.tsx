
import { Button } from "@/components/ui/button";
import { Home, Truck, FileText, Banknote, Search, HelpCircle, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import NotificationBell from "./NotificationBell";
import UserProfileMenu from "./UserProfileMenu";

const navigationItems = [{
  icon: Home,
  label: "Home",
  path: "/"
}, {
  icon: Truck,
  label: "Loads",
  path: "/loads"
}, {
  icon: FileText,
  label: "Invoices",
  path: "/invoices"
}, {
  icon: Banknote,
  label: "Banking",
  path: "/banking"
}, {
  icon: Search,
  label: "Search",
  path: "/search"
}, {
  icon: HelpCircle,
  label: "Support",
  path: "/support"
}];

const NavigationSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleLogoClick = () => {
    // Navigate to appropriate dashboard based on user type
    if (profile?.user_type === 'broker') {
      navigate('/broker');
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    // Special handling for home icon - active only on exact home routes
    if (path === "/") {
      return location.pathname === "/" || 
             (profile?.user_type === 'broker' && location.pathname === "/broker");
    }
    
    // Special handling for loads - active for all load-related pages
    if (path === "/loads") {
      return location.pathname === "/loads" || 
             location.pathname.startsWith("/load/") ||
             location.pathname === "/loads/new";
    }
    
    // Default behavior for other paths
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="cursor-pointer" onClick={handleLogoClick}>
          <img 
            alt="Logo" 
            className="w-8 h-8 object-contain hover:opacity-80 transition-opacity" 
            src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <NotificationBell />
          <UserProfileMenu />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-slate-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-slate-800 text-white w-64 h-full p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="cursor-pointer" onClick={handleLogoClick}>
                <img 
                  alt="Logo" 
                  className="w-8 h-8 object-contain hover:opacity-80 transition-opacity" 
                  src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:bg-slate-700"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Mobile navigation items */}
            <div className="space-y-2">
              {navigationItems.map(item => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => handleNavClick(item.path)}
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
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-16 bg-slate-800 text-white min-h-screen flex-col items-center py-4">
        {/* Logo - clickable to navigate to appropriate dashboard */}
        <div className="mb-8 cursor-pointer" onClick={handleLogoClick}>
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
              onClick={() => handleNavClick(item.path)}
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
    </>
  );
};

export default NavigationSidebar;
