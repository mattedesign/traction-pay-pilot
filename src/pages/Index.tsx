
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import ChatOnlyDashboard from "@/components/ChatOnlyDashboard";

const Index = () => {
  const { profile } = useAuth();

  // Simple carrier profile for the chat dashboard
  const simplifiedCarrierProfile = {
    companySize: 'small' as const,
    fleetSize: 5,
    userRoles: ['owner-operator'],
    primaryUser: 'owner-operator' as const,
    businessCoachingLevel: 'basic' as const,
    onboardingCompleted: true
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <ChatOnlyDashboard 
          carrierProfile={simplifiedCarrierProfile}
          userProfile={profile}
        />
      </div>
    </div>
  );
};

export default Index;
