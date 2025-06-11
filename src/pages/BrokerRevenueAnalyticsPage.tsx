
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Calendar, BarChart3, PieChart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BrokerRevenueAnalyticsPage = () => {
  const navigate = useNavigate();

  const monthlyRevenue = [
    { month: "Jan", revenue: 245000, growth: 8.5 },
    { month: "Feb", revenue: 268000, growth: 9.4 },
    { month: "Mar", revenue: 289000, growth: 7.8 },
    { month: "Apr", revenue: 312000, growth: 8.0 },
    { month: "May", revenue: 335000, growth: 7.4 },
    { month: "Jun", revenue: 358000, growth: 6.9 }
  ];

  const revenueByRoute = [
    { route: "Dallas, TX → Atlanta, GA", revenue: 45000, loads: 18 },
    { route: "Los Angeles, CA → Phoenix, AZ", revenue: 38000, loads: 22 },
    { route: "Chicago, IL → Detroit, MI", revenue: 32000, loads: 15 },
    { route: "Miami, FL → Orlando, FL", revenue: 28000, loads: 25 },
    { route: "Houston, TX → New Orleans, LA", revenue: 22000, loads: 12 }
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
                <h1 className="text-3xl font-bold text-slate-900">Revenue Analytics</h1>
                <p className="text-slate-600 mt-1">Comprehensive revenue analysis and insights</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Revenue (YTD)</p>
                    <p className="text-2xl font-bold text-slate-900">$1,807,000</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12.3% vs last year
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Monthly Growth</p>
                    <p className="text-2xl font-bold text-slate-900">8.0%</p>
                    <p className="text-sm text-blue-600">Average monthly increase</p>
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
                    <p className="text-sm font-medium text-slate-600">Revenue per Load</p>
                    <p className="text-2xl font-bold text-slate-900">$1,985</p>
                    <p className="text-sm text-purple-600">+5.2% this month</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Peak Month</p>
                    <p className="text-2xl font-bold text-slate-900">June</p>
                    <p className="text-sm text-orange-600">$358,000 revenue</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Trend */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Monthly Revenue Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {monthlyRevenue.map((month, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-900">{month.month} 2024</div>
                      <div className="text-sm text-slate-600">${month.revenue.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        +{month.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Revenue by Route */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Revenue by Top Routes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueByRoute.map((route, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{route.route}</div>
                      <div className="text-sm text-slate-600">{route.loads} loads completed</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${route.revenue.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">${Math.round(route.revenue / route.loads).toLocaleString()}/load</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Revenue Insights */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Revenue Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900">Revenue Growth Opportunity</h4>
                  <p className="text-sm text-green-800 mt-2">
                    Dallas → Atlanta route shows highest revenue potential. Consider increasing load volume by 15% to capture additional $6,750 monthly revenue.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Seasonal Trends</h4>
                  <p className="text-sm text-blue-800 mt-2">
                    Revenue typically peaks in Q2 and Q4. Plan capacity increases 30 days ahead of peak seasons to maximize revenue capture.
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

export default BrokerRevenueAnalyticsPage;
