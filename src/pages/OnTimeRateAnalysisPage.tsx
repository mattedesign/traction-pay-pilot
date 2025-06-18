
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Clock, CheckCircle, AlertTriangle, BarChart3, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";

const OnTimeRateAnalysisPage = () => {
  const navigate = useNavigate();

  const deliveryData = [
    { period: "This Week", onTime: 23, late: 1, total: 24, rate: 95.8 },
    { period: "Last Week", onTime: 21, late: 1, total: 22, rate: 95.5 },
    { period: "2 Weeks Ago", onTime: 19, late: 2, total: 21, rate: 90.5 },
    { period: "3 Weeks Ago", onTime: 20, late: 0, total: 20, rate: 100.0 },
  ];

  const factors = [
    { factor: "Weather Delays", impact: "Low", occurrences: 2 },
    { factor: "Traffic Congestion", impact: "Medium", occurrences: 3 },
    { factor: "Customer Delays", impact: "High", occurrences: 1 },
    { factor: "Mechanical Issues", impact: "Low", occurrences: 1 },
  ];

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
              <h1 className="text-2xl font-bold text-slate-900">On-Time Rate Analysis</h1>
              <p className="text-slate-600 mt-1">Detailed breakdown of delivery performance</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Current On-Time Rate</p>
                    <p className="text-3xl font-bold text-slate-900">96.8%</p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Industry Average</p>
                    <p className="text-3xl font-bold text-slate-900">92.4%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Improvement</p>
                    <p className="text-3xl font-bold text-slate-900">+4.4%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryData.map((week, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium text-slate-900">{week.period}</div>
                        <div className="text-sm text-slate-600">{week.total} total deliveries</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{week.onTime} on-time</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span>{week.late} late</span>
                        </div>
                      </div>
                      <Badge className={week.rate >= 95 ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                        {week.rate}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delay Factors Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-medium text-slate-900">{factor.factor}</div>
                        <div className="text-sm text-slate-600">{factor.occurrences} occurrences this month</div>
                      </div>
                    </div>
                    <Badge className={
                      factor.impact === 'High' ? "bg-red-100 text-red-800" :
                      factor.impact === 'Medium' ? "bg-orange-100 text-orange-800" :
                      "bg-green-100 text-green-800"
                    }>
                      {factor.impact} Impact
                    </Badge>
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

export default OnTimeRateAnalysisPage;
