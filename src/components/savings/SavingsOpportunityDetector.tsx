import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingDown, 
  Fuel, 
  Route, 
  CreditCard, 
  Wrench,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { CarrierProfile } from "@/types/carrier";

interface SavingsOpportunityDetectorProps {
  carrierProfile: CarrierProfile;
}

const SavingsOpportunityDetector = ({ carrierProfile }: SavingsOpportunityDetectorProps) => {
  const savingsOpportunities = [
    {
      id: 1,
      type: "fuel",
      title: "Route Optimization",
      description: "Alternative route to Atlanta saves 45 miles",
      potentialSavings: 120,
      impact: "high",
      implementationTime: "immediate",
      category: "Route Efficiency"
    },
    {
      id: 2,
      type: "payment",
      title: "QuickPay Strategy",
      description: "Use QuickPay for loads with 2%+ margins to improve cash flow",
      potentialSavings: 0,
      impact: "medium",
      implementationTime: "immediate",
      category: "Cash Flow"
    },
    {
      id: 3,
      type: "maintenance",
      title: "Preventive Maintenance",
      description: "Schedule service now to avoid roadside emergency costs",
      potentialSavings: 850,
      impact: "high",
      implementationTime: "this week",
      category: "Maintenance"
    },
    {
      id: 4,
      type: "fuel",
      title: "Fuel Stop Strategy",
      description: "Adjust fuel stops on I-75 corridor for better pricing",
      potentialSavings: 65,
      impact: "medium",
      implementationTime: "next trip",
      category: "Fuel Management"
    }
  ];

  const getOpportunityIcon = (type: string) => {
    switch (type) {
      case "fuel": return Fuel;
      case "payment": return CreditCard;
      case "maintenance": return Wrench;
      case "route": return Route;
      default: return DollarSign;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalPotentialSavings = savingsOpportunities
    .reduce((sum, opp) => sum + opp.potentialSavings, 0);

  const implementedSavings = 2340; // Mock data for already implemented savings

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingDown className="w-6 h-6 text-green-600" />
          <span>Money-Saving Opportunities</span>
          <Badge className="bg-green-100 text-green-800">
            ${totalPotentialSavings} potential
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Savings Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">This Month's Savings</p>
                  <p className="text-2xl font-bold text-green-900">
                    ${implementedSavings.toLocaleString()}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Available Opportunities</p>
                  <p className="text-2xl font-bold text-blue-900">
                    ${totalPotentialSavings.toLocaleString()}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Opportunities List */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Active Opportunities</h4>
            
            {savingsOpportunities.map((opportunity) => {
              const IconComponent = getOpportunityIcon(opportunity.type);
              return (
                <div key={opportunity.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <IconComponent className="w-5 h-5 text-slate-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-slate-900">{opportunity.title}</h5>
                        <p className="text-sm text-slate-600 mt-1">{opportunity.description}</p>
                        
                        <div className="flex items-center space-x-3 mt-2">
                          <Badge className={getImpactColor(opportunity.impact)}>
                            {opportunity.impact} impact
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {opportunity.category}
                          </span>
                          <span className="text-xs text-slate-500">
                            Implement: {opportunity.implementationTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {opportunity.potentialSavings > 0 && (
                        <div className="font-bold text-green-600 mb-2">
                          Save ${opportunity.potentialSavings}
                        </div>
                      )}
                      <Button size="sm" variant="outline">
                        Implement
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROI Calculator */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-3">Monthly Savings Projection</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-slate-600">Current Month</p>
                <p className="text-xl font-bold text-green-600">
                  ${implementedSavings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">If All Implemented</p>
                <p className="text-xl font-bold text-blue-600">
                  ${(implementedSavings + totalPotentialSavings).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Annual Projection</p>
                <p className="text-xl font-bold text-purple-600">
                  ${((implementedSavings + totalPotentialSavings) * 12).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsOpportunityDetector;
