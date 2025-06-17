
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LoadProfitabilityIntelligenceProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
    loadCount: number;
  };
}

const LoadProfitabilityIntelligence = ({ carrierData }: LoadProfitabilityIntelligenceProps) => {
  // Mock load profitability data
  const loads = [
    {
      id: "1234",
      customer: "FastShip Logistics",
      route: "Atlanta, GA → Miami, FL",
      grossRevenue: 2850,
      factoringFee: 57,
      fuelCost: 485,
      opportunityCost: 200,
      netProfit: 2108,
      profitMargin: 73.9,
      rating: "excellent"
    },
    {
      id: "5678", 
      customer: "Quick Freight Co",
      route: "Dallas, TX → Houston, TX",
      grossRevenue: 1200,
      factoringFee: 24,
      fuelCost: 180,
      opportunityCost: 150,
      netProfit: 846,
      profitMargin: 70.5,
      rating: "good"
    },
    {
      id: "9012",
      customer: "Bargain Shipping",
      route: "Phoenix, AZ → Los Angeles, CA", 
      grossRevenue: 980,
      factoringFee: 19.6,
      fuelCost: 165,
      opportunityCost: 180,
      netProfit: 615.4,
      profitMargin: 62.8,
      rating: "fair"
    },
    {
      id: "3456",
      customer: "LowRate Express",
      route: "Chicago, IL → Detroit, MI",
      grossRevenue: 750,
      factoringFee: 15,
      fuelCost: 120,
      opportunityCost: 200,
      netProfit: 415,
      profitMargin: 55.3,
      rating: "poor"
    }
  ];
  
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
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-900">{highMarginLoads.length}</div>
            <div className="text-sm text-blue-700">High-Margin Customers</div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-900">{lowMarginLoads.length}</div>
            <div className="text-sm text-red-700">Low-Margin Routes</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Load Analysis */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900">Recent Load Profitability</h4>
        
        {loads.map((load) => (
          <Card key={load.id} className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-slate-900">Load #{load.id} - {load.customer}</div>
                  <div className="text-sm text-slate-600">{load.route}</div>
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
                  <div className="font-medium text-red-600">-${load.factoringFee}</div>
                </div>
                <div>
                  <div className="text-slate-600">Fuel Cost</div>
                  <div className="font-medium text-red-600">-${load.fuelCost}</div>
                </div>
                <div>
                  <div className="text-slate-600">Net Profit</div>
                  <div className="font-medium text-green-600">${load.netProfit.toLocaleString()}</div>
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
                  ⚠️ Consider renegotiating rates or optimizing route efficiency for this customer
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recommendations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Profitability Recommendations</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Focus on customers like {highMarginLoads[0]?.customer} - your highest margin performer</li>
            <li>• Negotiate better rates with low-margin customers or consider alternatives</li>
            <li>• Fuel optimization could improve margins by 2-3% across all loads</li>
            <li>• Consider premium customers for loads over 500 miles - they typically pay 10-15% more</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadProfitabilityIntelligence;
