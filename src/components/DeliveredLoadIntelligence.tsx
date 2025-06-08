
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Fuel, TrendingUp, DollarSign, Target, Lightbulb, BarChart3 } from "lucide-react";
import { Load } from "@/types/load";

interface DeliveredLoadIntelligenceProps {
  load: Load;
}

const DeliveredLoadIntelligence = ({ load }: DeliveredLoadIntelligenceProps) => {
  const rate = parseFloat(load.amount.replace('$', '').replace(',', ''));
  const fuelCost = parseFloat(load.fuelCost?.replace('$', '') || '0');
  const estimatedProfit = rate - fuelCost - 200; // Subtract estimated other costs
  const profitMargin = ((estimatedProfit / rate) * 100).toFixed(1);
  
  // Calculate potential improvements
  const fuelSavings = Math.round(fuelCost * 0.15); // 15% potential fuel savings
  const improvedProfit = estimatedProfit + fuelSavings;
  const improvedMargin = ((improvedProfit / rate) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Load Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Load Performance Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-green-900">Revenue</p>
              <p className="text-lg font-bold text-green-700">{load.amount}</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <Fuel className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-red-900">Fuel Cost</p>
              <p className="text-lg font-bold text-red-700">${fuelCost}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-blue-900">Profit</p>
              <p className="text-lg font-bold text-blue-700">${estimatedProfit}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Target className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-purple-900">Margin</p>
              <p className="text-lg font-bold text-purple-700">{profitMargin}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fuel Efficiency Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fuel className="w-5 h-5 text-orange-600" />
            <span>Fuel Efficiency Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-slate-700 mb-1 block">Miles Driven</span>
              <p className="text-sm font-semibold text-slate-900">{load.distance}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-slate-700 mb-1 block">Fuel Cost</span>
              <p className="text-sm font-semibold text-slate-900">${fuelCost}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-slate-700 mb-1 block">Cost Per Mile</span>
              <p className="text-sm font-semibold text-slate-900">
                ${(fuelCost / parseFloat(load.distance.replace(' miles', ''))).toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="text-sm font-medium text-orange-900 mb-2">Fuel Performance</h4>
            <p className="text-sm text-orange-800">
              Your fuel efficiency was <span className="font-semibold">6.2 MPG</span> on this route. 
              This is <span className="font-semibold text-green-700">8% better</span> than the industry average of 5.7 MPG.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profit Improvement Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span>Profit Improvement Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-green-900">Route Optimization</p>
                <p className="text-xs text-green-700">
                  Using our recommended route could have saved ${fuelSavings} in fuel costs
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-900">Load Consolidation</p>
                <p className="text-xs text-blue-700">
                  Similar loads on this route available - could increase efficiency by 12%
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-purple-900">Timing Optimization</p>
                <p className="text-xs text-purple-700">
                  Delivering during off-peak hours could reduce fuel costs by 8%
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-900">Potential Improved Margin</p>
                <p className="text-xs text-slate-600">With optimization suggestions applied</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{improvedMargin}%</p>
                <p className="text-xs text-green-700">+{(parseFloat(improvedMargin) - parseFloat(profitMargin)).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <Button className="w-full" variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Detailed Optimization Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveredLoadIntelligence;
