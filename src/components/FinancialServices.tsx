
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, TrendingUp, ExternalLink, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinancialServicesProps {
  loadAmount: string;
}

const FinancialServices = ({ loadAmount }: FinancialServicesProps) => {
  const { toast } = useToast();
  const fuelAdvanceAmount = Math.round(parseFloat(loadAmount.slice(1)) * 0.3);

  const handleFuelAdvance = () => {
    console.log("Processing fuel advance application");
    toast({
      title: "Fuel Advance Application",
      description: `Processing your application for $${fuelAdvanceAmount}. You'll receive approval within 15 minutes.`,
    });

    // Simulate approval process
    setTimeout(() => {
      toast({
        title: "Fuel Advance Approved!",
        description: `$${fuelAdvanceAmount} has been approved and will be deposited within 2 hours.`,
      });
    }, 3000);
  };

  const handleFuelCards = () => {
    console.log("Opening fuel card comparison");
    toast({
      title: "Fuel Card Comparison",
      description: "Opening comprehensive fuel card comparison tool...",
    });

    // Open Fleet One fuel card comparison
    window.open("https://www.fleetone.com/fuel-cards", "_blank");
  };

  const handleLearnMoreFuelAdvance = () => {
    console.log("Opening fuel advance information");
    toast({
      title: "Fuel Advance Info",
      description: "Opening detailed information about fuel advances...",
    });

    // Open freight factoring information
    window.open("https://www.freightfactoring.com/freight-factoring/fuel-advances/", "_blank");
  };

  return (
    <Card className="bg-white border-slate-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Money Flow Illustration */}
      <div className="absolute top-2 right-2 w-24 h-16 opacity-8">
        <svg viewBox="0 0 96 64" className="w-full h-full">
          {/* Dollar sign */}
          <text x="48" y="35" fontSize="20" textAnchor="middle" className="fill-slate-300 font-bold">$</text>
          {/* Flow arrows */}
          <path d="M20,32 Q35,20 48,32" stroke="currentColor" strokeWidth="2" fill="none" className="text-slate-200" markerEnd="url(#arrowhead)">
            <animate attributeName="stroke-dasharray" values="0,100;20,100;0,100" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M48,32 Q63,44 78,32" stroke="currentColor" strokeWidth="2" fill="none" className="text-slate-200" markerEnd="url(#arrowhead)">
            <animate attributeName="stroke-dasharray" values="0,100;20,100;0,100" dur="3s" repeatCount="indefinite" begin="1s" />
          </path>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-200" />
            </marker>
          </defs>
        </svg>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <CardTitle className="text-slate-800">Financial Services</CardTitle>
            <CardDescription className="text-slate-500">
              Improve your cash flow for this load
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 hover:bg-slate-100 transition-colors duration-200">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Fuel Advance</p>
              <p className="text-lg font-bold text-green-600">${fuelAdvanceAmount}</p>
              <p className="text-xs text-slate-500">available now</p>
            </div>
            <div className="space-y-1 mt-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300 w-full transition-all duration-200" 
                onClick={handleFuelAdvance}
              >
                Apply Now
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="w-full text-xs text-slate-500 hover:text-slate-700 h-6" 
                onClick={handleLearnMoreFuelAdvance}
              >
                <Info className="w-3 h-3 mr-1" />
                Learn More
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 hover:bg-slate-100 transition-colors duration-200">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
                <CreditCard className="w-4 h-4 text-slate-600" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Fuel Cards</p>
              <p className="text-lg font-bold text-slate-600">3¢/gal</p>
              <p className="text-xs text-slate-500">best discount</p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 w-full transition-all duration-200" 
              onClick={handleFuelCards}
            >
              Compare Cards
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialServices;
