
import { TrendingUp, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const FactoringRateOpportunities = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <TrendingUp className="w-5 h-5" />
          <span>Factoring Rate Opportunities</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-900">Performance Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Current Rate:</span>
                <span className="font-semibold text-blue-900">3.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Industry Average:</span>
                <span className="font-semibold text-blue-900">2.8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-700">Payment History Impact:</span>
                <span className="font-semibold text-red-900">+0.4%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-900">Improvement Path</h4>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 mb-2">
                Complete 5 on-time payments to qualify for <strong>2.9% rate</strong>
              </p>
              <Progress value={40} className="h-2" />
              <p className="text-xs text-green-600 mt-1">2 of 5 payments completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h5 className="font-semibold text-blue-900 mb-1">Peer Comparison</h5>
              <p className="text-sm text-blue-700">
                Carriers with similar volume but better payment history average <strong>2.6%</strong>
              </p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Target className="w-4 h-4 mr-2" />
          Start Rate Improvement Program
        </Button>
      </CardContent>
    </Card>
  );
};

export default FactoringRateOpportunities;
