
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Clock, DollarSign, CheckCircle, Calculator } from "lucide-react";

interface LoadData {
  loadId: string;
  quickPayFee: string;
  quickPayAmount: string;
  quickPayDate: string;
  standardPayDate: string;
  daysToStandardPay: number;
  annualizedRate: string;
}

interface QuickPayApplicationProps {
  loadData: LoadData;
  applicationStatus: "offer" | "applying" | "approved";
  onQuickPayApplication: () => void;
}

const QuickPayApplication = ({ loadData, applicationStatus, onQuickPayApplication }: QuickPayApplicationProps) => {
  if (applicationStatus === "offer") {
    return (
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

          <Button onClick={onQuickPayApplication} className="w-full">
            Apply for QuickPay
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (applicationStatus === "applying") {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">Processing Application...</h3>
            <p className="text-blue-700">Verifying invoice and payment eligibility</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (applicationStatus === "approved") {
    return (
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
    );
  }

  return null;
};

export default QuickPayApplication;
