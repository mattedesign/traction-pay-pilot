
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Clock, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RouteOptimization = () => {
  const { toast } = useToast();

  const handleViewRoute = () => {
    console.log("Opening detailed route view");
    toast({
      title: "Route Details",
      description: "Opening optimized route with fuel stops and real-time traffic data...",
    });
    
    // Simulate opening route in external app
    setTimeout(() => {
      window.open("https://maps.google.com", "_blank");
    }, 1000);
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-900">Smart Route Suggestions</CardTitle>
        <CardDescription className="text-blue-700">
          AI-optimized route based on real-time fuel prices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-white border border-blue-200 rounded p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-blue-900">Recommended Route</span>
            <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
              Save $12.50
            </Badge>
          </div>
          <p className="text-sm text-blue-700">
            Via I-71 N → I-270 W • Avoids high-fuel zones • 3 preferred truck stops
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-blue-200 rounded p-3 text-center">
            <Fuel className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-blue-900">Est. Fuel Cost</p>
            <p className="text-lg font-bold text-blue-600">$52.30</p>
          </div>
          <div className="bg-white border border-blue-200 rounded p-3 text-center">
            <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-blue-900">Drive Time</p>
            <p className="text-lg font-bold text-blue-600">1h 15m</p>
          </div>
        </div>

        <Button className="w-full" onClick={handleViewRoute}>
          <Navigation className="w-4 h-4 mr-2" />
          View Detailed Route & Fuel Stops
        </Button>
      </CardContent>
    </Card>
  );
};

export default RouteOptimization;
