
import { Button } from "@/components/ui/button";
import { Home, Truck, FileText, Banknote, Search, HelpCircle, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Truck, label: "Loads", path: "/loads" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: Banknote, label: "Banking", path: "/banking" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: HelpCircle, label: "Support", path: "/support" }
];

const NavigationSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  const isActive = (path: string) => {
    // Check for exact match or if current path starts with the nav path (for load details)
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/load/");
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="w-16 bg-slate-800 text-white min-h-screen flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <img 
          src="/lovable-uploads/9c7f43ac-d9db-486b-bb6a-fc72efae0f39.png" 
          alt="Logo" 
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Main navigation items */}
      <div className="space-y-4 flex flex-col items-center">
        {navigationItems.map((item) => (
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
      
      {/* Push notification bell to bottom */}
      <div className="mt-auto">
        <div className="p-2">
          <NotificationBell />
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
