
import { CreditCard, TrendingUp, CheckCircle, Calculator, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PaymentSmartAlerts = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <CreditCard className="w-6 h-6" />
          <span>💳 PAYMENT OPPORTUNITY ALERT</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <p className="text-blue-900 font-medium mb-4">
            You have a balance of <strong>$4,567</strong> in overdue payments.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                IMMEDIATE BENEFITS of paying now:
              </h4>
              <ul className="space-y-1 text-sm text-green-800 ml-6">
                <li>✓ Increase your credit balance by $4,567</li>
                <li>✓ Access to 78% additional load volume next month</li>
                <li>✓ Qualify for better factoring rates (2.9% vs current 3.2%)</li>
                <li>✓ Unlock premium load opportunities worth $15,000+ weekly</li>
              </ul>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                PROJECTED IMPACT:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Monthly revenue increase:</span>
                  <span className="font-bold text-green-900">$12,340</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Annual savings on factoring:</span>
                  <span className="font-bold text-green-900">$1,800</span>
                </div>
                <div className="flex justify-between md:col-span-2">
                  <span className="text-green-700">Equipment financing eligibility:</span>
                  <Badge className="bg-green-100 text-green-800">Restored</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay Outstanding Invoices
          </Button>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            <Calculator className="w-4 h-4 mr-2" />
            Learn About Auto-Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSmartAlerts;
