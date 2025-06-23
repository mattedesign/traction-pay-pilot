
import { useLoadProfitability } from "@/hooks/useLoadProfitability";
import LoadProfitabilityStats from "./LoadProfitabilityStats";
import LoadAnalysisSection from "./LoadAnalysisSection";
import RecommendationsSection from "./RecommendationsSection";

interface LoadProfitabilityIntelligenceProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
    loadCount: number;
  };
}

const LoadProfitabilityIntelligence = ({ carrierData }: LoadProfitabilityIntelligenceProps) => {
  const { loads, avgProfitMargin, highMarginLoads, lowMarginLoads } = useLoadProfitability();
  
  if (loads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">No factored loads available for profitability analysis.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <LoadProfitabilityStats 
        avgProfitMargin={avgProfitMargin}
        highMarginCount={highMarginLoads.length}
        lowMarginCount={lowMarginLoads.length}
      />
      
      {/* Collapsible Load Analysis */}
      <LoadAnalysisSection loads={loads} />
      
      {/* Collapsible Factoring-Specific Recommendations */}
      <RecommendationsSection highMarginLoads={highMarginLoads} />
    </div>
  );
};

export default LoadProfitabilityIntelligence;
