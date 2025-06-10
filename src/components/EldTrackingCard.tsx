
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin, Fuel, Clock, Truck, TrendingUp } from "lucide-react";
import { EldDataService } from "@/services/eldDataService";

interface EldTrackingCardProps {
  loadId: string;
}

const EldTrackingCard = ({ loadId }: EldTrackingCardProps) => {
  const currentLocation = EldDataService.getCurrentLocation(loadId);
  const intelligence = EldDataService.getIntelligenceData(loadId);
  const isEldEnabled = EldDataService.isEldEnabled(loadId);

  if (!isEldEnabled || !currentLocation) {
    return null;
  }

  const statusColor = EldDataService.getDriverStatusColor(currentLocation.driverStatus || 'off_duty');

  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          <span>Live ELD Tracking</span>
          <Badge className={`text-xs ${statusColor}`}>
            {currentLocation.driverStatus?.replace('_', ' ').toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Location */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900">Current Location</p>
              <p className="text-sm text-slate-600">{currentLocation.location.address}</p>
              <p className="text-xs text-slate-500">
                Updated: {new Date(currentLocation.time).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-blue-900">Speed</p>
            <p className="text-lg font-bold text-blue-700">{currentLocation.speed} mph</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Fuel className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs font-medium text-green-900">Fuel Level</p>
            <p className="text-lg font-bold text-green-700">{currentLocation.fuelLevel}%</p>
          </div>
        </div>

        {/* Driver Hours */}
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Hours Remaining</span>
            </div>
            <span className="text-lg font-bold text-orange-700">
              {currentLocation.hoursRemaining}h
            </span>
          </div>
        </div>

        {/* Intelligence Insights */}
        {intelligence && (
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-slate-900">Performance Insights</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500">Avg Speed:</span>
                <span className="ml-1 font-medium">{intelligence.avgSpeed} mph</span>
              </div>
              <div>
                <span className="text-slate-500">Fuel Efficiency:</span>
                <span className="ml-1 font-medium">{intelligence.fuelEfficiency} mpg</span>
              </div>
              <div>
                <span className="text-slate-500">Driver Score:</span>
                <span className="ml-1 font-medium text-green-600">{intelligence.driverScore}/100</span>
              </div>
              <div>
                <span className="text-slate-500">ETA:</span>
                <span className="ml-1 font-medium">
                  {new Date(intelligence.estimatedArrival).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MapPin className="w-3 h-3 mr-1" />
            View Route
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Navigation className="w-3 h-3 mr-1" />
            Track Live
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EldTrackingCard;
