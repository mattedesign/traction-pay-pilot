
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import SmartInsightsDashboard from "@/components/insights/SmartInsightsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Users, DollarSign } from "lucide-react";

const FactorDashboard = () => {
  const { profile } = useAuth();

  // Mock carrier data for the factor demo user
  const mockCarrierData = {
    monthlyRevenue: 48500,
    factoringRate: 2.5,
    loadCount: 22,
    onTimeRate: 96,
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
              <SmartInsightsDashboard carrierData={mockCarrierData} />
            </CardContent>
          </Card>

          {/* Demo Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🚀 Traction Pay Intelligence Demo
              </h3>
              <p className="text-blue-800">
                This dashboard demonstrates our AI-powered factoring intelligence platform. 
                Real implementations provide personalized insights based on your actual 
                carrier data, load history, and performance metrics.
              </p>
              <div className="mt-4 text-sm text-blue-700">
                <strong>Key Features:</strong> Real-time cost analysis, personalized AI coaching, 
                load profitability intelligence, performance benchmarking, and smart alerts 
                for cost savings opportunities.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FactorDashboard;
