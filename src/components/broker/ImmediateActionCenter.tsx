
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CreditCard, Clock, AlertTriangle, CheckCircle, DollarSign } from "lucide-react";
import { LoadInProgress } from "@/types/brokerLoad";

interface ImmediateActionCenterProps {
  loads: LoadInProgress[];
}

const ImmediateActionCenter = ({ loads }: ImmediateActionCenterProps) => {
  const quickPayEligibleLoads = loads.filter(load => load.quickPayEligible);
  const totalQuickPayValue = quickPayEligibleLoads.reduce((sum, load) => {
    return sum + parseFloat(load.quickPayRate?.replace('$', '').replace(',', '') || '0');
  }, 0);

  const urgentActions = [
    {
      title: "Process 3 QuickPay Requests",
      description: `${quickPayEligibleLoads.length} carriers waiting • $${totalQuickPayValue.toLocaleString()} total value`,
      impact: "Immediate $" + totalQuickPayValue.toLocaleString() + " cash flow boost",
      urgency: "high",
      action: "Process Now",
      icon: Zap,
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
      buttonColor: "bg-red-600 hover:bg-red-700"
    },
    {
      title: "Swift Transportation Relationship Risk",
      description: "Payment delays causing strain • 45% of volume at risk",
      impact: "Retain $18K monthly revenue",
      urgency: "high",
      action: "Contact Now",
      icon: AlertTriangle,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      buttonColor: "bg-orange-600 hover:bg-orange-700"
    },
    {
      title: "Enable Auto-QuickPay for Top Carriers",
      description: "Automate payments for your top 5 carriers",
      impact: "Save 8 hours/week + improve satisfaction",
      urgency: "medium",
      action: "Set Up",
      icon: CheckCircle,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Optimize Payment Terms",
      description: "3 carriers ready for better terms negotiation",
      impact: "Reduce costs by $2,400/month",
      urgency: "medium",
      action: "Review Terms",
      icon: DollarSign,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">🔥 Urgent</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">⚡ Priority</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">📋 Standard</Badge>;
    }
  };

  return (
    <Card className="bg-white border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-blue-600" />
          <span>🎯 IMMEDIATE ACTION CENTER</span>
          <Badge className="bg-blue-100 text-blue-800 ml-2">
            {urgentActions.filter(a => a.urgency === 'high').length} Urgent
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {urgentActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div key={index} className={`p-4 rounded-lg border-2 ${action.color} hover:shadow-md transition-all`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 ${action.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{action.title}</h4>
                      {getUrgencyBadge(action.urgency)}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-700 mb-2">{action.description}</p>
                <p className="text-sm font-medium text-green-700 mb-3">💰 {action.impact}</p>
                
                <Button className={`w-full text-white ${action.buttonColor}`}>
                  {action.action}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
          <h4 className="font-semibold text-slate-900 mb-3">Today's Impact Potential</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">${(totalQuickPayValue + 2400).toLocaleString()}</div>
              <div className="text-xs text-slate-600">Cash Flow Boost</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">8hrs</div>
              <div className="text-xs text-slate-600">Time Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-xs text-slate-600">Satisfaction Target</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImmediateActionCenter;
