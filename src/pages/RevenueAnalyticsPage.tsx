
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowLeft, BarChart3, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RevenueAnalyticsPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const monthlyRevenue = [
    { month: "Jan", revenue: 125000, growth: 8.2 },
    { month: "Feb", revenue: 118000, growth: -5.6 },
    { month: "Mar", revenue: 142000, growth: 20.3 },
    { month: "Apr", revenue: 135000, growth: -4.9 },
    { month: "May", revenue: 127500, growth: -5.6 },
    { month: "Jun", revenue: 152000, growth: 19.2 }
  ];

  const revenueBreakdown = [
    { source: "Direct Loads", amount: 95000, percentage: 62.5 },
    { source: "Load Boards", amount: 35000, percentage: 23.0 },
    { source: "Partner Network", amount: 22000, percentage: 14.5 }
  ];

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                  Revenue Analytics
                </h1>
                <p className="text-slate-600">Detailed revenue performance and trends</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Current Revenue Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-blue-100 text-sm font-medium mb-1">Current Month</div>
                    <div className="text-3xl font-bold">$152.0K</div>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>+19.2% vs last month</span>
                    </div>
                  </div>
                  <DollarSign className="w-12 h-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">YTD Revenue</div>
                <div className="text-2xl font-bold text-slate-900">$799.5K</div>
                <div className="text-green-600 text-sm mt-1">+12.8% vs last year</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Avg Monthly</div>
                <div className="text-2xl font-bold text-slate-900">$133.3K</div>
                <div className="text-slate-500 text-sm mt-1">6-month average</div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Monthly Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium text-slate-900">{month.month}</div>
                      <div className="text-2xl font-bold">${(month.revenue / 1000).toFixed(0)}K</div>
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      month.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${month.growth < 0 ? 'rotate-180' : ''}`} />
                      {month.growth >= 0 ? '+' : ''}{month.growth.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueBreakdown.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">{source.source}</span>
                      <div className="text-right">
                        <div className="font-bold">${(source.amount / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-slate-600">{source.percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalyticsPage;
