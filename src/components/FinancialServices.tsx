
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard } from "lucide-react";
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
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-900">Financial Services</CardTitle>
        <CardDescription className="text-green-700">
          Improve your cash flow for this load
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-green-200 rounded p-3 text-center">
            <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-green-900">Fuel Advance</p>
            <p className="text-xs text-green-700">Up to ${fuelAdvanceAmount}</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 border-green-300 hover:bg-green-100" 
              onClick={handleFuelAdvance}
            >
              Apply
            </Button>
          </div>
          <div className="bg-white border border-green-200 rounded p-3 text-center">
            <CreditCard className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-green-900">Fuel Cards</p>
            <p className="text-xs text-green-700">Best rates on route</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 border-green-300 hover:bg-green-100" 
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
