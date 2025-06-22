
import HabituallyLateDashboardLayout from "./HabituallyLateDashboardLayout";
import { CarrierProfile } from "@/pages/Index";

interface HabituallyLateInsightsDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const HabituallyLateInsightsDashboard = ({ carrierProfile, userProfile }: HabituallyLateInsightsDashboardProps) => {
  return (
    <HabituallyLateDashboardLayout 
      carrierProfile={carrierProfile} 
      userProfile={userProfile} 
    />
  );
};

export default HabituallyLateInsightsDashboard;
