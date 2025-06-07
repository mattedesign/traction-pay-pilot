
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, TrendingUp } from "lucide-react";
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
      description: "Loading best fuel card rates along your route...",
    });

    // Simulate opening fuel card comparison
    setTimeout(() => {
      window.open("https://www.google.com/maps/search/gas+stations", "_blank");
    }, 1000);
  };

  return (
    <Card className="bg-slate-50 border-slate-200 relative overflow-hidden">
      {/* Money Flow Illustration */}
      <div className="absolute top-2 right-2 w-24 h-16 opacity-15">
        <svg viewBox="0 0 96 64" className="w-full h-full">
          {/* Dollar sign */}
          <text x="48" y="35" fontSize="20" textAnchor="middle" className="fill-emerald-400 font-bold">$</text>
          {/* Flow arrows */}
          <path d="M20,32 Q35,20 48,32" stroke="currentColor" strokeWidth="2" fill="none" className="text-emerald-300" markerEnd="url(#arrowhead)">
            <animate attributeName="stroke-dasharray" values="0,100;20,100;0,100" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M48,32 Q63,44 78,32" stroke="currentColor" strokeWidth="2" fill="none" className="text-emerald-300" markerEnd="url(#arrowhead)">
            <animate attributeName="stroke-dasharray" values="0,100;20,100;0,100" dur="3s" repeatCount="indefinite" begin="1s" />
          </path>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" className="fill-emerald-300" />
            </marker>
          </defs>
        </svg>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <CardTitle className="text-slate-900">Financial Services</CardTitle>
            <CardDescription className="text-slate-600">
              Improve your cash flow for this load
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-900">Fuel Advance</p>
            <p className="text-lg font-bold text-emerald-600">${fuelAdvanceAmount}</p>
            <p className="text-xs text-slate-500">available now</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 w-full" 
              onClick={handleFuelAdvance}
            >
              Apply Now
            </Button>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-900">Fuel Cards</p>
            <p className="text-lg font-bold text-blue-600">3¢/gal</p>
            <p className="text-xs text-slate-500">best discount</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 w-full" 
              onClick={handleFuelCards}
            >
              Compare
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialServices;
