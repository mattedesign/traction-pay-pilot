
import { Card, CardContent } from "@/components/ui/card";
import { LoadService } from "@/services/loadService";
import { FactoringService } from "@/services/factoringService";

interface LoadProfitabilityIntelligenceProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
    loadCount: number;
  };
}

const LoadProfitabilityIntelligence = ({ carrierData }: LoadProfitabilityIntelligenceProps) => {
  // Get real factored loads data
  const allLoads = LoadService.getAllLoads();
  const factoredLoads = FactoringService.getFactoredLoads(allLoads);
  
  // Transform factored loads into profitability analysis
  const loads = factoredLoads.slice(0, 4).map(load => {
    const grossRevenue = parseFloat(load.amount.replace('$', '').replace(',', ''));
    const factoringFee = FactoringService.calculateFactoringCost(load);
    const fuelCost = load.fuelCost ? parseFloat(load.fuelCost.replace('$', '').replace(',', '')) : grossRevenue * 0.15; // Estimate if not provided
    const opportunityCost = 150; // Base opportunity cost
    const netProfit = grossRevenue - factoringFee - fuelCost - opportunityCost;
    const profitMargin = (netProfit / grossRevenue) * 100;
    
    let rating = 'poor';
    if (profitMargin >= 70) rating = 'excellent';
    else if (profitMargin >= 60) rating = 'good';
    else if (profitMargin >= 50) rating = 'fair';
    
    return {
      id: load.id,
      customer: load.broker,
      route: `${load.origin} → ${load.destination}`,
      grossRevenue,
      factoringFee,
      fuelCost,
      opportunityCost,
      netProfit,
      profitMargin,
      rating,
      isFactored: true,
      factoringRate: FactoringService.getFactoringRate(load)
    };
  });
  
  if (loads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">No factored loads available for profitability analysis.</p>
      </div>
    );
  }
  
  const avgProfitMargin = loads.reduce((sum, load) => sum + load.profitMargin, 0) / loads.length;
  const highMarginLoads = loads.filter(load => load.profitMargin > avgProfitMargin);
  
  return (
    <div className="space-y-4">
      {/* Factoring-Specific Recommendations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Factoring Profitability Recommendations</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Focus on customers like {highMarginLoads[0]?.customer} - your highest margin factored performer</li>
            <li>• Negotiate better factoring rates for high-volume customers</li>
            <li>• Consider volume discounts when factoring rates exceed 3%</li>
            <li>• Fuel optimization could improve factored load margins by 2-3%</li>
            <li>• Premium factoring customers typically offer better net margins despite fees</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadProfitabilityIntelligence;
