
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import InsightsDashboard from "@/components/insights/InsightsDashboard";
import { CarrierProfile } from "@/pages/Index";
import { useState, useEffect } from "react";

const InsightsPage = () => {
  const { profile } = useAuth();
  const [carrierProfile, setCarrierProfile] = useState<CarrierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch carrier profile based on the actual user's email and profile
    const fetchCarrierProfile = async () => {
      setIsLoading(true);
      
      if (!profile) {
        setIsLoading(false);
        return;
      }

      console.log('Fetching carrier profile for insights page, user:', profile.email);

      // Determine profile based on user email (same logic as Index.tsx)
      let mockProfile: CarrierProfile;

      if (profile.email === 'factor.demo@tractionpay.com') {
        mockProfile = {
          companySize: 'large',
          fleetSize: 75,
          userRoles: ['fleet-manager', 'executive'],
          primaryUser: 'executive',
          businessCoachingLevel: 'enterprise',
          onboardingCompleted: true
        };
      } else if (profile.email === 'newcarrier.demo@tractionpay.com') {
        mockProfile = {
          companySize: 'small',
          fleetSize: 2,
          userRoles: ['owner-operator'],
          primaryUser: 'owner-operator',
          businessCoachingLevel: 'basic',
          onboardingCompleted: true // Set to true for insights page
        };
      } else if (profile.email === 'carrier.demo@tractionpay.com') {
        mockProfile = {
          companySize: 'small',
          fleetSize: 5,
          userRoles: ['owner-operator'],
          primaryUser: 'owner-operator',
          businessCoachingLevel: 'basic',
          onboardingCompleted: true
        };
      } else {
        mockProfile = {
          companySize: 'small',
          fleetSize: 3,
          userRoles: ['owner-operator'],
          primaryUser: 'owner-operator',
          businessCoachingLevel: 'basic',
          onboardingCompleted: true // Set to true for insights page
        };
      }

      // Determine company size based on fleet size
      if (mockProfile.fleetSize >= 50) {
        mockProfile.companySize = 'large';
        mockProfile.businessCoachingLevel = 'enterprise';
      } else if (mockProfile.fleetSize >= 20) {
        mockProfile.businessCoachingLevel = 'advanced';
      }

      console.log('Setting carrier profile for insights:', mockProfile);
      setCarrierProfile(mockProfile);
      setIsLoading(false);
    };

    fetchCarrierProfile();
  }, [profile]);

  if (isLoading) {
    return (
      <div className="h-screen flex w-full bg-slate-50 overflow-hidden">
        <NavigationSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-600">Loading insights...</div>
        </div>
      </div>
    );
  }

  if (!carrierProfile) {
    return (
      <div className="h-screen flex w-full bg-slate-50 overflow-hidden">
        <NavigationSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-600">Unable to load carrier profile</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex w-full bg-slate-50 overflow-hidden">
      <NavigationSidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <InsightsDashboard 
            carrierProfile={carrierProfile}
            userProfile={profile}
          />
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
