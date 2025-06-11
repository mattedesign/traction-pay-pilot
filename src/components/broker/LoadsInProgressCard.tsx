
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoadInProgress {
  id: string;
  origin: string;
  destination: string;
  status: string;
  carrier: string;
  pickupDate: string;
  rate: string;
  eta: string;
}

const LoadsInProgressCard = () => {
  const navigate = useNavigate();
  
  const loadsInProgress: LoadInProgress[] = [
    {
      id: "BL-2024-001",
      origin: "Chicago, IL",
      destination: "Dallas, TX",
      status: "In Transit",
      carrier: "ABC Trucking",
      pickupDate: "2024-06-08",
      rate: "$2,450",
      eta: "2024-06-10"
    },
    {
      id: "BL-2024-002", 
      origin: "Los Angeles, CA",
      destination: "Phoenix, AZ",
      status: "Pickup Complete",
      carrier: "XYZ Logistics",
      pickupDate: "2024-06-07",
      rate: "$1,850",
      eta: "2024-06-09"
    },
    {
      id: "BL-2024-003",
      origin: "Miami, FL", 
      destination: "Atlanta, GA",
      status: "Pickup Scheduled",
      carrier: "Fast Transport",
      pickupDate: "2024-06-10",
      rate: "$1,675",
      eta: "2024-06-11"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Pickup Complete": return "bg-orange-100 text-orange-800";
      case "Pickup Scheduled": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleLoadClick = (loadId: string) => {
    navigate(`/broker/load/${loadId}`);
  };

  const handleViewAllLoads = () => {
    navigate("/broker/loads-in-progress");
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="w-5 h-5" />
          <span>Loads in Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadsInProgress.map((load) => (
          <div 
            key={load.id} 
            className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer hover:shadow-md"
            onClick={() => handleLoadClick(load.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-slate-900">{load.id}</h3>
                <Badge className={getStatusColor(load.status)}>{load.status}</Badge>
              </div>
              <span className="font-bold text-green-600">{load.rate}</span>
            </div>
            
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{load.origin} → {load.destination}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{load.carrier}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>ETA: {load.eta}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full" onClick={handleViewAllLoads}>
          View All Loads
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoadsInProgressCard;
