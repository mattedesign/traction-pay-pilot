
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";

const RevenueBreakdownPage = () => {
  const navigate = useNavigate();

  const revenueData = [
    { month: "January", revenue: 105000, loads: 20, avgPerLoad: 5250 },
    { month: "February", revenue: 118000, loads: 22, avgPerLoad: 5364 },
    { month: "March", revenue: 127500, loads: 24, avgPerLoad: 5313 },
  ];

  const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col h-screen pt-14 md:pt-0">
        <div className="border-b border-slate-200 bg-white px-6 py-4 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Revenue Breakdown</h1>
              <p className="text-slate-600 mt-1">Detailed analysis of your revenue performance</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Revenue (3 months)</p>
                    <p className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Average Monthly</p>
                    <p className="text-3xl font-bold text-slate-900">${(totalRevenue / 3).toLocaleString()}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Growth Rate</p>
                    <p className="text-3xl font-bold text-slate-900">+12.5%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">{month.month}</div>
                      <div className="text-sm text-slate-600">{month.loads} loads completed</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${month.revenue.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">${month.avgPerLoad.toLocaleString()} avg/load</div>
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

export default RevenueBreakdownPage;
