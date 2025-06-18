
import { AlertTriangle, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentPerformanceAlert = () => {
  return (
    <Card className="bg-red-50 border-red-200 mb-6">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-bold text-red-900">🚨 PAYMENT PERFORMANCE ALERT</h3>
            </div>
            <p className="text-red-800 mb-3">
              Your payment history is affecting your business opportunities
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-red-900 font-semibold">
                Late Payment Impact: 23% reduction in available load volume
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                View Payment Details
              </Button>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                Schedule Payment Call
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentPerformanceAlert;
