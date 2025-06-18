
import { Brain, CheckCircle, TrendingUp, Target, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PaymentCoachSection = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-900">
          <Brain className="w-6 h-6" />
          <span>💡 PAYMENT OPTIMIZATION COACH</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-purple-800 font-medium">
          Based on your current payment pattern, here's how to grow your business:
        </p>

        {/* Immediate Opportunity */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-green-900 mb-2">
                ✅ IMMEDIATE OPPORTUNITY (Next 7 Days)
              </h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Pay 3 outstanding invoices ($4,567 total)</li>
                <li>• Unlock 78% more load volume next month</li>
                <li>• Potential additional revenue: $12,340/month</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Growth Pathway */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 mb-2">
                📈 GROWTH PATHWAY
              </h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Set up online payments → Access to premium loads</li>
                <li>• 90% on-time payment rate → Preferred carrier status</li>
                <li>• Equipment financing available with improved payment history</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Subscription Benefits */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-900 mb-2">
                🎯 SUBSCRIPTION BENEFITS
              </h4>
              <ul className="space-y-1 text-sm text-yellow-800">
                <li>• Insurance program: Save $890/month</li>
                <li>• Equipment lease: $1,200/month savings vs purchase</li>
                <li>• Premium support: Dedicated account manager</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Target className="w-4 h-4 mr-2" />
            Start Improvement Plan
          </Button>
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Schedule Coach Call
          </Button>
          <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
            AI-Powered Recommendations
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCoachSection;
