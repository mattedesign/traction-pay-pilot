
import { Button } from "@/components/ui/button";
import { Home, Truck, FileText, Banknote, Search, HelpCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  const handleNavClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  return (
    <div className="w-16 bg-slate-800 text-white min-h-screen flex flex-col items-center py-4">
      {/* Main navigation items */}
      <div className="space-y-4">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            onClick={() => handleNavClick(item.path)}
            className="w-12 h-12 text-slate-300 hover:text-white hover:bg-slate-700"
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
