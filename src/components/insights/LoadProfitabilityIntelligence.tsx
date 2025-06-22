
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
  const lowMarginLoads = loads.filter(load => load.profitMargin <= 60);
  
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-900">{avgProfitMargin.toFixed(1)}%</div>
            <div className="text-sm text-green-700">Average Profit Margin</div>
            <div className="text-xs text-green-600">Factored Loads Only</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-900">{highMarginLoads.length}</div>
            <div className="text-sm text-blue-700">High-Margin Customers</div>
            <div className="text-xs text-blue-600">Above Average</div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-900">{lowMarginLoads.length}</div>
            <div className="text-sm text-red-700">Low-Margin Routes</div>
            <div className="text-xs text-red-600">Needs Attention</div>
          </CardContent>
        </Card>
      </div>
      
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
