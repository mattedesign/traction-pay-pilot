
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Clock, Navigation, MapPin, Route, TrendingDown } from "lucide-react";
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
    <Card className="bg-white border-slate-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Route Visualization */}
      <div className="absolute top-2 right-2 w-32 h-20 opacity-8">
        <svg viewBox="0 0 128 80" className="w-full h-full">
          {/* Highway route */}
          <path 
            d="M10,40 Q32,20 64,40 Q96,60 118,40" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
            className="text-slate-200"
            strokeDasharray="6,4"
          />
          {/* Start point */}
          <circle cx="10" cy="40" r="3" className="fill-slate-300" />
          {/* End point */}
          <circle cx="118" cy="40" r="3" className="fill-slate-300" />
          {/* Fuel stops */}
          <circle cx="45" cy="32" r="2" className="fill-amber-400">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="83" cy="48" r="2" className="fill-amber-400">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.7s" />
          </circle>
          {/* Traffic indicators */}
          <rect x="30" y="38" width="8" height="4" rx="2" className="fill-red-200 opacity-60" />
          <rect x="70" y="38" width="12" height="4" rx="2" className="fill-green-200 opacity-60" />
        </svg>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
            <Route className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <CardTitle className="text-slate-800">Smart Route Planning</CardTitle>
            <CardDescription className="text-slate-500">
              AI-optimized route with real-time fuel pricing
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-slate-700">Recommended Route</span>
              <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span className="text-xs font-medium text-slate-600">AI Optimized</span>
              </div>
            </div>
            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
              <TrendingDown className="w-3 h-3 mr-1" />
              Save $12.50
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>Via I-71 N → I-270 W • Avoids high-fuel zones • 3 preferred stops</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors duration-200">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
                <Fuel className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-700">Fuel Cost</p>
            <p className="text-xl font-bold text-green-600">$52.30</p>
            <p className="text-xs text-slate-500">vs $64.80 standard</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors duration-200">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
                <Clock className="w-4 h-4 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-700">Drive Time</p>
            <p className="text-xl font-bold text-slate-600">1h 15m</p>
            <p className="text-xs text-slate-500">fastest route</p>
          </div>
        </div>

        <Button className="w-full bg-slate-700 hover:bg-slate-800 font-medium transition-colors duration-200" onClick={handleViewRoute}>
          <Navigation className="w-4 h-4 mr-2" />
          View Detailed Route & Fuel Stops
        </Button>
      </CardContent>
    </Card>
  );
};

export default RouteOptimization;
