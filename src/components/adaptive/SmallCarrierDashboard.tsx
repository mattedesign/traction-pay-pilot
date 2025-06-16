
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  Route,
  Target,
  Lightbulb,
  Clock,
  MapPin
} from "lucide-react";
import { CarrierProfile } from "@/pages/AdaptiveDashboardPage";
import MorningRoutineWidget from "@/components/business-coach/MorningRoutineWidget";
import AIBusinessCoach from "@/components/business-coach/AIBusinessCoach";
import SavingsOpportunityDetector from "@/components/savings/SavingsOpportunityDetector";

interface SmallCarrierDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const SmallCarrierDashboard = ({ carrierProfile, userProfile }: SmallCarrierDashboardProps) => {
  // Mock data for demonstration
  const activeLoads = [
    {
      id: "BL-2024-001",
      status: "in_transit",
      origin: "Chicago, IL",
      destination: "Atlanta, GA",
      revenue: 2450,
      margin: 0.18,
      alerts: ["Early delivery opportunity: +$150"]
    },
    {
      id: "BL-2024-002", 
      status: "ready_to_invoice",
      origin: "Dallas, TX",
      destination: "Miami, FL",
      revenue: 1850,
      margin: 0.22,
      alerts: []
    }
  ];

  const todaysMetrics = {
    totalRevenue: 4300,
    profitMargin: 0.20,
    fuelEfficiency: 6.8,
    onTimePerformance: 0.95
  };

  const coachingAlerts = [
    {
      type: "opportunity",
      title: "Route Optimization Available",
      description: "Save $120 on fuel with alternate route to Atlanta",
      priority: "high",
      potentialSavings: 120
    },
    {
      type: "financial",
      title: "QuickPay Recommendation",
      description: "Consider QuickPay for BL-2024-001 to improve cash flow",
      priority: "medium",
      potentialSavings: 0
    },
    {
      type: "performance",
      title: "Excellent Week!",
      description: "You're 15% above industry average this week",
      priority: "positive",
      potentialSavings: 0
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "opportunity": return Route;
      case "financial": return DollarSign;
      case "performance": return TrendingUp;
      default: return AlertCircle;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "positive": return "text-green-600 bg-green-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Good morning, {userProfile?.first_name}!
            </h1>
            <p className="text-slate-600 mt-1">
              Here's your business snapshot for today
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800">
              <Truck className="w-3 h-3 mr-1" />
              {carrierProfile.fleetSize} Trucks
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              Owner-Operator
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Morning Routine Widget */}
        <MorningRoutineWidget 
          metrics={todaysMetrics}
          activeLoads={activeLoads.length}
          coachingAlerts={coachingAlerts.length}
        />

        {/* AI Business Coach Alerts */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <span>Business Coach Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coachingAlerts.map((alert, index) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg flex items-start space-x-3 ${getAlertColor(alert.priority)}`}
                  >
                    <IconComponent className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <p className="text-sm mt-1">{alert.description}</p>
                      {alert.potentialSavings > 0 && (
                        <Badge className="mt-2 bg-green-100 text-green-800">
                          Save ${alert.potentialSavings}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Load Overview - Simplified */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-6 h-6 text-slate-700" />
              <span>Active Loads</span>
              <Badge className="bg-blue-100 text-blue-800">
                {activeLoads.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLoads.map((load) => (
                <div key={load.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">{load.id}</h4>
                      <div className="flex items-center text-sm text-slate-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {load.origin} → {load.destination}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ${load.revenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600">
                        {(load.margin * 100).toFixed(1)}% margin
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge 
                      className={
                        load.status === 'in_transit' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }
                    >
                      {load.status.replace('_', ' ')}
                    </Badge>
                    
                    {load.alerts.length > 0 && (
                      <div className="text-sm text-green-600">
                        💡 {load.alerts[0]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${todaysMetrics.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Profit Margin</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {(todaysMetrics.profitMargin * 100).toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Fuel Efficiency</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {todaysMetrics.fuelEfficiency} MPG
                  </p>
                </div>
                <Route className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">On-Time Performance</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {(todaysMetrics.onTimePerformance * 100).toFixed(0)}%
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Savings Opportunities */}
        <SavingsOpportunityDetector carrierProfile={carrierProfile} />

        {/* Quick Actions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <FileText className="w-6 h-6" />
                <span className="text-sm">Upload Documents</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Route className="w-6 h-6" />
                <span className="text-sm">Plan Route</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <Target className="w-6 h-6" />
                <span className="text-sm">Set Goals</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Business Coach Component */}
        <AIBusinessCoach carrierProfile={carrierProfile} />
      </div>
    </div>
  );
};

export default SmallCarrierDashboard;
