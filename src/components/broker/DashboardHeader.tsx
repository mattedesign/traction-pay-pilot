
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const DashboardHeader = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      console.log('Dashboard header - signing out');
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Error signing out from dashboard:', error);
      toast({
        title: "Error",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Broker Dashboard</h1>
          <p className="text-slate-600">Welcome back, {profile?.first_name || 'User'}!</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            <Building2 className="w-3 h-3 mr-1" />
            {profile?.company_name || 'Broker Account'}
          </Badge>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
