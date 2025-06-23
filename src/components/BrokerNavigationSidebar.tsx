
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  Truck, 
  FileText, 
  MessageSquare, 
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  BarChart3,
  Zap,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfileMenu from "./UserProfileMenu";
import NotificationBell from "./NotificationBell";

const BrokerNavigationSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { signOut, profile } = useAuth();

  const navigationItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      href: "/broker",
      description: "Overview & Metrics"
    },
    { 
      icon: Truck, 
      label: "Loads in Progress", 
      href: "/broker/loads-in-progress",
      description: "Active Shipments"
    },
    { 
      icon: Zap, 
      label: "QuickPay Optimization", 
      href: "/broker/quickpay-optimization",
      description: "AI-Powered Optimization",
      badge: "New"
    },
    { 
      icon: BarChart3, 
      label: "QuickPay Analytics", 
      href: "/broker/quickpay-analytics",
      description: "Performance Insights"
    },
    { 
      icon: FileText, 
      label: "Documents", 
      href: "/broker/documents",
      description: "Manage Paperwork"
    },
    { 
      icon: MessageSquare, 
      label: "Communications", 
      href: "/broker/communications",
      description: "Messages & Updates"
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900">TractionPay</h1>
                <p className="text-xs text-slate-500">Broker Portal</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-slate-100"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group relative ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive(item.href) ? 'text-blue-600' : 'text-slate-500'}`} />
                {!isCollapsed && (
                  <>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                  </>
                )}
                {isCollapsed && item.badge && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-slate-200 p-4">
          {!isCollapsed ? (
            <UserProfileMenu />
          ) : (
            <div className="flex flex-col space-y-2">
              <NotificationBell />
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="hover:bg-slate-100"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile header will be handled by the main content area */}
      </div>
    </>
  );
};

export default BrokerNavigationSidebar;
