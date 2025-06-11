
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Package, DollarSign, ArrowLeft, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BrokerLoadValueAnalyticsPage = () => {
  const navigate = useNavigate();

  const loadValueByType = [
    { type: "Dry Van", avgValue: 2150, count: 65, totalValue: 139750 },
    { type: "Flatbed", avgValue: 2850, count: 28, totalValue: 79800 },
    { type: "Refrigerated", avgValue: 3200, count: 22, totalValue: 70400 },
    { type: "Box Truck", avgValue: 1480, count: 18, totalValue: 26640 },
    { type: "Step Deck", avgValue: 3650, count: 12, totalValue: 43800 }
  ];

  const valueByDistance = [
    { range: "0-250 miles", avgValue: 1680, loads: 45, rate: "$6.72/mile" },
    { range: "251-500 miles", avgValue: 2150, loads: 38, rate: "$5.38/mile" },
    { range: "501-750 miles", avgValue: 2850, loads: 32, rate: "$4.57/mile" },
    { range: "751-1000 miles", avgValue: 3420, loads: 25, rate: "$4.10/mile" },
    { range: "1000+ miles", avgValue: 4280, loads: 15, rate: "$3.85/mile" }
  ];

  const topPerformingRoutes = [
    { route: "Dallas, TX → Atlanta, GA", avgValue: 3850, loads: 18, growth: "+12%" },
    { route: "Chicago, IL → Detroit, MI", avgValue: 3200, loads: 15, growth: "+8%" },
    { route: "Los Angeles, CA → Phoenix, AZ", avgValue: 2980, loads: 22, growth: "+15%" },
    { route: "Houston, TX → New Orleans, LA", avgValue: 2750, loads: 12, growth: "+5%" },
    { route: "Miami, FL → Orlando, FL", avgValue: 2450, loads: 25, growth: "+3%" }
  ];

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/broker")}
                className="hover:bg-slate-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Load Value Analytics</h1>
                <p className="text-slate-600 mt-1">Average load value analysis and optimization strategies</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Average Load Value</p>
                    <p className="text-2xl font-bold text-slate-900">$2,485</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8.2% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Highest Value Type</p>
                    <p className="text-2xl font-bold text-slate-900">$3,650</p>
                    <p className="text-sm text-blue-600">Step Deck loads</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Load Value</p>
                    <p className="text-2xl font-bold text-slate-900">$360,190</p>
                    <p className="text-sm text-purple-600">155 loads total</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Value Growth Rate</p>
                    <p className="text-2xl font-bold text-slate-900">+11.5%</p>
                    <p className="text-sm text-green-600">Year over year</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Load Value by Equipment Type */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Value by Equipment Type</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadValueByType.map((type, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{type.type}</div>
                      <div className="text-sm text-slate-600">
                        {type.count} loads | Total: ${type.totalValue.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${type.avgValue.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">avg value</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Value by Distance */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Value by Distance Range</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {valueByDistance.map((distance, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{distance.range}</div>
                      <div className="text-sm text-slate-600">
                        {distance.loads} loads | {distance.rate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">${distance.avgValue.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">avg value</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Routes */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Top Performing Routes by Value</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {topPerformingRoutes.map((route, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{route.route}</div>
                      <div className="text-sm text-slate-600">{route.loads} loads completed</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${route.avgValue.toLocaleString()}</div>
                      <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                        {route.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Value Optimization Insights */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Load Value Optimization Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900">High-Value Opportunities</h4>
                  <p className="text-sm text-green-800 mt-2">
                    Step Deck and Refrigerated loads show highest values. Consider targeting more specialized equipment carriers to increase portfolio value.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Distance Optimization</h4>
                  <p className="text-sm text-blue-800 mt-2">
                    Long-haul loads (1000+ miles) offer highest absolute value but lower per-mile rates. Balance portfolio for optimal revenue.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Route Performance</h4>
                  <p className="text-sm text-purple-800 mt-2">
                    Dallas → Atlanta route shows both high value and strong growth. Consider increasing capacity allocation to similar premium lanes.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-900">Value Growth Strategy</h4>
                  <p className="text-sm text-amber-800 mt-2">
                    Focus on specialized equipment types and premium routes to maintain +10% year-over-year value growth trajectory.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerLoadValueAnalyticsPage;
