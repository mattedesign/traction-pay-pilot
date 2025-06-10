
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Truck, Package, AlertCircle, Phone } from "lucide-react";

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

interface BrokerLoadStatusTimelineProps {
  load: LoadInProgress;
}

const BrokerLoadStatusTimeline = ({ load }: BrokerLoadStatusTimelineProps) => {
  const timelineEvents = [
    {
      title: "Load Assigned",
      description: `Load assigned to ${load.carrier}`,
      time: "Jun 6, 2024 9:00 AM",
      status: "completed",
      icon: Package,
      details: [`Carrier: ${load.carrier}`, `Driver: ${load.driver}`, `Equipment: ${load.equipment}`]
    },
    {
      title: "Driver Contacted",
      description: "Driver received load details and route information",
      time: "Jun 6, 2024 9:15 AM",
      status: "completed",
      icon: Phone,
      details: [`Contact: ${load.driverPhone}`, "Route optimized", "Documentation sent"]
    },
    {
      title: "Pickup Scheduled",
      description: `Pickup confirmed at ${load.origin}`,
      time: load.pickupDate + " 8:00 AM",
      status: "completed",
      icon: Clock,
      details: ["Appointment confirmed", "Shipper notified", "Documentation ready"]
    },
    {
      title: "Pickup Complete",
      description: "Load picked up and secured",
      time: load.pickupDate + " 8:45 AM", 
      status: "completed",
      icon: CheckCircle,
      details: ["BOL signed", "Weight verified", "Seal applied"]
    },
    {
      title: "In Transit",
      description: load.currentLocation ? `Current location: ${load.currentLocation.city}` : "En route to destination",
      time: load.lastUpdate,
      status: load.status === "in_transit" || load.status === "delivery_scheduled" || load.status === "delivered" ? "current" : "pending",
      icon: Truck,
      details: ["GPS tracking active", "Driver in communication", "On schedule"]
    },
    {
      title: "Delivery Scheduled",
      description: `Delivery appointment at ${load.destination}`,
      time: load.deliveryDate + " 2:00 PM",
      status: load.status === "delivery_scheduled" || load.status === "delivered" ? "completed" : "pending",
      icon: MapPin,
      details: ["Consignee contacted", "Delivery window confirmed", "Special instructions reviewed"]
    },
    {
      title: "Delivered",
      description: "Load successfully delivered",
      time: load.status === "delivered" ? load.deliveryDate + " 1:45 PM" : "Pending",
      status: load.status === "delivered" ? "completed" : "pending",
      icon: CheckCircle,
      details: ["POD obtained", "Invoice ready", "Payment processing"]
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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold">{load.commodity}</div>
                <div className="text-sm text-slate-600">{load.weight}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold">{load.driver}</div>
                <div className="text-sm text-slate-600">{load.carrier}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <div className="font-semibold">ETA: {load.eta}</div>
                <div className="text-sm text-slate-600">On Schedule</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Load Timeline - {load.id}</span>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{load.referenceNumber}</Badge>
              <Badge className={getStatusColor(load.status === "in_transit" ? "current" : "completed")}>
                {load.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            
            {/* Timeline Events */}
            <div className="space-y-8">
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
                      <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                      
                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {event.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="text-xs text-slate-500 flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-700">Total Distance:</span>
                <span className="ml-2 text-slate-600">{load.distance}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">Rate:</span>
                <span className="ml-2 text-green-600 font-semibold">{load.rate}</span>
              </div>
              {load.specialInstructions && (
                <div className="col-span-2">
                  <span className="font-medium text-slate-700">Special Instructions:</span>
                  <div className="mt-1 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    {load.specialInstructions}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrokerLoadStatusTimeline;
