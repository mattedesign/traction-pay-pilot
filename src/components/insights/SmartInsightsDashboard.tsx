
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calculator, Brain, Target, AlertTriangle } from "lucide-react";
import FactoringCostCalculator from "./FactoringCostCalculator";
import ContextualCoachingWidget from "./ContextualCoachingWidget";
import LoadProfitabilityIntelligence from "./LoadProfitabilityIntelligence";
import PerformanceBenchmarking from "./PerformanceBenchmarking";
import SmartAlerts from "./SmartAlerts";

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Smart Insights</h2>
          <p className="text-slate-600">AI-powered business intelligence for your operation</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Brain className="w-4 h-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Smart Alerts - Top Priority */}
      <SmartAlerts carrierData={carrierData} />

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
            <FactoringCostCalculator carrierData={carrierData} />
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
            <ContextualCoachingWidget carrierData={carrierData} />
          </CardContent>
        </Card>
      </div>

      {/* Load Profitability Section */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Load Profitability Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadProfitabilityIntelligence carrierData={carrierData} />
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
          <PerformanceBenchmarking carrierData={carrierData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartInsightsDashboard;
