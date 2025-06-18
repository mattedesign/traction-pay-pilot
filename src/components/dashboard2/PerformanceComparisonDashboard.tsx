
import { BarChart3, Users, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const PerformanceComparisonDashboard = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <span>Performance Comparison Dashboard</span>
          <Badge className="bg-purple-100 text-purple-800">vs Industry Peers</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Payment Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Payment Score</h4>
              <Badge className="bg-red-100 text-red-800">Below Average</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Your Score</span>
                <span className="font-bold text-red-600">72/100</span>
              </div>
              <Progress value={72} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Industry Average</span>
                <span className="font-bold text-slate-900">85/100</span>
              </div>
            </div>
          </div>

          {/* Load Volume Impact */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Load Volume Impact</h4>
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-red-600">-23%</div>
              <p className="text-xs text-slate-600">vs peers with similar equipment</p>
              <div className="bg-red-50 p-2 rounded text-xs text-red-800">
                Missing 15 loads per month
              </div>
            </div>
          </div>

          {/* Rate Premium Opportunity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Rate Premium</h4>
              <TrendingDown className="w-4 h-4 text-orange-600" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-600">-12%</div>
              <p className="text-xs text-slate-600">Missing out on better rates</p>
              <div className="bg-orange-50 p-2 rounded text-xs text-orange-800">
                Could save $1,800/year
              </div>
            </div>
          </div>

          {/* Growth Potential */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Growth Potential</h4>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">+34%</div>
              <p className="text-xs text-slate-600">Monthly revenue increase</p>
              <div className="bg-green-50 p-2 rounded text-xs text-green-800">
                With improved payments
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Peer Comparison Insights</h4>
              <p className="text-sm text-slate-600">
                Carriers in your category with on-time payment records are accessing 34% more 
                loads and earning 12% better rates. Your payment improvements could unlock 
                similar opportunities.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceComparisonDashboard;
