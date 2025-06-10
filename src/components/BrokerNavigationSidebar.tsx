
import { Button } from "@/components/ui/button";
import { Home, DollarSign, BarChart3, Users, FileText, Settings, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const brokerNavigationItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/broker"
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

  const handleNavClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === "/broker") {
      return location.pathname === "/broker";
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="w-16 bg-slate-800 text-white min-h-screen flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <img 
          alt="Logo" 
          className="w-8 h-8 object-contain" 
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
      
      {/* Push notification bell to bottom */}
      <div className="mt-auto">
        <div className="p-2">
          <NotificationBell />
        </div>
      </div>
    </div>
  );
};

export default BrokerNavigationSidebar;
