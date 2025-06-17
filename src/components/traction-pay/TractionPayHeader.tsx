
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";

interface TractionPayHeaderProps {
  userProfile: any;
  activeTab: string;
  onTabChange: (tab: 'dashboard' | 'loads' | 'documents' | 'financials') => void;
}

const TractionPayHeader = ({ userProfile, activeTab, onTabChange }: TractionPayHeaderProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'loads', label: 'Loads' },
    { id: 'documents', label: 'Documents' },
    { id: 'financials', label: 'Financials' }
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TP</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Traction Pay</h1>
              <p className="text-sm text-slate-600">Freight Factoring Platform</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">Live</Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">
              {userProfile?.first_name} {userProfile?.last_name}
            </span>
          </div>
        </div>
      </div>
      
      <nav className="flex space-x-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id as any)}
            className={activeTab === tab.id ? "bg-blue-600 text-white" : ""}
          >
            {tab.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default TractionPayHeader;
