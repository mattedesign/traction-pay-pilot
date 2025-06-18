
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, Target, Fuel, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SmartInsightsDashboard from "./SmartInsightsDashboard";
import PerformanceBenchmarking from "./PerformanceBenchmarking";
import LoadProfitabilityIntelligence from "./LoadProfitabilityIntelligence";
import { CarrierProfile } from "@/pages/Index";

interface InsightsDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const InsightsDashboard = ({ carrierProfile, userProfile }: InsightsDashboardProps) => {
  const navigate = useNavigate();
  
  // Create carrierData object from carrierProfile and mock data
  const carrierData = {
    monthlyRevenue: 127500,
    factoringRate: 3.5,
    loadCount: 24,
    onTimeRate: 96.8,
    fuelEfficiency: 7.2
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      {/* Header with greeting */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full relative">
                <div className="absolute -top-1 -left-1 w-2 h-1 bg-orange-400 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-2 h-1 bg-orange-400 rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-1 bg-orange-400 rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-1 bg-orange-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Good morning, {userProfile?.email?.split('@')[0] || 'Carrier'}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Key Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Revenue - Clickable */}
          <Card 
            className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
            onClick={() => navigate('/revenue-breakdown')}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Total Revenue</div>
                  <div className="text-slate-400 text-xs">Monthly earnings</div>
                </div>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">$127.5K</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+12.5%</span>
                  <span className="text-slate-500 ml-1">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* On-Time Rate - Clickable */}
          <Card 
            className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-green-300"
            onClick={() => navigate('/on-time-rate')}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">On-Time Rate</div>
                  <div className="text-slate-400 text-xs">Delivery performance</div>
                </div>
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">96.8%</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+2.1%</span>
                  <span className="text-slate-500 ml-1">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Loads - Clickable */}
          <Card 
            className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-purple-300"
            onClick={() => navigate('/active-loads')}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Active Loads</div>
                  <div className="text-slate-400 text-xs">Currently in progress</div>
                </div>
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">24</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+8.1%</span>
                  <span className="text-slate-500 ml-1">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fuel Efficiency - Clickable */}
          <Card 
            className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-orange-300"
            onClick={() => navigate('/fuel-efficiency')}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Fuel Efficiency</div>
                  <div className="text-slate-400 text-xs">Miles per gallon</div>
                </div>
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Fuel className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">7.2</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+5.8%</span>
                  <span className="text-slate-500 ml-1">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Time */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Avg Processing</div>
                  <div className="text-slate-400 text-xs">Document processing speed</div>
                </div>
                <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">2.4s</div>
                <div className="flex items-center text-xs">
                  <TrendingDown className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">-12%</span>
                  <span className="text-slate-500 ml-1">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Items */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Pending Items</div>
                  <div className="text-slate-400 text-xs">Requiring attention</div>
                </div>
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-emerald-600 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">5</div>
                <div className="flex items-center text-xs">
                  <TrendingDown className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">-1</span>
                  <span className="text-slate-500 ml-1">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Smart Insights Component */}
      <SmartInsightsDashboard carrierData={carrierData} />

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceBenchmarking carrierData={carrierData} />
        <LoadProfitabilityIntelligence carrierData={carrierData} />
      </div>
    </div>
  );
};

export default InsightsDashboard;
