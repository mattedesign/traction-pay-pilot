
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Fuel, TrendingUp, BarChart3, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";

const FuelEfficiencyAnalysisPage = () => {
  const navigate = useNavigate();

  const fuelData = [
    { period: "This Month", mpg: 7.2, miles: 8500, gallons: 1181, cost: 4245 },
    { period: "Last Month", mpg: 6.8, miles: 8200, gallons: 1206, cost: 4341 },
    { period: "2 Months Ago", mpg: 6.9, miles: 7800, gallons: 1130, cost: 4068 },
  ];

  const efficiencyTips = [
    { tip: "Maintain optimal speed (55-65 mph)", impact: "10-15% improvement" },
    { tip: "Regular maintenance schedules", impact: "5-8% improvement" },
    { tip: "Route optimization", impact: "8-12% improvement" },
    { tip: "Driver training programs", impact: "6-10% improvement" },
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
              <h1 className="text-2xl font-bold text-slate-900">Fuel Efficiency Analysis</h1>
              <p className="text-slate-600 mt-1">Track and optimize your fuel consumption</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Current MPG</p>
                    <p className="text-3xl font-bold text-slate-900">7.2</p>
                  </div>
                  <Fuel className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Improvement</p>
                    <p className="text-3xl font-bold text-slate-900">+5.8%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Monthly Savings</p>
                    <p className="text-3xl font-bold text-slate-900">$96</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Industry Avg</p>
                    <p className="text-3xl font-bold text-slate-900">6.5</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Fuel Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fuelData.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">{month.period}</div>
                      <div className="text-sm text-slate-600">{month.miles.toLocaleString()} miles driven</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-right">
                      <div>
                        <div className="font-bold text-orange-600">{month.mpg} MPG</div>
                        <div className="text-xs text-slate-600">Efficiency</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">{month.gallons.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">Gallons</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-600">${month.cost.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">Fuel Cost</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Efficiency Improvement Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {efficiencyTips.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Fuel className="w-5 h-5 text-orange-600" />
                      <div className="font-medium text-slate-900">{tip.tip}</div>
                    </div>
                    <div className="text-sm font-medium text-green-600">{tip.impact}</div>
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

export default FuelEfficiencyAnalysisPage;
