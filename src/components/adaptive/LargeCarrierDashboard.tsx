import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  BarChart3, 
  MapPin, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck
} from "lucide-react";
import { CarrierProfile } from "@/types/carrier";

interface LargeCarrierDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const LargeCarrierDashboard = ({ carrierProfile, userProfile }: LargeCarrierDashboardProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(carrierProfile.primaryUser);

  // Mock enterprise data
  const fleetMetrics = {
    totalTrucks: carrierProfile.fleetSize,
    activeTrucks: Math.floor(carrierProfile.fleetSize * 0.85),
    totalLoads: 47,
    completedToday: 12,
    revenueToday: 125000,
    avgMargin: 0.22,
    exceptions: 3,
    onTimePerformance: 0.94
  };

  const departmentMetrics = {
    dispatch: {
      activeLoads: 47,
      averageLoadTime: "2.3 hours",
      efficiency: 0.92,
      exceptions: 3
    },
    operations: {
      fleetUtilization: 0.85,
      fuelEfficiency: 6.2,
      maintenanceAlerts: 5,
      complianceScore: 0.98
    },
    finance: {
      dailyRevenue: 125000,
      outstandingAR: 450000,
      cashFlow: 85000,
      marginTrend: 0.03
    }
  };

  const renderExecutiveDashboard = () => (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Daily Revenue</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${fleetMetrics.revenueToday.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">+8.5% vs yesterday</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Fleet Utilization</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(departmentMetrics.operations.fleetUtilization * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  {fleetMetrics.activeTrucks}/{fleetMetrics.totalTrucks} active
                </p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Profit Margin</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(fleetMetrics.avgMargin * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-green-600 mt-1">+3% vs last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Performance Score</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(fleetMetrics.onTimePerformance * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  {fleetMetrics.exceptions} exceptions
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Insights */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Strategic Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Growth Opportunity</h4>
              <p className="text-sm text-green-700 mb-3">
                Southeast market showing 15% growth potential with your current capacity
              </p>
              <Button size="sm" variant="outline">
                Explore Market
              </Button>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Efficiency Gains</h4>
              <p className="text-sm text-blue-700 mb-3">
                Route optimization could save $45K monthly across your fleet
              </p>
              <Button size="sm" variant="outline">
                View Analysis
              </Button>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Technology ROI</h4>
              <p className="text-sm text-purple-700 mb-3">
                Advanced ELD integration showing 320% ROI in first year
              </p>
              <Button size="sm" variant="outline">
                Implementation Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDispatcherDashboard = () => (
    <div className="space-y-6">
      {/* Dispatch Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Loads</p>
                <p className="text-2xl font-bold text-slate-900">
                  {departmentMetrics.dispatch.activeLoads}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Load Time</p>
                <p className="text-2xl font-bold text-slate-900">
                  {departmentMetrics.dispatch.averageLoadTime}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Efficiency</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(departmentMetrics.dispatch.efficiency * 100).toFixed(0)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Exceptions</p>
                <p className="text-2xl font-bold text-slate-900">
                  {departmentMetrics.dispatch.exceptions}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Load Matching Intelligence */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Intelligent Load Matching</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">High-Value Load Available</h4>
                  <p className="text-sm text-slate-600">Chicago, IL → Dallas, TX</p>
                  <p className="text-sm text-green-600">96% match for Truck #127</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">$3,450</div>
                  <Button size="sm" className="mt-2">Assign</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFleetManagerDashboard = () => (
    <div className="space-y-6">
      {/* Operations Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Fleet Utilization</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(departmentMetrics.operations.fleetUtilization * 100).toFixed(0)}%
                </p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Fuel Efficiency</p>
                <p className="text-2xl font-bold text-slate-900">
                  {departmentMetrics.operations.fuelEfficiency} MPG
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Compliance Score</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(departmentMetrics.operations.complianceScore * 100).toFixed(0)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Fleet Performance Heat Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <h4 className="font-semibold text-green-900">Top Performers</h4>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-green-700">trucks</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <h4 className="font-semibold text-blue-900">Average</h4>
              <p className="text-2xl font-bold text-blue-600">28</p>
              <p className="text-sm text-blue-700">trucks</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <h4 className="font-semibold text-yellow-900">Needs Attention</h4>
              <p className="text-2xl font-bold text-yellow-600">7</p>
              <p className="text-sm text-yellow-700">trucks</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <h4 className="font-semibold text-red-900">Critical</h4>
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-sm text-red-700">trucks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Fleet Command Center
            </h1>
            <p className="text-slate-600 mt-1">
              Enterprise dashboard for {userProfile?.company_name || 'your organization'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-100 text-purple-800">
              <Building2 className="w-3 h-3 mr-1" />
              Enterprise
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              {carrierProfile.fleetSize} Trucks
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Role-Based Tabs */}
        <Tabs value={selectedRole} onValueChange={setSelectedRole} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="executive">Executive View</TabsTrigger>
            <TabsTrigger value="fleet-manager">Fleet Operations</TabsTrigger>
            <TabsTrigger value="dispatcher">Dispatch Center</TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="space-y-6">
            {renderExecutiveDashboard()}
          </TabsContent>

          <TabsContent value="fleet-manager" className="space-y-6">
            {renderFleetManagerDashboard()}
          </TabsContent>

          <TabsContent value="dispatcher" className="space-y-6">
            {renderDispatcherDashboard()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LargeCarrierDashboard;
