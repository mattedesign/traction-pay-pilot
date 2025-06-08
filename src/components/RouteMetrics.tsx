
import { Fuel, Clock } from "lucide-react";
import { RouteOption } from "@/types/routeOption";

interface RouteMetricsProps {
  route: RouteOption;
}

const RouteMetrics = ({ route }: RouteMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors duration-200">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
            <Fuel className="w-4 h-4 text-slate-600" />
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700">Fuel Cost</p>
        <p className="text-xl font-bold text-slate-600">${route.fuelCost.toFixed(2)}</p>
        <p className="text-xs text-slate-500">vs $64.80 standard</p>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors duration-200">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200">
            <Clock className="w-4 h-4 text-slate-600" />
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700">Drive Time</p>
        <p className="text-xl font-bold text-slate-600">{route.driveTime}</p>
        <p className="text-xs text-slate-500">fastest route</p>
      </div>
    </div>
  );
};

export default RouteMetrics;
