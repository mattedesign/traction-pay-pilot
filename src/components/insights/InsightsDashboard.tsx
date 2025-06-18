
import SmartInsightsDashboard from "./SmartInsightsDashboard";
import DashboardHeader from "./DashboardHeader";
import KeyMetricsGrid from "./KeyMetricsGrid";
import PerformanceInsightsSection from "./PerformanceInsightsSection";
import { CarrierProfile } from "@/pages/Index";

interface InsightsDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const InsightsDashboard = ({ carrierProfile, userProfile }: InsightsDashboardProps) => {
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
      <PerformanceInsightsSection carrierData={carrierData} />
    </div>
  );
};

export default InsightsDashboard;
