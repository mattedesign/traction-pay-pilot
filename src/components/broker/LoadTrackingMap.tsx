
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Truck } from "lucide-react";

interface LoadInProgress {
  id: string;
  origin: string;
  destination: string;
  status: "pickup_scheduled" | "in_transit" | "delivery_scheduled" | "delivered";
  carrier: string;
  driver: string;
  currentLocation?: { lat: number; lng: number; city: string };
  pickupDate: string;
  deliveryDate: string;
  rate: string;
  distance: string;
  eta: string;
  lastUpdate: string;
  quickPayEligible?: boolean;
  quickPayRate?: string;
}

interface LoadTrackingMapProps {
  loads: LoadInProgress[];
  selectedLoad: LoadInProgress | null;
}

const LoadTrackingMap = ({ loads, selectedLoad }: LoadTrackingMapProps) => {
  return (
    <Card className="bg-white h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="w-5 h-5" />
          <span>Live Map</span>
          {selectedLoad && (
            <Badge variant="outline" className="ml-2">
              {selectedLoad.id}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[500px] relative">
        {/* Simulated Map View */}
        <div className="w-full h-full bg-slate-100 rounded-lg relative overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
          
          {/* Route Lines (Simulated) */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="route" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="#3B82F6" opacity="0.3" />
              </pattern>
            </defs>
            {loads.map((load, index) => (
              <g key={load.id}>
                <path
                  d={`M ${20 + index * 30} 100 Q ${200 + index * 50} ${50 + index * 30} ${400 + index * 20} ${300 + index * 40}`}
                  stroke={selectedLoad?.id === load.id ? "#3B82F6" : "#94A3B8"}
                  strokeWidth={selectedLoad?.id === load.id ? "3" : "2"}
                  strokeDasharray={load.status === "in_transit" ? "5,5" : "none"}
                  fill="none"
                  opacity="0.8"
                />
              </g>
            ))}
          </svg>

          {/* Load Markers */}
          {loads.map((load, index) => (
            <div key={load.id} className="absolute" style={{ 
              left: `${20 + index * 15}%`, 
              top: `${20 + index * 12}%`,
              transform: 'translate(-50%, -50%)'
            }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                selectedLoad?.id === load.id ? 'bg-blue-600 ring-2 ring-blue-300' : 
                load.status === "in_transit" ? 'bg-green-600' : 
                load.status === "delivered" ? 'bg-gray-600' : 'bg-orange-600'
              }`}>
                <Truck className="w-4 h-4" />
              </div>
              {selectedLoad?.id === load.id && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border text-xs whitespace-nowrap z-10">
                  <div className="font-semibold">{load.id}</div>
                  <div className="text-slate-600">{load.carrier}</div>
                  {load.currentLocation && (
                    <div className="text-blue-600">{load.currentLocation.city}</div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <div className="text-xs font-semibold mb-2">Load Status</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span>Pickup Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span>In Transit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>

          {/* Current Location Info */}
          {selectedLoad && selectedLoad.currentLocation && (
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-sm">Current Location</span>
              </div>
              <div className="text-sm text-slate-600 mb-1">{selectedLoad.currentLocation.city}</div>
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>Updated {selectedLoad.lastUpdate}</span>
              </div>
              <div className="mt-2 text-xs">
                <div className="text-slate-600">ETA: {selectedLoad.eta}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadTrackingMap;
