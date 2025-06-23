
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import BrokerLoadStatusTimeline from "@/components/broker/BrokerLoadStatusTimeline";
import BrokerLoadTrackingMap from "@/components/broker/BrokerLoadTrackingMap";
import BrokerDriverContactCard from "@/components/broker/BrokerDriverContactCard";
import { LoadInProgress } from "@/types/brokerLoad";

// Mock data - in a real app, this would come from an API
const mockLoad: LoadInProgress = {
  id: "LOAD-2024-001",
  origin: "Los Angeles, CA",
  destination: "Phoenix, AZ",
  status: "in_transit",
  carrier: "ABC Trucking",
  driver: "John Smith",
  driverPhone: "(555) 123-4567",
  currentLocation: { lat: 34.0522, lng: -118.2437, city: "Barstow, CA" },
  pickupDate: "2024-01-15",
  deliveryDate: "2024-01-16",
  rate: "$2,450",
  distance: "390 miles",
  eta: "Tomorrow 2:00 PM",
  lastUpdate: "2 hours ago",
  quickPayEligible: true,
  quickPayRate: "$2,400",
  commodity: "Electronics",
  weight: "34,000 lbs",
  equipment: "Dry Van",
  referenceNumber: "REF-001",
  specialInstructions: "Call before delivery"
};

const BrokerLoadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/broker/loads");
  };

  return (
    <div className="h-screen bg-slate-50 flex w-full">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col min-h-0">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBack}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Loads
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{mockLoad.id}</h1>
                  <p className="text-slate-600">{mockLoad.origin} → {mockLoad.destination}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-sm">
                {mockLoad.status === "in_transit" ? "In Transit" : "Delivery Scheduled"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Load Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Load Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-700">Commodity</div>
                        <div className="text-slate-900">{mockLoad.commodity}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Weight</div>
                        <div className="text-slate-900">{mockLoad.weight}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Equipment</div>
                        <div className="text-slate-900">{mockLoad.equipment}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Rate</div>
                        <div className="text-slate-900">{mockLoad.rate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Distance</div>
                        <div className="text-slate-900">{mockLoad.distance}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Reference</div>
                        <div className="text-slate-900">{mockLoad.referenceNumber}</div>
                      </div>
                    </div>
                    {mockLoad.specialInstructions && (
                      <div>
                        <div className="text-sm font-medium text-slate-700">Special Instructions</div>
                        <div className="text-slate-900">{mockLoad.specialInstructions}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Status Timeline */}
                <BrokerLoadStatusTimeline load={mockLoad} />

                {/* Tracking Map */}
                <BrokerLoadTrackingMap load={mockLoad} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Driver Contact */}
                <BrokerDriverContactCard load={mockLoad} />

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      Update Delivery Instructions
                    </Button>
                    <Button className="w-full" variant="outline">
                      Request ETA Update
                    </Button>
                    <Button className="w-full" variant="outline">
                      Generate BOL
                    </Button>
                    {mockLoad.quickPayEligible && (
                      <Button className="w-full">
                        Offer Quick Pay ({mockLoad.quickPayRate})
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerLoadDetailPage;
