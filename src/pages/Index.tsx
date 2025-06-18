import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import SmallCarrierDashboard from "@/components/adaptive/SmallCarrierDashboard";
import LargeCarrierDashboard from "@/components/adaptive/LargeCarrierDashboard";
import CarrierSizeDetector from "@/components/adaptive/CarrierSizeDetector";
import TabbedDashboard from "@/components/TabbedDashboard";
import FactorDashboard from "@/components/FactorDashboard";
import { useNavigate } from "react-router-dom";

export interface CarrierProfile {
  companySize: 'small' | 'large';
  fleetSize: number;
  userRoles: string[];
  primaryUser: 'owner-operator' | 'dispatcher' | 'fleet-manager' | 'executive';
  businessCoachingLevel: 'basic' | 'advanced' | 'enterprise';
  onboardingCompleted: boolean;
}

const Index = () => {
  const navigate = useNavigate();
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

      console.log('Fetching carrier profile for user:', profile.email);

      // Check if this is the factor demo user
      if (profile.email === 'factor.demo@tractionpay.com') {
        // Factor demo user gets their own special dashboard
        console.log('Factor demo user detected, showing special dashboard');
        setIsLoading(false);
        return;
      }

      // Determine onboarding status based on user email
      let mockProfile: CarrierProfile;

      if (profile.email === 'newcarrier.demo@tractionpay.com') {
        // New carrier demo - needs onboarding
        mockProfile = {
          companySize: 'small',
          fleetSize: 2,
          userRoles: ['owner-operator'],
          primaryUser: 'owner-operator',
          businessCoachingLevel: 'basic',
          onboardingCompleted: false
        };
      } else if (profile.email === 'carrier.demo@tractionpay.com') {
        // Existing carrier demo - already onboarded, goes directly to dashboard
        mockProfile = {
          companySize: 'small',
          fleetSize: 5,
          userRoles: ['owner-operator'],
          primaryUser: 'owner-operator',
          businessCoachingLevel: 'basic',
          onboardingCompleted: true
        };
      } else {
        // Default for other users - assume they need onboarding
        mockProfile = {
          companySize: 'small',
          fleetSize: 3,
          userRoles: ['owner-operator'],
          primaryUser: 'owner-operator',
          businessCoachingLevel: 'basic',
          onboardingCompleted: false
        };
      }

      // Determine company size based on fleet size
      if (mockProfile.fleetSize >= 50) {
        mockProfile.companySize = 'large';
        mockProfile.businessCoachingLevel = 'enterprise';
      } else if (mockProfile.fleetSize >= 20) {
        mockProfile.businessCoachingLevel = 'advanced';
      }

      console.log('Setting carrier profile:', mockProfile);
      setCarrierProfile(mockProfile);
      setIsLoading(false);
    };

    fetchCarrierProfile();
  }, [profile]);

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

  // Show factor dashboard for factor demo user
  if (profile?.email === 'factor.demo@tractionpay.com') {
    console.log('Rendering factor dashboard for:', profile.email);
    return <FactorDashboard />;
  }

  // Show carrier setup if not completed onboarding
  if (!carrierProfile?.onboardingCompleted) {
    console.log('Showing onboarding for user:', profile?.email, 'onboardingCompleted:', carrierProfile?.onboardingCompleted);
    return (
      <div className="min-h-screen flex w-full bg-slate-50">
        <NavigationSidebar />
        <div className="flex-1">
          <CarrierSizeDetector onSetupComplete={handleCarrierSetup} />
        </div>
      </div>
    );
  }

  console.log('Showing dashboard for user:', profile?.email, 'carrierProfile:', carrierProfile);

  // Render tabbed dashboard for all completed onboarding users
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TabbedDashboard 
          carrierProfile={carrierProfile}
          userProfile={profile}
        />
      </div>
    </div>
  );
};

export default Index;
