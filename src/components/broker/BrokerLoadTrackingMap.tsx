
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Truck, Route } from "lucide-react";

interface LoadInProgress {
  id: string;
  origin: string;
  destination: string;
  status: "pickup_scheduled" | "in_transit" | "delivery_scheduled" | "delivered";
  carrier: string;
  driver: string;
  driverPhone: string;
  currentLocation?: { lat: number; lng: number; city: string };
  pickupDate: string;
  deliveryDate: string;
  rate: string;
  distance: string;
  eta: string;
  lastUpdate: string;
  quickPayEligible?: boolean;
  quickPayRate?: string;
  commodity: string;
  weight: string;
  equipment: string;
  referenceNumber: string;
  specialInstructions?: string;
}

interface BrokerLoadTrackingMapProps {
  load: LoadInProgress;
}

const BrokerLoadTrackingMap = ({ load }: BrokerLoadTrackingMapProps) => {
  return (
    <Card className="bg-white h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5" />
            <span>Real-Time Tracking</span>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-600">
            Live Updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[500px] relative">
        {/* Enhanced Map View */}
        <div className="w-full h-full bg-slate-100 rounded-lg relative overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
          
          {/* Route Visualization */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            {/* Main Route */}
            <path
              d="M 80 150 Q 250 100 420 300"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeDasharray="8,4"
              fill="none"
              opacity="0.8"
            />
            {/* Completed Route */}
            <path
              d="M 80 150 Q 200 110 320 200"
              stroke="#10B981"
              strokeWidth="6"
              fill="none"
              opacity="0.9"
            />
          </svg>

          {/* Origin Marker */}
          <div className="absolute" style={{ left: '80px', top: '150px', transform: 'translate(-50%, -50%)' }}>
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border text-xs whitespace-nowrap">
              <div className="font-semibold">{load.origin}</div>
              <div className="text-green-600">Pickup Complete</div>
            </div>
          </div>

          {/* Current Location Marker */}
          {load.currentLocation && (
            <div className="absolute" style={{ left: '320px', top: '200px', transform: 'translate(-50%, -50%)' }}>
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg border-2 border-white animate-pulse">
                <Truck className="w-6 h-6" />
              </div>
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-blue-50 p-3 rounded-lg shadow-lg border border-blue-200 text-xs whitespace-nowrap z-10">
                <div className="font-semibold text-blue-900">{load.currentLocation.city}</div>
                <div className="text-blue-700">{load.driver}</div>
                <div className="text-blue-600 text-xs">Updated {load.lastUpdate}</div>
              </div>
            </div>
          )}

          {/* Destination Marker */}
          <div className="absolute" style={{ left: '420px', top: '300px', transform: 'translate(-50%, -50%)' }}>
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border text-xs whitespace-nowrap">
              <div className="font-semibold">{load.destination}</div>
              <div className="text-purple-600">Delivery Scheduled</div>
              <div className="text-slate-500">ETA: {load.eta}</div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Route className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-sm">Progress</span>
            </div>
            <div className="w-48 bg-slate-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>Pickup</span>
              <span className="font-medium">65% Complete</span>
              <span>Delivery</span>
            </div>
          </div>

          {/* Live Status Panel */}
          <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg min-w-[200px]">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">Live Tracking</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Distance Remaining:</span>
                <span className="font-medium">324 mi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Speed:</span>
                <span className="font-medium">65 mph</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Next Stop:</span>
                <span className="font-medium text-blue-600">Rest Area</span>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col">
              <button className="p-2 hover:bg-slate-50 border-b">
                <span className="text-lg">+</span>
              </button>
              <button className="p-2 hover:bg-slate-50">
                <span className="text-lg">−</span>
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
            <div className="text-xs font-semibold mb-2">Map Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span>Pickup Location</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>Current Position</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span>Destination</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerLoadTrackingMap;
