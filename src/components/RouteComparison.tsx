
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, ExternalLink } from "lucide-react";
import { RouteOption } from "@/types/routeOption";

interface RouteComparisonProps {
  routes: RouteOption[];
  onRouteSelect: (routeId: string) => void;
}

const RouteComparison = ({ routes, onRouteSelect }: RouteComparisonProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h3 className="font-medium text-slate-800">Route Comparison</h3>
        <p className="text-sm text-slate-600">Choose the best route for your needs</p>
      </div>
      <div className="divide-y divide-slate-100">
        {routes.map((route) => (
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
              onClick={() => onRouteSelect(route.id)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Select This Route
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteComparison;
