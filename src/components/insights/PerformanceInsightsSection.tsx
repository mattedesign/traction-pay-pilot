
import PerformanceBenchmarking from "./PerformanceBenchmarking";
import LoadProfitabilityIntelligence from "./LoadProfitabilityIntelligence";

interface PerformanceInsightsSectionProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
    loadCount: number;
    onTimeRate: number;
    fuelEfficiency: number;
  };
}

const PerformanceInsightsSection = ({ carrierData }: PerformanceInsightsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PerformanceBenchmarking carrierData={carrierData} />
      <LoadProfitabilityIntelligence carrierData={carrierData} />
    </div>
  );
};

export default PerformanceInsightsSection;
