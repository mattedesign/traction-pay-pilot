
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Clock, Navigation, MapPin, Route, TrendingDown, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RouteOption {
  id: string;
  name: string;
  description: string;
  fuelCost: number;
  driveTime: string;
  distance: string;
  fuelStops: number;
  savings: number;
  recommended?: boolean;
}

const RouteOptimization = () => {
  const { toast } = useToast();
  const [showComparison, setShowComparison] = useState(false);

  const routeOptions: RouteOption[] = [
    {
      id: "optimal",
      name: "AI Optimized Route",
      description: "Via I-71 N → I-270 W • Avoids high-fuel zones",
      fuelCost: 52.30,
      driveTime: "1h 15m",
      distance: "68 miles",
      fuelStops: 3,
      savings: 12.50,
      recommended: true
    },
    {
      id: "fastest",
      name: "Fastest Route", 
      description: "Via I-77 N → I-270 W • Direct highway route",
      fuelCost: 58.80,
      driveTime: "1h 12m",
      distance: "65 miles",
      fuelStops: 2,
      savings: 6.00
    },
    {
      id: "standard",
      name: "Standard Route",
      description: "Via US-30 W → I-71 N • Traditional trucker route",
      fuelCost: 64.80,
      driveTime: "1h 25m", 
      distance: "72 miles",
      fuelStops: 4,
      savings: 0
    }
  ];

  const handleViewRoute = (routeId?: string) => {
    const route = routeId ? routeOptions.find(r => r.id === routeId) : routeOptions[0];
    console.log(`Opening detailed route view for: ${route?.name}`);
    toast({
      title: "Route Details",
      description: `Opening ${route?.name} with fuel stops and real-time traffic data...`,
    });
    
    // Open Google Maps with a route from Shreve, OH to Grove City, OH
    const origin = "3875 S Elyria Rd, Shreve, OH 44676";
    const destination = "3920 Southwest Blvd, Grove City, OH 43123";
    const mapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`;
    window.open(mapsUrl, "_blank");
  };

  const handleFuelStops = () => {
    console.log("Opening fuel stop finder");
    toast({
      title: "Fuel Stop Finder",
      description: "Finding cheapest fuel stops along your route...",
    });
    
    // Open GasBuddy for route fuel planning
    window.open("https://www.gasbuddy.com/trip", "_blank");
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
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
          <circle cx="45" cy="32" r="2" className="fill-slate-400">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="83" cy="48" r="2" className="fill-slate-400">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.7s" />
          </circle>
          {/* Traffic indicators */}
          <rect x="30" y="38" width="8" height="4" rx="2" className="fill-slate-200 opacity-60" />
          <rect x="70" y="38" width="12" height="4" rx="2" className="fill-slate-200 opacity-60" />
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
            <Badge variant="outline" className="border-slate-200 text-slate-700 bg-slate-50">
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
                <Fuel className="w-4 h-4 text-slate-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-700">Fuel Cost</p>
            <p className="text-xl font-bold text-slate-600">$52.30</p>
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

        {/* Route Comparison Toggle */}
        <Button 
          variant="ghost" 
          className="w-full text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-slate-200" 
          onClick={toggleComparison}
        >
          {showComparison ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Hide Route Comparison
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Compare All Routes by Fuel Cost
            </>
          )}
        </Button>

        {/* Route Comparison Table */}
        {showComparison && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="font-medium text-slate-800">Route Comparison</h3>
              <p className="text-sm text-slate-600">Choose the best route for your needs</p>
            </div>
            <div className="divide-y divide-slate-100">
              {routeOptions.map((route) => (
                <div key={route.id} className="p-4 hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-700">{route.name}</span>
                      {route.recommended && (
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-700">${route.fuelCost.toFixed(2)}</p>
                      {route.savings > 0 && (
                        <p className="text-xs text-green-600 font-medium">Save ${route.savings.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{route.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Time</p>
                      <p className="font-medium text-slate-700">{route.driveTime}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Distance</p>
                      <p className="font-medium text-slate-700">{route.distance}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Fuel Stops</p>
                      <p className="font-medium text-slate-700">{route.fuelStops}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3 border-slate-300 hover:bg-slate-50" 
                    onClick={() => handleViewRoute(route.id)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Select This Route
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Button className="w-full bg-slate-700 hover:bg-slate-800 font-medium transition-colors duration-200" onClick={() => handleViewRoute()}>
            <Navigation className="w-4 h-4 mr-2" />
            View Detailed Route & Navigation
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          
          <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50 font-medium transition-colors duration-200" onClick={handleFuelStops}>
            <Fuel className="w-4 h-4 mr-2" />
            Find Cheapest Fuel Stops
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteOptimization;
