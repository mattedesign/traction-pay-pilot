import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertCircle, Star, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  
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
  
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return <Star className="w-4 h-4" />;
      case 'good': return <TrendingUp className="w-4 h-4" />;
      case 'fair': return <TrendingDown className="w-4 h-4" />;
      case 'poor': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };
  
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
      
      {/* Collapsible Load Analysis */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-slate-900">Recent Factored Load Profitability</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4 mt-4">
          {loads.map((load) => (
            <Card key={load.id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-slate-900">Load #{load.id} - {load.customer}</div>
                    <div className="text-sm text-slate-600">{load.route}</div>
                    <div className="text-xs text-blue-600">Factoring Rate: {load.factoringRate}%</div>
                  </div>
                  <Badge className={getRatingColor(load.rating)}>
                    {getRatingIcon(load.rating)}
                    <span className="ml-1 capitalize">{load.rating}</span>
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <div className="text-slate-600">Gross Revenue</div>
                    <div className="font-medium">${load.grossRevenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Factoring Fee</div>
                    <div className="font-medium text-red-600">-${load.factoringFee.toFixed(0)}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Fuel Cost</div>
                    <div className="font-medium text-red-600">-${load.fuelCost.toFixed(0)}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Net Profit</div>
                    <div className="font-medium text-green-600">${load.netProfit.toFixed(0)}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Profit Margin</span>
                    <span className="font-medium">{load.profitMargin.toFixed(1)}%</span>
                  </div>
                  <Progress value={load.profitMargin} className="h-2" />
                </div>
                
                {load.profitMargin < 60 && (
                  <div className="mt-3 p-2 bg-orange-50 rounded text-sm text-orange-800">
                    ⚠️ Consider renegotiating factoring rates or optimizing route efficiency for this customer
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CollapsibleContent>
      </Collapsible>
      
      {/* Collapsible Factoring-Specific Recommendations */}
      <Collapsible open={isRecommendationsOpen} onOpenChange={setIsRecommendationsOpen}>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-blue-900">Factoring Profitability Recommendations</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isRecommendationsOpen ? 'transform rotate-180' : ''}`} />
                  <span className="sr-only">Toggle recommendations</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2">
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Focus on customers like {highMarginLoads[0]?.customer} - your highest margin factored performer</li>
                <li>• Negotiate better factoring rates for high-volume customers</li>
                <li>• Consider volume discounts when factoring rates exceed 3%</li>
                <li>• Fuel optimization could improve factored load margins by 2-3%</li>
                <li>• Premium factoring customers typically offer better net margins despite fees</li>
              </ul>
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default LoadProfitabilityIntelligence;
