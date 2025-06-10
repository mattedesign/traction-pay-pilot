
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Truck, 
  Clock, 
  Phone, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Navigation
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface BrokerLoadCardProps {
  load: LoadInProgress;
}

const BrokerLoadCard = ({ load }: BrokerLoadCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pickup_scheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_transit": return "bg-green-100 text-green-800 border-green-200";
      case "delivery_scheduled": return "bg-orange-100 text-orange-800 border-orange-200";
      case "delivered": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pickup_scheduled": return <Clock className="w-4 h-4" />;
      case "in_transit": return <Truck className="w-4 h-4" />;
      case "delivery_scheduled": return <MapPin className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewDetails = () => {
    navigate(`/broker/load/${load.id}`);
  };

  const handleCall = () => {
    window.open(`tel:${load.driverPhone}`);
  };

  const handleMessage = () => {
    console.log(`Opening message to ${load.driver}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-900">Load #{load.id}</h3>
              <Badge variant="outline" className="text-xs">
                {load.referenceNumber}
              </Badge>
            </div>
            <Badge className={`${getStatusColor(load.status)} text-xs`}>
              {getStatusIcon(load.status)}
              <span className="ml-1">{load.status.replace('_', ' ').toUpperCase()}</span>
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">{load.rate}</div>
            <div className="text-sm text-slate-600">{load.distance}</div>
          </div>
        </div>

        {/* Route Information */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-1">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="font-medium">{load.origin}</span>
          </div>
          <div className="ml-6 border-l-2 border-slate-200 pl-4 py-1">
            <Navigation className="w-3 h-3 text-slate-400 inline mr-1" />
            <span className="text-xs text-slate-500">
              {load.currentLocation ? `Currently near ${load.currentLocation.city}` : 'En route'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600 mt-1">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="font-medium">{load.destination}</span>
          </div>
        </div>

        {/* Load Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-medium text-slate-700">Carrier:</span>
            <div className="text-slate-600">{load.carrier}</div>
          </div>
          <div>
            <span className="font-medium text-slate-700">Driver:</span>
            <div className="text-slate-600">{load.driver}</div>
          </div>
          <div>
            <span className="font-medium text-slate-700">Commodity:</span>
            <div className="text-slate-600">{load.commodity}</div>
          </div>
          <div>
            <span className="font-medium text-slate-700">Weight:</span>
            <div className="text-slate-600">{load.weight}</div>
          </div>
        </div>

        {/* Timing Information */}
        <div className="bg-slate-50 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-700">Pickup:</span>
              <div className="text-slate-600">{load.pickupDate}</div>
            </div>
            <div>
              <span className="font-medium text-slate-700">Delivery:</span>
              <div className="text-slate-600">{load.deliveryDate}</div>
            </div>
            {load.eta && (
              <div className="col-span-2">
                <span className="font-medium text-slate-700">ETA:</span>
                <div className="text-slate-600">{load.eta}</div>
              </div>
            )}
          </div>
        </div>

        {/* Special Instructions */}
        {load.specialInstructions && (
          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-yellow-800">Special Instructions</div>
                <div className="text-sm text-yellow-700">{load.specialInstructions}</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Pay Badge */}
        {load.quickPayEligible && (
          <div className="mb-4">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              QuickPay Available: {load.quickPayRate}
            </Badge>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex space-x-2">
            <Button onClick={handleCall} size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button onClick={handleMessage} size="sm" variant="outline">
              <MessageSquare className="w-4 h-4 mr-1" />
              Message
            </Button>
          </div>
          <Button onClick={handleViewDetails} size="sm">
            View Details
          </Button>
        </div>

        {/* Last Update */}
        <div className="mt-3 text-xs text-slate-500">
          Last updated: {load.lastUpdate}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerLoadCard;
