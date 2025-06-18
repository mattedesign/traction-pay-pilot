
import { DollarSign, AlertTriangle, TrendingDown, Eye, CreditCard, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PaymentCashFlowSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cash Flow Overview */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Your Money - Enhanced Cash Flow</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-800 font-medium">Pending Payments</span>
              <span className="text-xl font-bold text-amber-900">$8,450</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-red-800 font-medium">Overdue Payments</span>
              <span className="text-xl font-bold text-red-900">$4,567</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-blue-800 font-medium">Available Credit</span>
              <span className="text-xl font-bold text-blue-900">$12,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overdue Payments Callout */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-900">
            <AlertTriangle className="w-5 h-5" />
            <span>⚠️ OVERDUE PAYMENTS AFFECTING CASH FLOW</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-red-900 font-semibold">
              <span>Total Overdue:</span>
              <span className="text-xl">$4,567</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <div>
                  <p className="font-medium text-red-800">Invoice #INV-2024-0892</p>
                  <p className="text-xs text-red-600">12 days overdue</p>
                </div>
                <span className="font-bold text-red-900">$1,850</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <div>
                  <p className="font-medium text-red-800">Invoice #INV-2024-0901</p>
                  <p className="text-xs text-red-600">8 days overdue</p>
                </div>
                <span className="font-bold text-red-900">$1,567</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <div>
                  <p className="font-medium text-red-800">Invoice #INV-2024-0915</p>
                  <p className="text-xs text-red-600">5 days overdue</p>
                </div>
                <span className="font-bold text-red-900">$1,150</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Eye className="w-4 h-4 mr-2" />
              View Invoices
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              <Calendar className="w-4 h-4 mr-2" />
              Set Up Payment Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCashFlowSection;
