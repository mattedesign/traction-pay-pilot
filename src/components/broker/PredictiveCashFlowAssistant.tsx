
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { LoadInProgress } from "@/types/brokerLoad";

interface PredictiveCashFlowAssistantProps {
  loads: LoadInProgress[];
}

const PredictiveCashFlowAssistant = ({ loads }: PredictiveCashFlowAssistantProps) => {
  const cashFlowPredictions = [
    {
      period: "Next 7 Days",
      inbound: 47500,
      outbound: 42300,
      netFlow: 5200,
      confidence: 95,
      riskLevel: "low"
    },
    {
      period: "Next 14 Days",
      inbound: 89200,
      outbound: 78600,
      netFlow: 10600,
      confidence: 88,
      riskLevel: "low"
    },
    {
      period: "Next 30 Days",
      inbound: 178400,
      outbound: 165200,
      netFlow: 13200,
      confidence: 76,
      riskLevel: "medium"
    }
  ];

  const upcomingEvents = [
    {
      date: "June 24",
      event: "Swift Transportation QuickPay",
      amount: 1813,
      type: "inbound",
      certainty: "confirmed"
    },
    {
      date: "June 25",
      event: "Fuel Payment Due",
      amount: 3200,
      type: "outbound",
      certainty: "scheduled"
    },
    {
      date: "June 26",
      event: "Schneider Payment (if processed today)",
      amount: 931,
      type: "inbound",
      certainty: "conditional"
    },
    {
      date: "June 27",
      event: "Insurance Premium",
      amount: 1500,
      type: "outbound",
      certainty: "scheduled"
    }
  ];

  const optimizationSuggestions = [
    {
      title: "Process QuickPay Today",
      impact: "+$2,744 immediate cash",
      urgency: "high",
      description: "3 QuickPay requests waiting. Process now to improve next week's cash position."
    },
    {
      title: "Negotiate 15-Day Terms",
      impact: "+$8,500 monthly improvement",
      urgency: "medium",
      description: "2 carriers are open to shorter payment terms in exchange for volume commitment."
    },
    {
      title: "Set Up Credit Line",
      impact: "Backup for tight periods",
      urgency: "low",
      description: "Establish $25K credit line for cash flow smoothing during peak periods."
    }
  ];

  const getFlowColor = (amount: number) => {
    return amount > 0 ? "text-green-600" : "text-red-600";
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low": return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      case "medium": return <Badge className="bg-orange-100 text-orange-800">Medium Risk</Badge>;
      case "high": return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span>Predictive Cash Flow Assistant</span>
          <Badge className="bg-green-100 text-green-800">AI Forecasting</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cash Flow Predictions */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">📊 Cash Flow Forecast</h4>
          <div className="space-y-3">
            {cashFlowPredictions.map((prediction, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                <div>
                  <div className="font-medium text-slate-900">{prediction.period}</div>
                  <div className="text-sm text-slate-600">
                    Confidence: {prediction.confidence}% • {getRiskBadge(prediction.riskLevel)}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getFlowColor(prediction.netFlow)}`}>
                    ${prediction.netFlow.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">
                    ${prediction.inbound.toLocaleString()} in • ${prediction.outbound.toLocaleString()} out
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">📅 Upcoming Cash Events</h4>
          <div className="space-y-2">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded border">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'inbound' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-slate-900">{event.event}</div>
                    <div className="text-sm text-slate-600">{event.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${event.type === 'inbound' ? 'text-green-600' : 'text-red-600'}`}>
                    {event.type === 'inbound' ? '+' : '-'}${event.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 capitalize">{event.certainty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">💡 AI Optimization Suggestions</h4>
          <div className="space-y-3">
            {optimizationSuggestions.map((suggestion, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-slate-900">{suggestion.title}</h5>
                  <Badge className={
                    suggestion.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    suggestion.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {suggestion.urgency.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{suggestion.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600">{suggestion.impact}</span>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-900">Next Best Action</h4>
          </div>
          <p className="text-sm text-green-800 mb-3">
            Process 3 pending QuickPay requests today to improve next week's cash position by $2,744 
            and maintain strong carrier relationships.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <DollarSign className="w-4 h-4 mr-2" />
            Process QuickPay Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveCashFlowAssistant;
