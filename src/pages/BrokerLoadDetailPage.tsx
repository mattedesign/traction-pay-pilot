import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Phone, MessageSquare, MapPin, Truck, Clock, User } from "lucide-react";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import BrokerLoadTrackingMap from "@/components/broker/BrokerLoadTrackingMap";
import BrokerLoadStatusTimeline from "@/components/broker/BrokerLoadStatusTimeline";
import BrokerDriverContactCard from "@/components/broker/BrokerDriverContactCard";
import { useAuth } from "@/hooks/useAuth";
import { LoadInProgress } from "@/types/brokerLoad";

const BrokerLoadDetailPage = () => {
  const { loadId } = useParams();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  // Mock load data - in real implementation, this would come from an API
  const mockLoad: LoadInProgress = {
    id: loadId || "BL-2024-001",
    origin: "Chicago, IL",
    destination: "Dallas, TX", 
    status: "in_transit",
    carrier: "ABC Trucking",
    driver: "John Smith",
    driverPhone: "+1 (555) 123-4567",
    currentLocation: { lat: 35.2271, lng: -101.8313, city: "Amarillo, TX" },
    pickupDate: "2024-06-08",
    deliveryDate: "2024-06-10",
    rate: "$2,450",
    distance: "925 mi",
    eta: "2024-06-10 14:00",
    lastUpdate: "2 hours ago",
    quickPayEligible: true,
    quickPayRate: "$2,205",
    commodity: "General Freight",
    weight: "45,000 lbs",
    equipment: "53' Dry Van",
    referenceNumber: "REF-2024-ABC-001",
    specialInstructions: "Call driver 30 minutes before delivery"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_transit": return "bg-blue-100 text-blue-800";
      case "delivery_scheduled": return "bg-orange-100 text-orange-800";
      case "pickup_scheduled": return "bg-yellow-100 text-yellow-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_transit": return <Truck className="w-4 h-4" />;
      case "delivery_scheduled": return <MapPin className="w-4 h-4" />;
      case "pickup_scheduled": return <Clock className="w-4 h-4" />;
      default: return <Truck className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/broker/loads-in-progress")}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Loads
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{mockLoad.id}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge className={getStatusColor(mockLoad.status)}>
                    {getStatusIcon(mockLoad.status)}
                    <span className="ml-1 capitalize">{mockLoad.status.replace('_', ' ')}</span>
                  </Badge>
                  <span className="text-slate-600">{mockLoad.origin} → {mockLoad.destination}</span>
                  <span className="font-semibold text-green-600">{mockLoad.rate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="tracking" className="h-full">
            <div className="px-8 py-4 border-b border-slate-200">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8 space-y-6">
              <TabsContent value="tracking" className="space-y-6 m-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Driver Contact Card */}
                  <BrokerDriverContactCard load={mockLoad} />

                  {/* Load Details Card */}
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Truck className="w-5 h-5" />
                        <span>Load Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-700">Commodity:</span>
                          <div className="text-slate-600">{mockLoad.commodity}</div>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Weight:</span>
                          <div className="text-slate-600">{mockLoad.weight}</div>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Equipment:</span>
                          <div className="text-slate-600">{mockLoad.equipment}</div>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Distance:</span>
                          <div className="text-slate-600">{mockLoad.distance}</div>
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium text-slate-700">Reference:</span>
                          <div className="text-slate-600">{mockLoad.referenceNumber}</div>
                        </div>
                        {mockLoad.specialInstructions && (
                          <div className="col-span-2">
                            <span className="font-medium text-slate-700">Special Instructions:</span>
                            <div className="text-slate-600">{mockLoad.specialInstructions}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Current Status Card */}
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Current Status</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockLoad.currentLocation && (
                        <div>
                          <span className="font-medium text-slate-700">Current Location:</span>
                          <div className="text-slate-600">{mockLoad.currentLocation.city}</div>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-slate-700">ETA:</span>
                        <div className="text-slate-600">{mockLoad.eta}</div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Last Update:</span>
                        <div className="text-slate-500 text-sm">{mockLoad.lastUpdate}</div>
                      </div>
                      {mockLoad.quickPayEligible && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="font-medium text-blue-900">QuickPay Available</div>
                          <div className="text-blue-700">{mockLoad.quickPayRate}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Map */}
                <BrokerLoadTrackingMap load={mockLoad} />
              </TabsContent>

              <TabsContent value="timeline" className="m-0">
                <BrokerLoadStatusTimeline load={mockLoad} />
              </TabsContent>

              <TabsContent value="documents" className="m-0">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Load Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-slate-500">
                      Documents feature coming soon...
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BrokerLoadDetailPage;
