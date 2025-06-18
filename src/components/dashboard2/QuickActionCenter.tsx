
import { CreditCard, Zap, Phone, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const QuickActionCenter = () => {
  return (
    <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span>Quick Action Center</span>
          <Badge className="bg-blue-100 text-blue-800">Payment-Focused</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pay Overdue Invoices */}
          <div className="bg-white p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 mb-1">🔥 Pay Overdue Invoices</h4>
                <p className="text-sm text-red-700 mb-3">$4,567 total</p>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Pay Now
                </Button>
              </div>
            </div>
          </div>

          {/* Set Up Auto-Pay */}
          <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 mb-1">⚡ Set Up Auto-Pay</h4>
                <p className="text-sm text-green-700 mb-3">Unlock instant benefits</p>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Enable Auto-Pay
                </Button>
              </div>
            </div>
          </div>

          {/* Talk to Payment Specialist */}
          <div className="bg-white p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">📞 Payment Specialist</h4>
                <p className="text-sm text-blue-700 mb-3">Schedule call</p>
                <Button size="sm" variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>

          {/* View Payment Impact Report */}
          <div className="bg-white p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 mb-1">📊 Impact Report</h4>
                <p className="text-sm text-purple-700 mb-3">Detailed analysis</p>
                <Button size="sm" variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                  View Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <h4 className="font-semibold text-yellow-900">Quick Win Opportunity</h4>
          </div>
          <p className="text-sm text-yellow-800">
            Complete any payment action above to immediately improve your business metrics 
            and unlock new growth opportunities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionCenter;
