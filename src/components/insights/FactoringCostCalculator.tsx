
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";

interface FactoringCostCalculatorProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
  };
}

const FactoringCostCalculator = ({ carrierData }: FactoringCostCalculatorProps) => {
  const [customRate, setCustomRate] = useState(carrierData.factoringRate);
  
  const monthlyFactoringCost = (carrierData.monthlyRevenue * customRate) / 100;
  const potentialFuelSavings = carrierData.monthlyRevenue * 0.08; // 8% potential fuel savings
  const netImpact = potentialFuelSavings - monthlyFactoringCost;
  
  return (
    <div className="space-y-4">
      {/* Rate Input */}
      <div>
        <Label htmlFor="factoring-rate">Your Factoring Rate (%)</Label>
        <Input
          id="factoring-rate"
          type="number"
          step="0.1"
          value={customRate}
          onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
          className="mt-1"
        />
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-900">Monthly Factoring Cost</span>
              </div>
              <span className="text-xl font-bold text-red-900">
                ${monthlyFactoringCost.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Potential Fuel Savings</span>
              </div>
              <span className="text-xl font-bold text-green-900">
                ${potentialFuelSavings.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={`${netImpact >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className={`w-5 h-5 ${netImpact >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                <span className={`font-medium ${netImpact >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
                  Net Monthly Impact
                </span>
              </div>
              <span className={`text-xl font-bold ${netImpact >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
                {netImpact >= 0 ? '+' : ''}${netImpact.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Opportunity Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Savings Opportunity</span>
          <span className="font-medium">{((potentialFuelSavings / monthlyFactoringCost) * 100).toFixed(0)}%</span>
        </div>
        <Progress 
          value={(potentialFuelSavings / monthlyFactoringCost) * 100} 
          className="h-2"
        />
      </div>

      {/* Insight */}
      <div className="p-3 bg-slate-50 rounded-lg">
        <p className="text-sm text-slate-700">
          {netImpact >= 0 
            ? `💡 Your fuel optimization opportunities could offset ${((potentialFuelSavings / monthlyFactoringCost) * 100).toFixed(0)}% of factoring costs.`
            : `⚠️ Consider optimizing routes and fuel usage to maximize the value of factoring services.`
          }
        </p>
      </div>
    </div>
  );
};

export default FactoringCostCalculator;
