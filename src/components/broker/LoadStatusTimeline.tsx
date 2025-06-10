
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Truck, Package } from "lucide-react";

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

interface LoadStatusTimelineProps {
  load: LoadInProgress;
}

const LoadStatusTimeline = ({ load }: LoadStatusTimelineProps) => {
  const timelineEvents = [
    {
      title: "Load Created",
      description: "Load details confirmed and assigned to carrier",
      time: "Jun 6, 2024 9:00 AM",
      status: "completed",
      icon: Package
    },
    {
      title: "Pickup Scheduled",
      description: `Pickup at ${load.origin}`,
      time: load.pickupDate + " 8:00 AM",
      status: "completed",
      icon: Clock
    },
    {
      title: "In Transit",
      description: load.currentLocation ? `Current location: ${load.currentLocation.city}` : "En route to destination",
      time: load.lastUpdate,
      status: load.status === "in_transit" || load.status === "delivery_scheduled" || load.status === "delivered" ? "completed" : "pending",
      icon: Truck
    },
    {
      title: "Delivery Scheduled",
      description: `Delivery at ${load.destination}`,
      time: load.deliveryDate + " 2:00 PM",
      status: load.status === "delivery_scheduled" || load.status === "delivered" ? "completed" : "pending",
      icon: MapPin
    },
    {
      title: "Delivered",
      description: "Load successfully delivered",
      time: load.status === "delivered" ? load.deliveryDate + " 1:45 PM" : "Pending",
      status: load.status === "delivered" ? "completed" : "pending",
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "current": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "current": return "text-blue-600 bg-blue-100";
      case "pending": return "text-gray-400 bg-gray-100";
      default: return "text-gray-400 bg-gray-100";
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Load Timeline - {load.id}</span>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{load.carrier}</Badge>
            <Badge variant="outline">{load.driver}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          
          {/* Timeline Events */}
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-start space-x-4">
                {/* Icon */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-white shadow-sm ${getIconColor(event.status)}`}>
                  <event.icon className="w-5 h-5" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`p-4 rounded-lg border ${getStatusColor(event.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{event.title}</h3>
                      <span className="text-sm text-slate-500">{event.time}</span>
                    </div>
                    <p className="text-sm text-slate-600">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load Details */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-700">Distance:</span>
              <span className="ml-2 text-slate-600">{load.distance}</span>
            </div>
            <div>
              <span className="font-medium text-slate-700">Rate:</span>
              <span className="ml-2 text-green-600 font-semibold">{load.rate}</span>
            </div>
            <div>
              <span className="font-medium text-slate-700">ETA:</span>
              <span className="ml-2 text-slate-600">{load.eta}</span>
            </div>
          </div>
          {load.quickPayEligible && (
            <div className="mt-2 text-sm">
              <span className="font-medium text-slate-700">QuickPay Available:</span>
              <span className="ml-2 text-blue-600 font-semibold">{load.quickPayRate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadStatusTimeline;
