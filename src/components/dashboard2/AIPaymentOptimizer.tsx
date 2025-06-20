
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, DollarSign, Clock, Target, TrendingUp } from "lucide-react";

const AIPaymentOptimizer = () => {
  const recommendations = [
    {
      loadId: "9012",
      amount: "$2,875",
      recommendation: "QuickPay",
      reason: "One-time load, high margin",
      savings: "$45",
      confidence: 94
    },
    {
      loadId: "8834", 
      amount: "$1,950",
      recommendation: "Factor",
      reason: "Regular customer, long-term relationship",
      savings: "$23",
      confidence: 89
    },
    {
      loadId: "8901",
      amount: "$3,420", 
      recommendation: "Factor",
      reason: "Large amount, optimize cash flow",
      savings: "$67",
      confidence: 92
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-900">
          <Brain className="w-6 h-6" />
          <span>🤖 AI PAYMENT OPTIMIZER</span>
          <Badge className="bg-purple-100 text-purple-800">Live Analysis</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-purple-900">Real-Time Recommendations</h4>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-purple-700">Processing 3 loads...</span>
            </div>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded border">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="font-medium">Load #{rec.loadId}</span>
                    <span className="text-slate-600 ml-2">{rec.amount}</span>
                  </div>
                  <Badge className={rec.recommendation === "QuickPay" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                    {rec.recommendation}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">Save {rec.savings}</div>
                  <div className="text-xs text-slate-500">{rec.confidence}% confidence</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Monthly Savings</span>
            </div>
            <div className="text-xl font-bold text-green-600">$1,340</div>
            <div className="text-xs text-green-700">vs traditional factoring</div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Faster Payments</span>
            </div>
            <div className="text-xl font-bold text-blue-600">73%</div>
            <div className="text-xs text-blue-700">of loads paid in 24hrs</div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Optimization Rate</span>
            </div>
            <div className="text-xl font-bold text-purple-600">94%</div>
            <div className="text-xs text-purple-700">accuracy in recommendations</div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-900 mb-2">🎯 THIS WEEK'S OPPORTUNITY</h4>
              <p className="text-sm text-yellow-800 mb-2">
                AI analysis shows you could save an additional $230 this week by switching 2 loads from factoring to QuickPay.
              </p>
              <div className="text-xs text-yellow-700">
                • Load #9045: Save $89 (customer pays within 7 days typically)
                • Load #9103: Save $141 (short haul, high margin opportunity)
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Brain className="w-4 h-4 mr-2" />
            Enable Auto-Optimization
          </Button>
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            View Analysis Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPaymentOptimizer;
