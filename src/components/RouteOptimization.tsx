
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { routeOptions } from "@/types/routeOption";
import RouteVisualization from "./RouteVisualization";
import RecommendedRouteCard from "./RecommendedRouteCard";
import RouteMetrics from "./RouteMetrics";
import RouteComparison from "./RouteComparison";
import RouteActionButtons from "./RouteActionButtons";

const RouteOptimization = () => {
  const { toast } = useToast();
  const [showComparison, setShowComparison] = useState(false);

  const recommendedRoute = routeOptions.find(route => route.recommended) || routeOptions[0];

  const handleViewRoute = (routeId?: string) => {
    const route = routeId ? routeOptions.find(r => r.id === routeId) : recommendedRoute;
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
      <RouteVisualization />

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
        <RecommendedRouteCard route={recommendedRoute} />
        
        <RouteMetrics route={recommendedRoute} />

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
          <RouteComparison routes={routeOptions} onRouteSelect={handleViewRoute} />
        )}

        <RouteActionButtons 
          onViewRoute={() => handleViewRoute()}
          onFindFuelStops={handleFuelStops}
        />
      </CardContent>
    </Card>
  );
};

export default RouteOptimization;
