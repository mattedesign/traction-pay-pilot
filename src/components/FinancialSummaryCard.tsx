
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Clock, CreditCard, Calculator, Edit } from "lucide-react";
import { Load } from "@/types/load";

interface FinancialSummaryCardProps {
  loadData: Load;
}

const FinancialSummaryCard = ({ loadData }: FinancialSummaryCardProps) => {
  // Calculate financial details
  const rate = parseFloat(loadData.amount.replace('$', '').replace(',', ''));
  const advancePercentage = 0.4; // 40% advance
  const advanceAmount = Math.round(rate * advancePercentage);
  const remainingAmount = rate - advanceAmount;
  const quickPayFee = Math.round(rate * 0.02); // 2% quick pay fee
  const quickPayAmount = rate - quickPayFee;

  const canEditFundingMethod = loadData.status !== "delivered";

  const handleFundingMethodEdit = () => {
    // TODO: Implement funding method edit functionality
    console.log("Edit funding method clicked");
  };

  const getPaymentStatus = () => {
    switch (loadData.status) {
      case "pending_acceptance":
        return { label: "Payment Pending", color: "bg-orange-50 border-orange-200 text-orange-700" };
      case "pending_pickup":
        return { label: "Advance Available", color: "bg-blue-50 border-blue-200 text-blue-700" };
      case "in_transit":
        return { label: "In Progress", color: "bg-green-50 border-green-200 text-green-700" };
      case "delivered":
        return { label: "Payment Due", color: "bg-purple-50 border-purple-200 text-purple-700" };
      default:
        return { label: "Unknown", color: "bg-slate-50 border-slate-200 text-slate-700" };
    }
  };

  const paymentStatus = getPaymentStatus();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Financial Summary</span>
          </CardTitle>
          <Badge variant="outline" className={paymentStatus.color}>
            {paymentStatus.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-700">Total Rate</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{loadData.amount}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Per Mile</span>
            </div>
            <p className="text-lg font-semibold text-blue-600">
              ${(rate / parseFloat(loadData.distance.replace(' miles', ''))).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Funding Method */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">Funding Method</span>
            {canEditFundingMethod && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleFundingMethodEdit}
                title="Edit funding method"
              >
                <Edit className="w-3 h-3" />
              </Button>
            )}
          </div>
          <p className="text-sm text-slate-700 mb-4">
            {loadData.rateConfirmation?.originalRate || "Not specified"}
          </p>
        </div>

        {/* Payment Breakdown */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Payment Options</h4>
          <div className="space-y-3">
            {/* Advance Payment */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Advance Payment</p>
                  <p className="text-xs text-blue-700">{advancePercentage * 100}% of total rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-900">${advanceAmount.toLocaleString()}</p>
                <p className="text-xs text-blue-700">Available now</p>
              </div>
            </div>

            {/* Quick Pay Option */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Quick Pay</p>
                  <p className="text-xs text-green-700">2% fee - Next business day</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-900">${quickPayAmount.toLocaleString()}</p>
                <p className="text-xs text-green-700">After delivery</p>
              </div>
            </div>

            {/* Standard Payment */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-slate-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Standard Payment</p>
                  <p className="text-xs text-slate-700">Net 30 terms</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{loadData.amount}</p>
                <p className="text-xs text-slate-700">Full amount</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Request Advance
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Payment Options
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryCard;
