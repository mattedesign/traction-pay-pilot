
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, DollarSign, FileText, Upload, Share2, Fuel } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const LoadDetail = () => {
  const { loadId } = useParams();
  const navigate = useNavigate();

  // Mock load data based on loadId
  const getLoadData = (id: string) => {
    const loads: Record<string, any> = {
      "1234": {
        loadId: "1234",
        status: "pending_pickup",
        amount: "$500.00",
        origin: "3875 S Elyria Rd, Shreve, OH 44676",
        destination: "3920 Southwest Blvd, Grove City, OH 43123",
        pickupTime: "Today 1:00 PM",
        deliveryTime: "Today 4:30 PM",
        distance: "45 miles",
        mode: "TL",
        broker: "Swift Logistics",
        documents: []
      },
      "5678": {
        loadId: "5678",
        status: "in_transit",
        amount: "$750.00",
        origin: "1015 South 43rd Avenue, Phoenix, AZ 85001",
        destination: "400 East Ellis Avenue, Perris, CA 92570",
        pickupTime: "May 29, 7:00 AM",
        deliveryTime: "May 29, 6:00 PM",
        distance: "332 miles",
        mode: "truck",
        broker: "Phoenix Freight Co",
        documents: ["Rate Confirmation"]
      }
    };
    return loads[id] || loads["1234"];
  };

  const loadData = getLoadData(loadId || "1234");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Load #{loadData.loadId}</h1>
              <p className="text-sm text-slate-500">{loadData.broker}</p>
            </div>
            <div className="ml-auto">
              <Badge 
                variant="outline" 
                className={`${
                  loadData.status === "pending_pickup" ? "border-orange-200 bg-orange-50 text-orange-700" :
                  loadData.status === "in_transit" ? "border-blue-200 bg-blue-50 text-blue-700" :
                  "border-green-200 bg-green-50 text-green-700"
                }`}
              >
                {loadData.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Load Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Load Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Rate</span>
                    </div>
                    <p className="text-xl font-bold text-green-600">{loadData.amount}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium">Distance</span>
                    </div>
                    <p className="text-sm text-slate-700">{loadData.distance}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Pickup Location</span>
                    </div>
                    <p className="text-sm text-slate-700">{loadData.origin}</p>
                    <p className="text-xs text-slate-500">{loadData.pickupTime}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Delivery Location</span>
                    </div>
                    <p className="text-sm text-slate-700">{loadData.destination}</p>
                    <p className="text-xs text-slate-500">{loadData.deliveryTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Optimization */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Smart Route Suggestions</CardTitle>
                <CardDescription className="text-blue-700">
                  AI-optimized route based on real-time fuel prices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white border border-blue-200 rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-900">Recommended Route</span>
                    <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                      Save $12.50
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-700">
                    Via I-71 N → I-270 W • Avoids high-fuel zones • 3 preferred truck stops
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-blue-200 rounded p-3 text-center">
                    <Fuel className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-blue-900">Est. Fuel Cost</p>
                    <p className="text-lg font-bold text-blue-600">$52.30</p>
                  </div>
                  <div className="bg-white border border-blue-200 rounded p-3 text-center">
                    <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-blue-900">Drive Time</p>
                    <p className="text-lg font-bold text-blue-600">1h 15m</p>
                  </div>
                </div>

                <Button className="w-full">
                  View Detailed Route & Fuel Stops
                </Button>
              </CardContent>
            </Card>

            {/* ELD Sharing */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900">Increase Trust with ELD Sharing</CardTitle>
                <CardDescription className="text-orange-700">
                  Share real-time location to unlock better rates and faster payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white border border-orange-200 rounded p-3">
                  <h3 className="font-medium text-orange-900 mb-2">Benefits of ELD Sharing:</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Access to premium loads (+15% average rate)</li>
                    <li>• Faster invoice approval (2 days vs 7 days)</li>
                    <li>• Better relationship with brokers</li>
                    <li>• Reduced detention claims</li>
                  </ul>
                </div>
                
                <Button variant="outline" className="w-full border-orange-300">
                  <Share2 className="w-4 h-4 mr-2" />
                  Enable ELD Sharing for This Load
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Documents & Actions */}
          <div className="space-y-6">
            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Load Documents</CardTitle>
                <CardDescription>
                  Upload required documents to complete this load
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {["Bill of Lading", "Delivery Receipt", "Weight Ticket", "Photos"].map((docType) => (
                    <div key={docType} className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">{docType}</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Upload
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Smart Document Processing</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Just upload any document - our AI will automatically categorize and extract information
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Financial Services */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Financial Services</CardTitle>
                <CardDescription className="text-green-700">
                  Improve your cash flow for this load
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-green-200 rounded p-3 text-center">
                    <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-900">Fuel Advance</p>
                    <p className="text-xs text-green-700">Up to ${Math.round(parseFloat(loadData.amount.slice(1)) * 0.3)}</p>
                    <Button size="sm" variant="outline" className="mt-2 border-green-300">
                      Apply
                    </Button>
                  </div>
                  <div className="bg-white border border-green-200 rounded p-3 text-center">
                    <CreditCard className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-900">Fuel Cards</p>
                    <p className="text-xs text-green-700">Best rates on route</p>
                    <Button size="sm" variant="outline" className="mt-2 border-green-300">
                      Compare
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle>Load Assistant</CardTitle>
                <CardDescription>
                  Ask questions about this load, routing, payments, or requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChatInterface loadContext={`Load #${loadData.loadId}`} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadDetail;
