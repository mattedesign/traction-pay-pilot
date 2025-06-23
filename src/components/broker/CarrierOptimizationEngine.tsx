
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Clock, Star, Phone, Mail } from "lucide-react";
import { LoadInProgress } from "@/types/brokerLoad";

interface CarrierOptimizationEngineProps {
  loads: LoadInProgress[];
}

const CarrierOptimizationEngine = ({ loads }: CarrierOptimizationEngineProps) => {
  const carrierInsights = [
    {
      name: "Swift Transportation",
      relationship: "excellent",
      quickPayAdoption: 95,
      avgPaymentTime: "2.3 hours",
      monthlyVolume: "$45,000",
      satisfaction: 98,
      recommendation: "Increase volume allocation",
      action: "Offer Premium Partnership",
      riskLevel: "low",
      lastPayment: "On time"
    },
    {
      name: "J.B. Hunt",
      relationship: "good",
      quickPayAdoption: 65,
      avgPaymentTime: "8.5 hours",
      monthlyVolume: "$32,000",
      satisfaction: 85,
      recommendation: "Improve QuickPay adoption",
      action: "Schedule Training Call",
      riskLevel: "medium",
      lastPayment: "2 days delayed"
    },
    {
      name: "Schneider National",
      relationship: "at-risk",
      quickPayAdoption: 45,
      avgPaymentTime: "15.2 hours",
      monthlyVolume: "$28,000",
      satisfaction: 72,
      recommendation: "Urgent relationship repair needed",
      action: "Executive Call Required",
      riskLevel: "high",
      lastPayment: "5 days delayed"
    }
  ];

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "excellent": return "bg-green-100 text-green-800";
      case "good": return "bg-blue-100 text-blue-800";
      case "at-risk": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low": return <Badge className="bg-green-100 text-green-800">✅ Low Risk</Badge>;
      case "medium": return <Badge className="bg-orange-100 text-orange-800">⚠️ Medium Risk</Badge>;
      case "high": return <Badge className="bg-red-100 text-red-800">🚨 High Risk</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-600" />
          <span>Carrier Optimization Engine</span>
          <Badge className="bg-purple-100 text-purple-800">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {carrierInsights.map((carrier, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-slate-900">{carrier.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getRelationshipColor(carrier.relationship)}>
                    {carrier.relationship.toUpperCase()}
                  </Badge>
                  {getRiskBadge(carrier.riskLevel)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900">{carrier.monthlyVolume}</div>
                <div className="text-sm text-slate-600">Monthly Volume</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
              <div>
                <div className="text-slate-600">QuickPay Adoption</div>
                <div className="font-semibold text-slate-900">{carrier.quickPayAdoption}%</div>
              </div>
              <div>
                <div className="text-slate-600">Avg Payment Time</div>
                <div className="font-semibold text-slate-900">{carrier.avgPaymentTime}</div>
              </div>
              <div>
                <div className="text-slate-600">Satisfaction</div>
                <div className="font-semibold text-slate-900">{carrier.satisfaction}%</div>
              </div>
              <div>
                <div className="text-slate-600">Last Payment</div>
                <div className={`font-semibold ${carrier.lastPayment.includes('delayed') ? 'text-red-600' : 'text-green-600'}`}>
                  {carrier.lastPayment}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">AI Recommendation</span>
              </div>
              <p className="text-sm text-blue-800">{carrier.recommendation}</p>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                {carrier.action}
              </Button>
              <Button size="sm" variant="outline" className="border-slate-300">
                <Mail className="w-4 h-4 mr-1" />
                Send Message
              </Button>
              <Button size="sm" variant="outline" className="border-slate-300">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">🎯 Optimization Opportunities</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-purple-800">Improve J.B. Hunt QuickPay adoption to 90%:</span>
              <span className="font-bold text-green-600">+$2,100/month savings</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-800">Repair Schneider relationship:</span>
              <span className="font-bold text-green-600">Retain $28K monthly volume</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-800">Expand Swift partnership:</span>
              <span className="font-bold text-green-600">+$15K monthly potential</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarrierOptimizationEngine;
