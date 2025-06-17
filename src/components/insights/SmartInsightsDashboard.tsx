
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calculator, Brain, Target, AlertTriangle, Info } from "lucide-react";
import FactoringCostCalculator from "./FactoringCostCalculator";
import ContextualCoachingWidget from "./ContextualCoachingWidget";
import LoadProfitabilityIntelligence from "./LoadProfitabilityIntelligence";
import PerformanceBenchmarking from "./PerformanceBenchmarking";
import SmartAlerts from "./SmartAlerts";
import { LoadService } from "@/services/loadService";
import { FactoringService } from "@/services/factoringService";

interface SmartInsightsDashboardProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
    loadCount: number;
    onTimeRate: number;
    fuelEfficiency: number;
  };
}

const SmartInsightsDashboard = ({ carrierData }: SmartInsightsDashboardProps) => {
  // Get actual load data and filter for factored loads only
  const allLoads = LoadService.getAllLoads();
  const factoredLoads = FactoringService.getFactoredLoads(allLoads);
  const factoringInsights = FactoringService.generateFactoringInsights(allLoads);
  
  // If no factored loads exist, show a different message
  if (factoredLoads.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Smart Insights</h2>
            <p className="text-slate-600">AI-powered business intelligence for factored loads</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            <Brain className="w-4 h-4 mr-1" />
            AI Powered
          </Badge>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Info className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">No Factored Loads Found</h3>
                <p className="text-blue-800">
                  Smart insights are available for loads that use factoring services. 
                  When you have factored loads, you'll see AI-powered analysis including:
                </p>
                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                  <li>• Factoring cost optimization recommendations</li>
                  <li>• Load profitability intelligence</li>
                  <li>• Performance benchmarking against industry standards</li>
                  <li>• Personalized business coaching insights</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate factoring-specific metrics
  const avgFactoringRate = factoringInsights.averageFactoringRate;
  const factoredRevenue = factoredLoads.reduce((total, load) => {
    const amount = parseFloat(load.amount.replace('$', '').replace(',', ''));
    return total + amount;
  }, 0);

  const adjustedCarrierData = {
    ...carrierData,
    monthlyRevenue: factoredRevenue,
    factoringRate: avgFactoringRate,
    loadCount: factoredLoads.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Smart Insights</h2>
          <p className="text-slate-600">AI-powered business intelligence for your factored loads</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">
            {factoredLoads.length} Factored Loads
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Brain className="w-4 h-4 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Smart Alerts - Top Priority */}
      <SmartAlerts carrierData={adjustedCarrierData} />

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Factoring Cost Calculator */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-green-600" />
              <span>Factoring Cost Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FactoringCostCalculator carrierData={adjustedCarrierData} />
          </CardContent>
        </Card>

        {/* Contextual AI Coaching */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI Business Coach</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ContextualCoachingWidget carrierData={adjustedCarrierData} />
          </CardContent>
        </Card>
      </div>

      {/* Load Profitability Section */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Factored Load Profitability Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadProfitabilityIntelligence carrierData={adjustedCarrierData} />
        </CardContent>
      </Card>

      {/* Performance Benchmarking */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-orange-600" />
            <span>Performance Benchmarking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceBenchmarking carrierData={adjustedCarrierData} />
        </CardContent>
      </Card>

      {/* Factoring Overview */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-slate-900 mb-3">Factoring Overview</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-slate-900">{factoringInsights.factoredCount}</div>
              <div className="text-xs text-slate-600">Factored Loads</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{factoringInsights.nonFactoredCount}</div>
              <div className="text-xs text-slate-600">Non-Factored Loads</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">${factoringInsights.totalFactoringCost.toLocaleString()}</div>
              <div className="text-xs text-slate-600">Total Factoring Cost</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{factoringInsights.averageFactoringRate.toFixed(1)}%</div>
              <div className="text-xs text-slate-600">Avg Factoring Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartInsightsDashboard;
