import { useState, useEffect, useNavigate } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Truck, Clock, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import LoadTrackingMap from "@/components/broker/LoadTrackingMap";
import FinancialInsightsDashboard from "@/components/broker/FinancialInsightsDashboard";
import QuickPayOptimization from "@/components/broker/QuickPayOptimization";
import LoadStatusTimeline from "@/components/broker/LoadStatusTimeline";
import { useAuth } from "@/hooks/useAuth";

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

const BrokerLoadsInProgressPage = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedLoad, setSelectedLoad] = useState<LoadInProgress | null>(null);
  const [loads, setLoads] = useState<LoadInProgress[]>([
    {
      id: "BL-2024-001",
      origin: "Chicago, IL",
      destination: "Dallas, TX",
      status: "in_transit",
      carrier: "ABC Trucking",
      driver: "John Smith",
      currentLocation: { lat: 35.2271, lng: -101.8313, city: "Amarillo, TX" },
      pickupDate: "2024-06-08",
      deliveryDate: "2024-06-10",
      rate: "$2,450",
      distance: "925 mi",
      eta: "2024-06-10 14:00",
      lastUpdate: "2 hours ago",
      quickPayEligible: true,
      quickPayRate: "$2,205"
    },
    {
      id: "BL-2024-002",
      origin: "Los Angeles, CA",
      destination: "Phoenix, AZ",
      status: "delivery_scheduled",
      carrier: "XYZ Logistics",
      driver: "Maria Garcia",
      currentLocation: { lat: 33.4484, lng: -112.0740, city: "Phoenix, AZ" },
      pickupDate: "2024-06-07",
      deliveryDate: "2024-06-09",
      rate: "$1,850",
      distance: "370 mi",
      eta: "2024-06-09 10:00",
      lastUpdate: "30 minutes ago",
      quickPayEligible: true,
      quickPayRate: "$1,665"
    },
    {
      id: "BL-2024-003",
      origin: "Miami, FL",
      destination: "Atlanta, GA",
      status: "pickup_scheduled",
      carrier: "Fast Transport",
      driver: "Robert Johnson",
      pickupDate: "2024-06-10",
      deliveryDate: "2024-06-11",
      rate: "$1,675",
      distance: "650 mi",
      eta: "2024-06-11 16:00",
      lastUpdate: "1 hour ago",
      quickPayEligible: false
    }
  ]);

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
      case "delivered": return <TrendingUp className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLoads(prev => prev.map(load => ({
        ...load,
        lastUpdate: `${Math.floor(Math.random() * 60)} minutes ago`
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLoadClick = (loadId: string) => {
    navigate(`/broker/load/${loadId}`);
  };

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Loads in Progress</h1>
              <p className="text-slate-600">Real-time tracking and financial insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {loads.length} Active Loads
              </Badge>
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
                <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="quickpay">QuickPay</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8 space-y-6">
              <TabsContent value="tracking" className="space-y-6 m-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                  {/* Load List */}
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Truck className="w-5 h-5" />
                        <span>Active Loads</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                      {loads.map((load) => (
                        <div 
                          key={load.id} 
                          className={`border border-slate-200 rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedLoad?.id === load.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-slate-50'
                          }`}
                          onClick={() => {
                            setSelectedLoad(load);
                            handleLoadClick(load.id);
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900">{load.id}</h3>
                              <Badge className={getStatusColor(load.status)}>
                                {getStatusIcon(load.status)}
                                <span className="ml-1 capitalize">{load.status.replace('_', ' ')}</span>
                              </Badge>
                            </div>
                            <span className="font-bold text-green-600">{load.rate}</span>
                          </div>
                          
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{load.origin} → {load.destination}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>{load.carrier}</span>
                              <span className="text-xs">{load.lastUpdate}</span>
                            </div>
                            {load.currentLocation && (
                              <div className="text-xs text-blue-600">
                                Current: {load.currentLocation.city}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Map */}
                  <div className="lg:col-span-2">
                    <LoadTrackingMap loads={loads} selectedLoad={selectedLoad} />
                  </div>
                </div>

                {/* Load Details Timeline */}
                {selectedLoad && (
                  <LoadStatusTimeline load={selectedLoad} />
                )}
              </TabsContent>

              <TabsContent value="financial" className="m-0">
                <FinancialInsightsDashboard loads={loads} />
              </TabsContent>

              <TabsContent value="quickpay" className="m-0">
                <QuickPayOptimization loads={loads} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BrokerLoadsInProgressPage;

}
