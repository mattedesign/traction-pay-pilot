
import { Badge } from "@/components/ui/badge";
import { TrendingDown, MapPin } from "lucide-react";
import { RouteOption } from "@/types/routeOption";

interface RecommendedRouteCardProps {
  route: RouteOption;
}

const RecommendedRouteCard = ({ route }: RecommendedRouteCardProps) => {
  return (
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
          Save ${route.savings.toFixed(2)}
        </Badge>
      </div>
      <div className="flex items-center space-x-2 text-sm text-slate-600">
        <MapPin className="w-4 h-4" />
        <span>{route.description} • {route.fuelStops} preferred stops</span>
      </div>
    </div>
  );
};

export default RecommendedRouteCard;
