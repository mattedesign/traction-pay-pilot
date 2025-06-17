
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import SmartInsightsDashboard from "@/components/insights/SmartInsightsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Users, DollarSign } from "lucide-react";
import { LoadService } from "@/services/loadService";
import { FactoringService } from "@/services/factoringService";

const FactorDashboard = () => {
  const { profile } = useAuth();

  // Get real load data and calculate factoring insights
  const allLoads = LoadService.getAllLoads();
  const factoringInsights = FactoringService.generateFactoringInsights(allLoads);
  const factoredLoads = FactoringService.getFactoredLoads(allLoads);
  
  // Calculate real carrier data from factored loads
  const factoredRevenue = factoredLoads.reduce((total, load) => {
    const amount = parseFloat(load.amount.replace('$', '').replace(',', ''));
    return total + amount;
  }, 0);

  const realCarrierData = {
    monthlyRevenue: factoredRevenue,
    factoringRate: factoringInsights.averageFactoringRate,
    loadCount: factoringInsights.factoredCount,
    onTimeRate: 96, // Mock performance data - in real app would come from actual metrics
    fuelEfficiency: 6.8
  };

  const platformStats = {
    totalCarriers: 1247,
    monthlyVolume: 24500000,
    avgSavings: 8500,
    satisfactionRate: 94
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome to Traction Pay Intelligence, {profile?.first_name}!
            </h1>
            <p className="text-slate-600">
              Advanced factoring platform with AI-powered business intelligence for {profile?.company_name}
            </p>
          </div>

          {/* Platform Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      {platformStats.totalCarriers.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Active Carriers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      ${(platformStats.monthlyVolume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-slate-600">Monthly Volume</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      ${platformStats.avgSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Avg Monthly Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Brain className="w-8 h-8 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      {platformStats.satisfactionRate}%
                    </div>
                    <div className="text-sm text-slate-600">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Smart Insights Dashboard */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span>AI-Powered Business Intelligence Platform</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SmartInsightsDashboard carrierData={realCarrierData} />
            </CardContent>
          </Card>

          {/* Demo Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🚀 Traction Pay Intelligence - Factoring Focus
              </h3>
              <p className="text-blue-800">
                This dashboard provides AI-powered insights specifically for your factored loads. 
                The intelligence system analyzes {factoringInsights.factoredCount} factored loads out of {allLoads.length} total loads 
                to provide personalized recommendations for cost optimization and business growth.
              </p>
              <div className="mt-4 text-sm text-blue-700">
                <strong>Factoring Intelligence Features:</strong> Real-time cost analysis, factoring rate optimization, 
                load profitability insights for factored shipments, performance benchmarking, and smart alerts 
                for factoring cost savings opportunities.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FactorDashboard;
