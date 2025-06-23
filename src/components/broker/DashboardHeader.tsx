
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
      console.log('BrokerDashboardHeader: Starting sign out process');
      await signOut();
      
      console.log('BrokerDashboardHeader: Sign out successful, navigating to login');
      
      // Force navigation to login page
      window.location.href = '/login';
      
    } catch (error: any) {
      console.error('BrokerDashboardHeader: Error signing out:', error);
      
      // Check if it's a session-related error that we can ignore
      const errorMessage = error?.message || '';
      const isSessionError = errorMessage.includes('Session not found') || 
                           errorMessage.includes('session_not_found') ||
                           errorMessage.includes('Invalid session');
      
      if (isSessionError) {
        // If it's just a session error, still redirect to login
        console.log('BrokerDashboardHeader: Session already cleared, redirecting to login');
        window.location.href = '/login';
      } else {
        // Only show toast for non-session errors
        toast({
          title: "Error",
          description: "There was an error signing out. Please try again.",
          variant: "destructive",
        });
      }
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
