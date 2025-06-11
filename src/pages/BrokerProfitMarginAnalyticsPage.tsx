
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, AlertTriangle, DollarSign, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BrokerProfitMarginAnalyticsPage = () => {
  const navigate = useNavigate();

  const marginByRoute = [
    { route: "Chicago, IL → Detroit, MI", margin: 22.8, revenue: 32000, cost: 24704 },
    { route: "Dallas, TX → Atlanta, GA", margin: 18.9, revenue: 45000, cost: 36495 },
    { route: "Los Angeles, CA → Phoenix, AZ", margin: 17.2, revenue: 38000, cost: 31464 },
    { route: "Houston, TX → New Orleans, LA", margin: 16.5, revenue: 22000, cost: 18370 },
    { route: "Miami, FL → Orlando, FL", margin: 15.1, revenue: 28000, cost: 23772 }
  ];

  const costBreakdown = [
    { category: "Carrier Payments", percentage: 75, amount: 1356000 },
    { category: "Fuel Surcharges", percentage: 8, amount: 144560 },
    { category: "Administrative", percentage: 6, amount: 108420 },
    { category: "Insurance", percentage: 4, amount: 72280 },
    { category: "Technology", percentage: 3, amount: 54210 },
    { category: "Other", percentage: 4, amount: 72280 }
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
                <h1 className="text-3xl font-bold text-slate-900">Profit Margin Analytics</h1>
                <p className="text-slate-600 mt-1">Detailed profit margin analysis and optimization insights</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Overall Profit Margin</p>
                    <p className="text-2xl font-bold text-slate-900">18.5%</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +2.1% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Best Route Margin</p>
                    <p className="text-2xl font-bold text-slate-900">22.8%</p>
                    <p className="text-sm text-blue-600">Chicago → Detroit</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Profit (YTD)</p>
                    <p className="text-2xl font-bold text-slate-900">$334,295</p>
                    <p className="text-sm text-purple-600">18.5% of revenue</p>
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
                    <p className="text-sm font-medium text-slate-600">Industry Benchmark</p>
                    <p className="text-2xl font-bold text-slate-900">15.2%</p>
                    <p className="text-sm text-green-600">+3.3% above average</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Margin by Route */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Profit Margin by Route</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marginByRoute.map((route, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{route.route}</div>
                      <div className="text-sm text-slate-600">
                        Revenue: ${route.revenue.toLocaleString()} | Cost: ${route.cost.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        route.margin > 20 ? 'bg-green-100 text-green-800' :
                        route.margin > 17 ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {route.margin}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Cost Structure Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {costBreakdown.map((cost, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{cost.category}</div>
                      <div className="text-sm text-slate-600">${cost.amount.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{cost.percentage}%</div>
                      <div className="text-xs text-slate-500">of total costs</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Optimization Recommendations */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Margin Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Route Optimization</h4>
                      <p className="text-sm text-green-800 mt-2">
                        Focus on Chicago → Detroit route type lanes. Similar short-haul, high-frequency routes show 20%+ margins consistently.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Cost Reduction</h4>
                      <p className="text-sm text-blue-800 mt-2">
                        Negotiate better fuel surcharge agreements. A 1% reduction in fuel costs could improve overall margin by 0.8%.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Risk Alert</h4>
                      <p className="text-sm text-amber-800 mt-2">
                        Miami → Orlando route showing declining margins. Consider renegotiating rates or reducing volume on this lane.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-900">Revenue Enhancement</h4>
                      <p className="text-sm text-purple-800 mt-2">
                        Implement dynamic pricing on high-demand routes. Could increase margins by 2-3% during peak periods.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerProfitMarginAnalyticsPage;
