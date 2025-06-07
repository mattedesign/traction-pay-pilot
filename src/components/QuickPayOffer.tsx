
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, DollarSign, CheckCircle, TrendingUp, Calculator } from "lucide-react";
import ChatInterface from "./ChatInterface";

const QuickPayOffer = () => {
  const [applicationStatus, setApplicationStatus] = useState<"offer" | "applying" | "approved">("offer");

  const loadData = {
    loadId: "0000",
    invoiceAmount: "$1,200.00",
    standardPayDate: "June 3, 2025",
    daysToStandardPay: 27,
    quickPayFee: "$24.00",
    quickPayAmount: "$1,176.00",
    quickPayDate: "Tomorrow",
    cashFlowImprovement: "$1,176.00",
    annualizedRate: "3.6%"
  };

  const factorData = {
    available: true,
    rate: "2.5%",
    advance: "85%",
    monthlyVolume: "$12,500"
  };

  const handleQuickPayApplication = () => {
    setApplicationStatus("applying");
    setTimeout(() => setApplicationStatus("approved"), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Invoice Status */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <CardTitle className="text-green-900">Invoice Approved!</CardTitle>
              <CardDescription className="text-green-700">
                Load #{loadData.loadId} invoice has been approved by the broker
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-green-900">Invoice Amount</p>
              <p className="text-xl font-bold text-green-600">{loadData.invoiceAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Standard Payment</p>
              <p className="text-sm text-green-700">{loadData.standardPayDate}</p>
              <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 mt-1">
                {loadData.daysToStandardPay} days
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QuickPay Offer */}
      {applicationStatus === "offer" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <div>
                <CardTitle className="text-blue-900">QuickPay Available</CardTitle>
                <CardDescription className="text-blue-700">
                  Get paid tomorrow instead of waiting {loadData.daysToStandardPay} days
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Payment Timeline</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{loadData.quickPayDate}</p>
                  <p className="text-xs text-blue-700">vs. {loadData.standardPayDate}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">You Receive</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{loadData.quickPayAmount}</p>
                  <p className="text-xs text-blue-700">Fee: {loadData.quickPayFee}</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center space-x-2 mb-1">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Cost Analysis</span>
                </div>
                <p className="text-xs text-blue-700">
                  Annualized rate: {loadData.annualizedRate} • One-time fee for 27-day acceleration
                </p>
              </div>
            </div>

            <Button onClick={handleQuickPayApplication} className="w-full">
              Apply for QuickPay
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Application Processing */}
      {applicationStatus === "applying" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">Processing Application...</h3>
            <p className="text-blue-700">Verifying invoice and payment eligibility</p>
          </CardContent>
        </Card>
      )}

      {/* Approved */}
      {applicationStatus === "approved" && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <CardTitle className="text-green-900">QuickPay Approved!</CardTitle>
                <CardDescription className="text-green-700">
                  {loadData.quickPayAmount} will be deposited tomorrow
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 mb-2">
                <strong>Expected Deposit:</strong> Tomorrow by 5 PM EST
              </p>
              <p className="text-sm text-green-700">
                <strong>Tracking Number:</strong> QP-{loadData.loadId}-20250607
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Factoring Alternative */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-900">Consider Factoring for Regular Cash Flow</CardTitle>
          <CardDescription className="text-purple-700">
            Get consistent advance payments on all your loads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-purple-900">{factorData.rate} Rate</p>
              <p className="text-xs text-purple-700">Competitive</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-purple-900">{factorData.advance} Advance</p>
              <p className="text-xs text-purple-700">On approval</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-purple-900">24 Hours</p>
              <p className="text-xs text-purple-700">Funding time</p>
            </div>
          </div>

          <div className="bg-white border border-purple-200 rounded p-3">
            <p className="text-sm text-purple-800 mb-2">
              <strong>Monthly Estimate:</strong> Based on your {factorData.monthlyVolume} volume
            </p>
            <p className="text-sm text-purple-700">
              You could receive ~${Math.round(parseFloat(factorData.monthlyVolume.slice(1).replace(',', '')) * 0.85).toLocaleString()} 
              advance each month
            </p>
          </div>

          <Button variant="outline" className="w-full border-purple-300">
            Learn More About Factoring
          </Button>
        </CardContent>
      </Card>

      {/* AI Chat */}
      <Card>
        <CardHeader>
          <CardTitle>Questions About Payment Options?</CardTitle>
          <CardDescription>
            Ask about QuickPay, factoring, cash flow management, or payment optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface loadContext={`Load #${loadData.loadId} payment options`} />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickPayOffer;
