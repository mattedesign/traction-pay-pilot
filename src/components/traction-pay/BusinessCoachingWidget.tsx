
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Target, Lightbulb, DollarSign, Clock } from "lucide-react";

const BusinessCoachingWidget = () => {
  const insights = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Fuel Card Optimization',
      description: 'Switch 15% more fuel purchases to partner stations for additional $125/month savings',
      impact: 'financial',
      value: 125,
      priority: 'high'
    },
    {
      id: 2,
      type: 'efficiency',
      title: 'Document Processing Speed',
      description: 'Upload PODs within 2 hours of delivery to reduce funding delays by 0.5 days',
      impact: 'time',
      value: 0.5,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'growth',
      title: 'Volume Milestone',
      description: 'You\'re $5,250 away from next factoring rate tier (1.8%)',
      impact: 'rate',
      value: 1.8,
      priority: 'high'
    }
  ];

  const performanceMetrics = {
    documentAccuracy: 94,
    avgFundingTime: 1.2,
    fuelEfficiency: 87,
    profitMargin: 12.5
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Target className="w-4 h-4" />;
      case 'efficiency':
        return <Clock className="w-4 h-4" />;
      case 'growth':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getInsightColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricColor = (value: number, metric: string) => {
    const thresholds = {
      documentAccuracy: { good: 95, ok: 90 },
      avgFundingTime: { good: 1.0, ok: 1.5 },
      fuelEfficiency: { good: 90, ok: 80 },
      profitMargin: { good: 15, ok: 10 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-600';

    if (metric === 'avgFundingTime') {
      // Lower is better for funding time
      if (value <= threshold.good) return 'text-green-600';
      if (value <= threshold.ok) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      // Higher is better for other metrics
      if (value >= threshold.good) return 'text-green-600';
      if (value >= threshold.ok) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span>Business Intelligence Coach</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Performance Dashboard</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className={`text-2xl font-bold ${getMetricColor(performanceMetrics.documentAccuracy, 'documentAccuracy')}`}>
                {performanceMetrics.documentAccuracy}%
              </p>
              <p className="text-xs text-slate-600">Doc Accuracy</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className={`text-2xl font-bold ${getMetricColor(performanceMetrics.avgFundingTime, 'avgFundingTime')}`}>
                {performanceMetrics.avgFundingTime}d
              </p>
              <p className="text-xs text-slate-600">Avg Funding</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className={`text-2xl font-bold ${getMetricColor(performanceMetrics.fuelEfficiency, 'fuelEfficiency')}`}>
                {performanceMetrics.fuelEfficiency}%
              </p>
              <p className="text-xs text-slate-600">Fuel Efficiency</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className={`text-2xl font-bold ${getMetricColor(performanceMetrics.profitMargin, 'profitMargin')}`}>
                {performanceMetrics.profitMargin}%
              </p>
              <p className="text-xs text-slate-600">Profit Margin</p>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">AI-Powered Insights</h4>
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getInsightIcon(insight.type)}
                    <h5 className="font-medium text-slate-800">{insight.title}</h5>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getInsightColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                    {insight.impact === 'financial' && (
                      <Badge className="bg-green-100 text-green-800">
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${insight.value}/mo
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Recommended Actions</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 text-left">
              <div className="w-full">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Optimize Routes</span>
                </div>
                <p className="text-sm text-slate-600">
                  Find fuel-efficient routes for upcoming loads
                </p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 text-left">
              <div className="w-full">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Rate Analysis</span>
                </div>
                <p className="text-sm text-slate-600">
                  Compare your rates with market averages
                </p>
              </div>
            </Button>
          </div>
        </div>

        {/* Fuel Card Integration */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-blue-800">Fuel Card Savings</h4>
            <Badge className="bg-blue-600 text-white">Active</Badge>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            You've saved $1,425 this month with your fuel card program. 
            Average savings: $0.50/gallon across 2,850 gallons.
          </p>
          <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
            View Fuel Stations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCoachingWidget;
