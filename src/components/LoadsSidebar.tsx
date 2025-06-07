
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface Load {
  id: string;
  broker: string;
  status: "pending_pickup" | "in_transit" | "delivered";
  amount: string;
  origin: string;
  destination: string;
  pickupTime: string;
  distance: string;
}

const mockLoads: Load[] = [
  {
    id: "1234",
    broker: "Swift Logistics",
    status: "pending_pickup",
    amount: "$500.00",
    origin: "Shreve, OH",
    destination: "Grove City, OH",
    pickupTime: "Today 1:00 PM",
    distance: "45 miles"
  },
  {
    id: "5678",
    broker: "Phoenix Freight Co",
    status: "in_transit",
    amount: "$750.00",
    origin: "Phoenix, AZ",
    destination: "Perris, CA",
    pickupTime: "May 29, 7:00 AM",
    distance: "332 miles"
  },
  {
    id: "9012",
    broker: "Delta Shipping",
    status: "delivered",
    amount: "$650.00",
    origin: "Houston, TX",
    destination: "Dallas, TX",
    pickupTime: "May 28, 9:00 AM",
    distance: "240 miles"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending_pickup":
      return "bg-yellow-100 text-yellow-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending_pickup":
      return "Pending Pickup";
    case "in_transit":
      return "In Transit";
    case "delivered":
      return "Delivered";
    default:
      return status;
  }
};

const LoadsSidebar = () => {
  const { loadId } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log("Navigating back to dashboard");
    navigate("/");
  };

  return (
    <div className="w-80 bg-slate-900 text-white h-full overflow-y-auto">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold flex items-center">
            <Truck className="w-6 h-6 mr-2" />
            Loads
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            className="text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {mockLoads.map((load) => (
          <Card 
            key={load.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              loadId === load.id 
                ? "bg-slate-700 border-blue-500" 
                : "bg-slate-800 border-slate-600 hover:bg-slate-700"
            }`}
            onClick={() => navigate(`/load/${load.id}`)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-white">
                  Load #{load.id}
                </CardTitle>
                <Badge className={getStatusColor(load.status)}>
                  {getStatusLabel(load.status)}
                </Badge>
              </div>
              <p className="text-xs text-slate-300">{load.broker}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Rate</span>
                  <span className="text-sm font-semibold text-green-400">{load.amount}</span>
                </div>
                
                <div className="flex items-center text-xs text-slate-300">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate">{load.origin} → {load.destination}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{load.pickupTime}</span>
                  <span>{load.distance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoadsSidebar;
