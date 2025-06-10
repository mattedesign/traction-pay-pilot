
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, User, MapPin, Clock } from "lucide-react";

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

interface BrokerDriverContactCardProps {
  load: LoadInProgress;
}

const BrokerDriverContactCard = ({ load }: BrokerDriverContactCardProps) => {
  const handleCall = () => {
    window.open(`tel:${load.driverPhone}`);
  };

  const handleMessage = () => {
    // In a real implementation, this would open a messaging interface
    console.log(`Opening message to ${load.driver}`);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Driver Contact</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Driver Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">{load.driver}</div>
            <div className="text-sm text-slate-600">{load.carrier}</div>
            <Badge variant="outline" className="mt-1 text-xs">
              Professional Driver
            </Badge>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleCall} className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </Button>
          <Button variant="outline" onClick={handleMessage} className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Message</span>
          </Button>
        </div>

        {/* Driver Details */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">{load.driverPhone}</span>
          </div>
          
          {load.currentLocation && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">Near {load.currentLocation.city}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Last contact: {load.lastUpdate}</span>
          </div>
        </div>

        {/* Communication Log */}
        <div className="pt-2 border-t border-slate-200">
          <div className="text-sm font-medium text-slate-700 mb-2">Recent Communication</div>
          <div className="space-y-2">
            <div className="text-xs bg-slate-50 p-2 rounded">
              <div className="font-medium">2 hours ago</div>
              <div className="text-slate-600">Driver reported passing through Amarillo, TX. On schedule for delivery.</div>
            </div>
            <div className="text-xs bg-blue-50 p-2 rounded">
              <div className="font-medium">4 hours ago</div>
              <div className="text-slate-600">You: Confirmed delivery appointment for tomorrow 2 PM</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2 border-t border-slate-200">
          <div className="text-sm font-medium text-slate-700 mb-2">Quick Actions</div>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              Request ETA Update
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              Send Delivery Instructions
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              Schedule Check-in Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerDriverContactCard;
