
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Clock, Users, Target, BarChart3 } from "lucide-react";
import { LoadInProgress } from "@/types/brokerLoad";

interface ROIMetricsDashboardProps {
  loads: LoadInProgress[];
}

const ROIMetricsDashboard = ({ loads }: ROIMetricsDashboardProps) => {
  const quickPayEligibleLoads = loads.filter(load => load.quickPayEligible);
  const totalQuickPayValue = quickPayEligibleLoads.reduce((sum, load) => {
    return sum + parseFloat(load.quickPayRate?.replace('$', '').replace(',', '') || '0');
  }, 0);

  const roiMetrics = [
    {
      title: "QuickPay ROI",
      value: "847%",
      change: "+23%",
      description: "Return on QuickPay investment vs. traditional factoring",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "up"
    },
    {
      title: "Cash Conversion Improvement",
      value: "67%",
      change: "+12%",
      description: "Faster cash conversion vs. standard payment terms",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "up"
    },
    {
      title: "Carrier Satisfaction Impact",
      value: "94%",
      change: "+8%",
      description: "Satisfaction score for QuickPay-enabled carriers",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "up"
    },
    {
      title: "Volume Retention Rate",
      value: "98.2%",
      change: "+5.7%",
      description: "Retention rate for carriers using QuickPay",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "up"
    }
  ];

  const financialImpact = [
    {
      metric: "Monthly Cash Flow Improvement",
      current: "$23,400",
      potential: "$31,200",
      improvement: "$7,800",
      category: "Cash Flow"
    },
    {
      metric: "Average Payment Cycle",
      current: "3.2 days",
      potential: "1.8 days",
      improvement: "-1.4 days",
      category: "Efficiency"
    },
    {
      metric: "Carrier Volume Growth",
      current: "12%",
      potential: "18%",
      improvement: "+6%",
      category: "Growth"
    },
    {
      metric: "Operational Cost Savings",
      current: "$4,200",
      potential: "$6,800",
      improvement: "$2,600",
      category: "Cost"
    }
  ];

  const benchmarkData = [
    { category: "Payment Speed", industry: "15 days", your: "3.2 days", improvement: "78% faster" },
    { category: "Carrier Satisfaction", industry: "72%", your: "94%", improvement: "+22 points" },
    { category: "Volume Retention", industry: "85%", your: "98.2%", improvement: "+13.2 points" },
    { category: "Cash Flow Predictability", industry: "Low", your: "High", improvement: "Significant" }
  ];

  return (
    <div className="space-y-6">
      {/* ROI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roiMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {metric.change}
                  </Badge>
                </div>
                <div className="mb-2">
                  <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-sm font-medium text-slate-900">{metric.title}</div>
                </div>
                <p className="text-xs text-slate-600">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Financial Impact Analysis */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            <span>💰 Financial Impact Analysis</span>
            <Badge className="bg-green-100 text-green-800">Real-Time ROI</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {financialImpact.map((impact, index) => (
            <div key={index} className="flex justify-between items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{impact.metric}</div>
                <div className="text-sm text-slate-600">{impact.category}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-slate-600">Current</div>
                  <div className="font-bold text-slate-900">{impact.current}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Potential</div>
                  <div className="font-bold text-blue-600">{impact.potential}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Improvement</div>
                  <div className="font-bold text-green-600">{impact.improvement}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Industry Benchmark */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>📊 Industry Benchmark Comparison</span>
            <Badge className="bg-blue-100 text-blue-800">Competitive Edge</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {benchmarkData.map((benchmark, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-1">
                <div className="font-semibold text-blue-900">{benchmark.category}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-sm text-slate-600">Industry Average</div>
                  <div className="font-bold text-slate-900">{benchmark.industry}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Your Performance</div>
                  <div className="font-bold text-blue-600">{benchmark.your}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Your Advantage</div>
                  <div className="font-bold text-green-600">{benchmark.improvement}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary Impact */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">🎯 Total Optimization Impact</h3>
            <p className="text-slate-600 mb-4">
              Your QuickPay optimization strategy is delivering measurable results across all key metrics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$23.4K</div>
                <div className="text-sm text-green-700">Monthly savings achieved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">847%</div>
                <div className="text-sm text-blue-700">QuickPay ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-purple-700">Carrier satisfaction</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIMetricsDashboard;
