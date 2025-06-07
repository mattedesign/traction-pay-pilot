
import { Button } from "@/components/ui/button";
import { Home, Truck, FileText, Banknote, Search, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="w-16 bg-slate-800 text-white h-full flex flex-col items-center py-4 space-y-4">
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
  );
};

export default NavigationSidebar;
