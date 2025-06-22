
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fuel, ArrowLeft, TrendingUp, Calculator, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FactoringDetailsPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const factoringStats = {
    currentRate: 3.2,
    industryAverage: 2.8,
    monthlyFees: 4800,
    annualCost: 57600,
    totalAdvanced: 152000
  };

  const rateComparison = [
    { provider: "Current Provider", rate: 3.2, features: ["Same-day funding", "Fuel advances", "Basic reporting"] },
    { provider: "Market Average", rate: 2.8, features: ["1-2 day funding", "Standard advances", "Basic reporting"] },
    { provider: "Premium Option", rate: 2.4, features: ["Instant funding", "Fuel advances", "Advanced analytics"] },
    { provider: "Economy Option", rate: 3.8, features: ["2-3 day funding", "Limited advances", "Basic reporting"] }
  ];

  const monthlyBreakdown = [
    { month: "Jan", rate: 3.1, fees: 4650, volume: 150000 },
    { month: "Feb", rate: 3.2, fees: 4800, volume: 150000 },
    { month: "Mar", rate: 3.3, fees: 4950, volume: 150000 },
    { month: "Apr", rate: 3.2, fees: 4800, volume: 150000 },
    { month: "May", rate: 3.1, fees: 4650, volume: 150000 },
    { month: "Jun", rate: 3.2, fees: 4800, volume: 150000 }
  ];

  const getRateColor = (rate: number) => {
    if (rate <= 2.5) return "text-green-600";
    if (rate <= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center">
                  <Fuel className="w-6 h-6 mr-2 text-orange-600" />
                  Factoring Details
                </h1>
                <p className="text-slate-600">Comprehensive factoring rate analysis</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Current Factoring Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-orange-100 text-sm font-medium mb-1">Current Rate</div>
                    <div className="text-3xl font-bold">{factoringStats.currentRate}%</div>
                    <div className="text-orange-100 text-sm mt-1">
                      +{(factoringStats.currentRate - factoringStats.industryAverage).toFixed(1)}% above avg
                    </div>
                  </div>
                  <Fuel className="w-12 h-12 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Monthly Fees</div>
                <div className="text-2xl font-bold text-slate-900">${factoringStats.monthlyFees.toLocaleString()}</div>
                <div className="text-slate-500 text-sm mt-1">Current month</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Annual Cost</div>
                <div className="text-2xl font-bold text-red-600">${factoringStats.annualCost.toLocaleString()}</div>
                <div className="text-slate-500 text-sm mt-1">Projected yearly</div>
              </CardContent>
            </Card>
          </div>

          {/* Rate Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Rate Comparison Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rateComparison.map((provider, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    provider.provider === 'Current Provider' ? 'bg-orange-50 border-orange-200' : 'bg-white'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-slate-900">{provider.provider}</div>
                        <div className={`text-2xl font-bold ${getRateColor(provider.rate)}`}>
                          {provider.rate}%
                        </div>
                      </div>
                      {provider.provider === 'Current Provider' && (
                        <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">
                          CURRENT
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-slate-600">
                      <strong>Features:</strong> {provider.features.join(" • ")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Rate History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Monthly Rate History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyBreakdown.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium text-slate-900">{month.month}</div>
                      <div className={`text-xl font-bold ${getRateColor(month.rate)}`}>
                        {month.rate}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">${month.fees.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">
                        Volume: ${(month.volume / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Optimization Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                Cost Optimization Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Potential Annual Savings: $14,400</h4>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• Switch to premium provider at 2.4% rate (-0.8% savings)</li>
                    <li>• Negotiate volume discounts for consistent $150K+ monthly volume</li>
                    <li>• Consider selective factoring for higher-margin loads only</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Rate Negotiation Tips</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Highlight consistent payment history and low risk profile</li>
                    <li>• Bundle services (fuel cards, advances) for better rates</li>
                    <li>• Consider annual contracts for locked-in lower rates</li>
                    <li>• Review and renegotiate rates quarterly based on volume</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FactoringDetailsPage;
