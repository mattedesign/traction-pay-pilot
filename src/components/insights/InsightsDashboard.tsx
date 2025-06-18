
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SmartInsightsDashboard from "./SmartInsightsDashboard";
import PerformanceBenchmarking from "./PerformanceBenchmarking";
import LoadProfitabilityIntelligence from "./LoadProfitabilityIntelligence";
import { CarrierProfile } from "@/pages/Index";

interface InsightsDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const InsightsDashboard = ({ carrierProfile, userProfile }: InsightsDashboardProps) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Business Insights</h1>
        <div className="text-sm text-slate-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$127,500</div>
            <div className="text-sm text-green-600 flex items-center">
              ↗ +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Active Loads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">24</div>
            <div className="text-sm text-green-600 flex items-center">
              ↗ +8.2% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Fuel Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">7.2 MPG</div>
            <div className="text-sm text-green-600 flex items-center">
              ↗ +5.8% improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">On-Time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">96.8%</div>
            <div className="text-sm text-green-600 flex items-center">
              ↗ +2.1% this quarter
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Insights Component */}
      <SmartInsightsDashboard />

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceBenchmarking />
        <LoadProfitabilityIntelligence />
      </div>
    </div>
  );
};

export default InsightsDashboard;
