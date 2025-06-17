
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, CreditCard, Fuel, Calculator } from "lucide-react";

interface FinancialIntelligenceProps {
  compact?: boolean;
}

const FinancialIntelligence = ({ compact = false }: FinancialIntelligenceProps) => {
  const factoringStats = {
    totalFactored: 125750.50,
    totalFees: 2515.01,
    avgFactoringRate: 2.0,
    quickPaySavings: 1250.75,
    pendingFunding: 8950.25,
    thisMonthVolume: 45250.00
  };

  const fuelSavings = {
    gallonsSaved: 2850,
    avgSavingsPerGallon: 0.50,
    totalSavings: 1425.00,
    projectedMonthlySavings: 750.00
  };

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Factored</p>
                <p className="text-2xl font-bold text-green-600">
                  ${factoringStats.totalFactored.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Factoring Fees</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${factoringStats.totalFees.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">{factoringStats.avgFactoringRate}% avg rate</p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Funding</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${factoringStats.pendingFunding.toLocaleString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Fuel Savings</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${fuelSavings.totalSavings.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">{fuelSavings.gallonsSaved} gallons</p>
              </div>
              <Fuel className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {!compact && (
        <>
          {/* Cash Flow Projections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Cash Flow Projections</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Next 7 Days</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">Expected Funding</span>
                      <span className="font-bold text-green-600">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">QuickPay Available</span>
                      <span className="font-bold text-blue-600">$8,920</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Cost Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Factoring Fee (2%)</span>
                      <span className="font-medium">$250.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">QuickPay Fee (1%)</span>
                      <span className="font-medium">$125.00</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-sm">Fuel Savings</span>
                      <span className="font-medium">-$180.00</span>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center font-bold">
                      <span>Net Cost</span>
                      <span>$195.00</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Optimization</h4>
                  <div className="space-y-3">
                    <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                      Fuel Card Active
                    </Badge>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Projected Monthly Savings</p>
                      <p className="text-lg font-bold text-green-600">
                        ${fuelSavings.projectedMonthlySavings}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Optimize Routes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QuickPay Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>QuickPay Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">Load L1002</h4>
                        <p className="text-sm text-slate-600">XYZ Freight</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Approved</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Load Amount</span>
                        <span className="font-medium">$890.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">QuickPay (1%)</span>
                        <span className="text-red-600">-$8.91</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>You Receive</span>
                        <span className="text-green-600">$881.59</span>
                      </div>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      Apply QuickPay
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">Load L1005</h4>
                        <p className="text-sm text-slate-600">Reliable Shipping</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Purchased</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Load Amount</span>
                        <span className="font-medium">$1,800.75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">QuickPay (1%)</span>
                        <span className="text-red-600">-$18.01</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>You Receive</span>
                        <span className="text-green-600">$1,782.74</span>
                      </div>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      Apply QuickPay
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Fuel Savings Tip</h4>
                  <p className="text-sm text-blue-700">
                    Your fuel card savings of $0.50/gallon could offset QuickPay fees. 
                    Consider routing through partner fuel stations to maximize savings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default FinancialIntelligence;
