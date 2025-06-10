
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const DashboardHeader = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Broker Dashboard</h1>
          <p className="text-slate-600">Welcome back, {profile?.first_name}!</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            <Building2 className="w-3 h-3 mr-1" />
            {profile?.company_name || 'Broker Account'}
          </Badge>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
