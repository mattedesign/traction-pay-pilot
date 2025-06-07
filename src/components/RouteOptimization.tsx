
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Clock, Navigation, MapPin, Zap, TrendingDown } from "lucide-react";
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
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Route Illustration */}
      <div className="absolute top-0 right-0 w-40 h-32 opacity-10">
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <path 
            d="M20,60 Q50,20 80,60 T140,60" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
            className="text-blue-600"
          />
          <circle cx="20" cy="60" r="4" className="fill-blue-500" />
          <circle cx="140" cy="60" r="4" className="fill-blue-500" />
          <circle cx="80" cy="45" r="2" className="fill-blue-400 animate-pulse" />
          <circle cx="110" cy="55" r="2" className="fill-blue-400 animate-pulse delay-300" />
        </svg>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
            <Navigation className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <CardTitle className="text-blue-900">Smart Route Suggestions</CardTitle>
            <CardDescription className="text-blue-700">
              AI-optimized route based on real-time fuel prices
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-blue-900">Recommended Route</span>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-blue-600 font-medium">AI Optimized</span>
              </div>
            </div>
            <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50 shadow-sm">
              <TrendingDown className="w-3 h-3 mr-1" />
              Save $12.50
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-blue-700">
            <MapPin className="w-4 h-4" />
            <span>Via I-71 N → I-270 W • Avoids high-fuel zones • 3 preferred truck stops</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Fuel className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-blue-900">Est. Fuel Cost</p>
            <p className="text-xl font-bold text-blue-600">$52.30</p>
            <p className="text-xs text-blue-500">vs $64.80 standard</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-blue-900">Drive Time</p>
            <p className="text-xl font-bold text-blue-600">1h 15m</p>
            <p className="text-xs text-blue-500">fastest route</p>
          </div>
        </div>

        <Button className="w-full shadow-sm font-medium" onClick={handleViewRoute}>
          <Navigation className="w-4 h-4 mr-2" />
          View Detailed Route & Fuel Stops
          <Zap className="w-4 h-4 ml-auto" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RouteOptimization;
