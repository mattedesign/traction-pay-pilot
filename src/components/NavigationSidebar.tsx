import {
  Home,
  Truck,
  CreditCard,
  FileText,
  Search,
  MessageSquare,
  Upload
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const NavigationSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Loads", path: "/loads", icon: Truck },
    { name: "Upload", path: "/upload", icon: Upload },
    { name: "Banking", path: "/banking", icon: CreditCard },
    { name: "Invoices", path: "/invoices", icon: FileText },
    { name: "Search", path: "/search", icon: Search },
    { name: "Support", path: "/support", icon: MessageSquare },
  ];

  return (
    <div className="w-60 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-screen">
      <div className="h-16 flex items-center justify-center border-b border-slate-200">
        <span className="text-lg font-semibold">Traction</span>
      </div>
      <nav className="flex-1 py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 ${
                    isActive ? 'bg-slate-100 text-slate-900 font-medium' : ''
                  }`
                }
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationSidebar;
