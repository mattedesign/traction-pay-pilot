
import { Button } from "@/components/ui/button";
import { Navigation, Fuel, ExternalLink } from "lucide-react";

interface RouteActionButtonsProps {
  onViewRoute: () => void;
  onFindFuelStops: () => void;
}

const RouteActionButtons = ({ onViewRoute, onFindFuelStops }: RouteActionButtonsProps) => {
  return (
    <div className="space-y-2">
      <Button 
        className="w-full bg-slate-700 hover:bg-slate-800 font-medium transition-colors duration-200" 
        onClick={onViewRoute}
      >
        <Navigation className="w-4 h-4 mr-2" />
        View Detailed Route & Navigation
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full border-slate-300 hover:bg-slate-50 font-medium transition-colors duration-200" 
        onClick={onFindFuelStops}
      >
        <Fuel className="w-4 h-4 mr-2" />
        Find Cheapest Fuel Stops
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default RouteActionButtons;
