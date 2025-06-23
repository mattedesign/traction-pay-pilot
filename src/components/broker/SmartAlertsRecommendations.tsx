
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Brain, TrendingUp, Clock, Zap, DollarSign, Users } from "lucide-react";
import { LoadInProgress } from "@/types/brokerLoad";

interface SmartAlertsRecommendationsProps {
  loads: LoadInProgress[];
}

const SmartAlertsRecommendations = ({ loads }: SmartAlertsRecommendationsProps) => {
  const criticalAlerts = [
    {
      type: "urgent",
      title: "🚨 CASH FLOW CRUNCH INCOMING",
      message: "Predictive analysis shows potential $15K shortfall in 5 days",
      impact: "High business risk",
      action: "Review cash flow plan",
      timeframe: "Action needed within 24 hours",
      icon: AlertTriangle,
      color: "bg-red-50 border-red-300",
      buttonColor: "bg-red-600 hover:bg-red-700"
    },
    {
      type: "opportunity",
      title: "💰 IMMEDIATE REVENUE OPPORTUNITY",
      message: "Swift Transportation ready to commit to 40% more volume with QuickPay guarantee",
      impact: "+$18K monthly revenue potential",
      action: "Schedule partnership call",
      timeframe: "Opportunity expires in 48 hours",
      icon: TrendingUp,
      color: "bg-green-50 border-green-300",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ];

  const smartRecommendations = [
    {
      priority: "high",
      category: "Cash Flow",
      title: "Optimize Payment Timing",
      description: "Process QuickPay for loads delivering this week to improve cash position by $4,200",
      expectedOutcome: "$4,200 immediate cash boost",
      effort: "5 minutes",
      confidence: 95,
      icon: Zap
    },
    {
      priority: "high",
      category: "Relationships",
      title: "Carrier Relationship Recovery",
      description: "Schneider National satisfaction dropping. Proactive outreach needed to prevent volume loss",
      expectedOutcome: "Retain $28K monthly volume",
      effort: "30 minutes",
      confidence: 88,
      icon: Users
    },
    {
      priority: "medium",
      category: "Efficiency",
      title: "Automate Payment Processes",
      description: "Set up auto-QuickPay for top 3 carriers to reduce manual work and improve satisfaction",
      expectedOutcome: "Save 8 hours/week",
      effort: "2 hours setup",
      confidence: 92,
      icon: Brain
    },
    {
      priority: "medium",
      category: "Growth",
      title: "Expand QuickPay Program",
      description: "4 additional carriers interested in QuickPay after seeing competitor offerings",
      expectedOutcome: "+$12K monthly volume",
      effort: "1 hour calls",
      confidence: 76,
      icon: DollarSign
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cash Flow": return "💰";
      case "Relationships": return "🤝";
      case "Efficiency": return "⚡";
      case "Growth": return "📈";
      default: return "📋";
    }
  };

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {criticalAlerts.map((alert, index) => {
          const IconComponent = alert.icon;
          return (
            <Card key={index} className={`border-2 ${alert.color}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2">{alert.title}</h3>
                    <p className="text-sm text-slate-700 mb-2">{alert.message}</p>
                    <p className="text-sm font-medium text-green-700 mb-2">💡 {alert.impact}</p>
                    <p className="text-xs text-slate-600 mb-3">⏰ {alert.timeframe}</p>
                    <Button className={`w-full text-white ${alert.buttonColor}`}>
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Smart Recommendations */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>🧠 AI-Powered Smart Recommendations</span>
            <Badge className="bg-purple-100 text-purple-800">
              {smartRecommendations.filter(r => r.priority === 'high').length} High Priority
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {smartRecommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{rec.title}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600">{getCategoryIcon(rec.category)} {rec.category}</span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-600">{rec.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-700 mb-3">{rec.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-slate-600">Expected Outcome:</span>
                    <div className="font-semibold text-green-600">{rec.expectedOutcome}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Time Investment:</span>
                    <div className="font-semibold text-blue-600">{rec.effort}</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Implement Now
                  </Button>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule Later
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Performance Tracking */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">📊 Optimization Impact Tracking</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$23,400</div>
              <div className="text-sm text-green-700">Monthly savings achieved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">47%</div>
              <div className="text-sm text-blue-700">Cash flow improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-purple-700">Recommendation success rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">12hrs</div>
              <div className="text-sm text-orange-700">Weekly time saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartAlertsRecommendations;
