
import { Button } from "@/components/ui/button";
import { Home, DollarSign, BarChart3, Users, FileText, Settings, Truck, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import NotificationBell from "./NotificationBell";
import UserProfileMenu from "./UserProfileMenu";

const brokerNavigationItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/broker/dashboard"
  },
  {
    icon: Truck,
    label: "Loads in Progress",
    path: "/broker/loads-in-progress"
  },
  {
    icon: DollarSign,
    label: "Payments",
    path: "/broker/payments"
  },
  {
    icon: BarChart3,
    label: "Insights",
    path: "/broker/insights"
  },
  {
    icon: Users,
    label: "Carriers",
    path: "/broker/carriers"
  },
  {
    icon: FileText,
    label: "Reports",
    path: "/broker/reports"
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/broker/settings"
  }
];

const BrokerNavigationSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    // Navigate to appropriate dashboard based on user type
    if (profile?.user_type === 'carrier') {
      navigate('/');
    } else {
      navigate('/broker/dashboard');
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/broker/dashboard") {
      return location.pathname === "/broker/dashboard" || location.pathname === "/broker";
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden w-full bg-slate-800 text-white fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 h-14">
          <div className="flex items-center space-x-3">
            <div className="cursor-pointer" onClick={handleLogoClick}>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-slate-800 text-white border-t border-slate-700">
          <div className="px-4 py-2 space-y-1">
            {brokerNavigationItems.map(item => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => handleNavClick(item.path)}
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
          {brokerNavigationItems.map(item => (
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

export default BrokerNavigationSidebar;
