
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CreditCard, TrendingUp, DollarSign, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BrokerQuickPayAnalyticsPage = () => {
  const navigate = useNavigate();

  const quickPayMetrics = [
    { carrier: "Swift Transportation", adoption: 95, volume: 45, avgTime: "2.3 hours" },
    { carrier: "J.B. Hunt", adoption: 88, volume: 32, avgTime: "3.1 hours" },
    { carrier: "Schneider National", adoption: 76, volume: 28, avgTime: "4.2 hours" },
    { carrier: "Regional Express", adoption: 65, volume: 15, avgTime: "5.8 hours" },
    { carrier: "Local Carrier Co", adoption: 45, volume: 8, avgTime: "8.5 hours" }
  ];

  const monthlyTrends = [
    { month: "Jan", adoption: 68, savings: 2100 },
    { month: "Feb", adoption: 71, savings: 2350 },
    { month: "Mar", adoption: 74, savings: 2580 },
    { month: "Apr", adoption: 76, savings: 2720 },
    { month: "May", adoption: 78, savings: 2890 },
    { month: "Jun", adoption: 82, savings: 3120 }
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
                <h1 className="text-3xl font-bold text-slate-900">QuickPay Analytics</h1>
                <p className="text-slate-600 mt-1">QuickPay adoption rates, savings, and optimization insights</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Overall Adoption Rate</p>
                    <p className="text-2xl font-bold text-slate-900">82%</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +4% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Monthly Savings</p>
                    <p className="text-2xl font-bold text-slate-900">$3,120</p>
                    <p className="text-sm text-blue-600">Cash flow improvement</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Payment Time</p>
                    <p className="text-2xl font-bold text-slate-900">3.8hrs</p>
                    <p className="text-sm text-green-600">vs 15 days standard</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Volume</p>
                    <p className="text-2xl font-bold text-slate-900">128</p>
                    <p className="text-sm text-orange-600">loads this month</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Adoption by Carrier */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>QuickPay Adoption by Carrier</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickPayMetrics.map((carrier, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{carrier.carrier}</div>
                      <div className="text-sm text-slate-600">
                        {carrier.volume} loads | Avg: {carrier.avgTime}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        carrier.adoption > 90 ? 'bg-green-100 text-green-800' :
                        carrier.adoption > 75 ? 'bg-blue-100 text-blue-800' :
                        carrier.adoption > 60 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {carrier.adoption}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Adoption Trends & Savings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{month.month} 2024</div>
                      <div className="text-sm text-slate-600">Adoption: {month.adoption}%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${month.savings.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">monthly savings</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* QuickPay Benefits & Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cash Flow Impact */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Cash Flow Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-900">Working Capital Improvement</h4>
                    <Badge className="bg-green-100 text-green-800">+47%</Badge>
                  </div>
                  <p className="text-sm text-green-800">
                    QuickPay has improved working capital by $47,000 through faster payment cycles and reduced collection time.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900">DSO Reduction</h4>
                    <Badge className="bg-blue-100 text-blue-800">-12 days</Badge>
                  </div>
                  <p className="text-sm text-blue-800">
                    Average Days Sales Outstanding reduced from 18 days to 6 days for QuickPay-enabled loads.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Recommendations */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Optimization Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-900">Low Adoption Carriers</h4>
                  <p className="text-sm text-amber-800 mt-2">
                    Target carriers with <60% adoption. Incentive programs could increase overall adoption to 90%+.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Payment Time Optimization</h4>
                  <p className="text-sm text-purple-800 mt-2">
                    Carriers with >6 hour payment times may need process improvements or additional training.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900">Volume Growth Potential</h4>
                  <p className="text-sm text-green-800 mt-2">
                    Reaching 95% adoption could generate additional $1,200 monthly savings and improve carrier satisfaction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerQuickPayAnalyticsPage;
