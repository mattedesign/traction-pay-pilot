
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import SmallCarrierDashboard from "@/components/adaptive/SmallCarrierDashboard";
import LargeCarrierDashboard from "@/components/adaptive/LargeCarrierDashboard";
import CarrierSizeDetector from "@/components/adaptive/CarrierSizeDetector";

export interface CarrierProfile {
  companySize: 'small' | 'large';
  fleetSize: number;
  userRoles: string[];
  primaryUser: 'owner-operator' | 'dispatcher' | 'fleet-manager' | 'executive';
  businessCoachingLevel: 'basic' | 'advanced' | 'enterprise';
  onboardingCompleted: boolean;
}

const AdaptiveDashboardPage = () => {
  const { profile } = useAuth();
  const [carrierProfile, setCarrierProfile] = useState<CarrierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching carrier profile - replace with actual API call
    const fetchCarrierProfile = async () => {
      setIsLoading(true);
      
      // Mock data - replace with actual API call
      const mockProfile: CarrierProfile = {
        companySize: 'small', // Will be determined by onboarding or fleet size
        fleetSize: 3,
        userRoles: ['owner-operator'],
        primaryUser: 'owner-operator',
        businessCoachingLevel: 'basic',
        onboardingCompleted: false
      };

      // Determine company size based on fleet size
      if (mockProfile.fleetSize >= 50) {
        mockProfile.companySize = 'large';
        mockProfile.businessCoachingLevel = 'enterprise';
      } else if (mockProfile.fleetSize >= 20) {
        mockProfile.businessCoachingLevel = 'advanced';
      }

      setCarrierProfile(mockProfile);
      setIsLoading(false);
    };

    fetchCarrierProfile();
  }, []);

  const handleCarrierSetup = (setupProfile: CarrierProfile) => {
    setCarrierProfile({
      ...setupProfile,
      onboardingCompleted: true
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex w-full bg-slate-50">
        <NavigationSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-600">Loading adaptive dashboard...</div>
        </div>
      </div>
    );
  }

  // Show carrier setup if not completed onboarding
  if (!carrierProfile?.onboardingCompleted) {
    return (
      <div className="min-h-screen flex w-full bg-slate-50">
        <NavigationSidebar />
        <div className="flex-1">
          <CarrierSizeDetector onSetupComplete={handleCarrierSetup} />
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on carrier size
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      <div className="flex-1">
        {carrierProfile.companySize === 'small' ? (
          <SmallCarrierDashboard 
            carrierProfile={carrierProfile}
            userProfile={profile}
          />
        ) : (
          <LargeCarrierDashboard 
            carrierProfile={carrierProfile}
            userProfile={profile}
          />
        )}
      </div>
    </div>
  );
};

export default AdaptiveDashboardPage;
