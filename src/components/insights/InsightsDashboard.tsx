
import SmartInsightsDashboard from "./SmartInsightsDashboard";
import PerformanceBenchmarking from "./PerformanceBenchmarking";
import LoadProfitabilityIntelligence from "./LoadProfitabilityIntelligence";
import HabituallyLateInsightsDashboard from "./HabituallyLateInsightsDashboard";
import DashboardHeader from "./DashboardHeader";
import KeyMetricsGrid from "./KeyMetricsGrid";
import { CarrierProfile } from "@/pages/Index";

interface InsightsDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const InsightsDashboard = ({ carrierProfile, userProfile }: InsightsDashboardProps) => {
  // Check if user is habitually late carrier
  const isHabituallyLateCarrier = userProfile?.user_type === 'habitually_late_carrier';

  // Render specialized dashboard for habitually late carriers
  if (isHabituallyLateCarrier) {
    return <HabituallyLateInsightsDashboard carrierProfile={carrierProfile} userProfile={userProfile} />;
  }

  // Create carrierData object from carrierProfile and mock data
  const carrierData = {
    monthlyRevenue: 127500,
    factoringRate: 3.5,
    loadCount: 24,
    onTimeRate: 96.8,
    fuelEfficiency: 7.2
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      {/* Header with greeting */}
      <DashboardHeader userProfile={userProfile} />

      {/* Key Metrics Section */}
      <KeyMetricsGrid />

      {/* Smart Insights Component */}
      <SmartInsightsDashboard carrierData={carrierData} />

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceBenchmarking carrierData={carrierData} />
        <LoadProfitabilityIntelligence carrierData={carrierData} />
      </div>
    </div>
  );
};

export default InsightsDashboard;
