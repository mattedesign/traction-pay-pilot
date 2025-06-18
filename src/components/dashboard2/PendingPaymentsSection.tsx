
import { Clock, AlertCircle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PendingPaymentsSection = () => {
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-amber-900">
            <Clock className="w-5 h-5" />
            <span>Pending Payment Items</span>
          </CardTitle>
          <Badge className="bg-amber-100 text-amber-800">3 Overdue</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <div className="flex-1">
            <p className="font-medium text-amber-900">
              3 payments overdue - Complete these to unlock 15 new loads this week
            </p>
            <p className="text-sm text-amber-700">Total overdue: $4,567</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay Now
          </Button>
          <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
            Set Up Auto-Pay
          </Button>
          <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
            View Payment History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingPaymentsSection;
