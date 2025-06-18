
import { Home, Truck, FileText, Banknote, Search, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import MobileHeader from "./MobileHeader";
import MobileMenuOverlay from "./MobileMenuOverlay";
import DesktopSidebar from "./DesktopSidebar";

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
    setIsMobileMenuOpen(false);
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
      <MobileHeader 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onLogoClick={handleLogoClick}
      />

      <MobileMenuOverlay 
        isOpen={isMobileMenuOpen}
        navigationItems={navigationItems}
        isActive={isActive}
        onNavClick={handleNavClick}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <DesktopSidebar 
        navigationItems={navigationItems}
        isActive={isActive}
        onNavClick={handleNavClick}
        onLogoClick={handleLogoClick}
      />
    </>
  );
};

export default NavigationSidebar;
