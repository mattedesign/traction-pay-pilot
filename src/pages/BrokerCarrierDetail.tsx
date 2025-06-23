
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Star, Truck, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";

interface CarrierDetail {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  rating: number;
  status: "active" | "inactive" | "pending";
  address: string;
  dotNumber: string;
  mcNumber: string;
  equipment: string[];
  totalLoads: number;
  activeLoads: number;
  completedLoads: number;
  averageRate: string;
  onTimePercentage: number;
  joinDate: string;
  lastActivity: string;
  preferredLanes: string[];
  insuranceExpiry: string;
  notes: string;
}

// Mock data - in a real app, this would come from an API
const mockCarrier: CarrierDetail = {
  id: "CARR-001",
  name: "ABC Trucking",
  contact: "John Smith",
  phone: "(555) 123-4567",
  email: "john@abctrucking.com",
  rating: 4.8,
  status: "active",
  address: "1234 Main St, Los Angeles, CA 90210",
  dotNumber: "DOT123456",
  mcNumber: "MC654321",
  equipment: ["Dry Van", "Refrigerated", "Flatbed"],
  totalLoads: 247,
  activeLoads: 3,
  completedLoads: 244,
  averageRate: "$2,450",
  onTimePercentage: 96,
  joinDate: "2023-03-15",
  lastActivity: "2 hours ago",
  preferredLanes: ["CA to AZ", "TX to FL", "NY to GA"],
  insuranceExpiry: "2024-12-31",
  notes: "Reliable carrier with excellent track record. Preferred for high-value loads."
};

const BrokerCarrierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/broker/carriers");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
                  Back to Carriers
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{mockCarrier.name}</h1>
                  <p className="text-slate-600">{mockCarrier.contact}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(mockCarrier.status)}>
                  {mockCarrier.status.charAt(0).toUpperCase() + mockCarrier.status.slice(1)}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{mockCarrier.rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Carrier Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Carrier Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-700">DOT Number</div>
                        <div className="text-slate-900">{mockCarrier.dotNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">MC Number</div>
                        <div className="text-slate-900">{mockCarrier.mcNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Address</div>
                        <div className="text-slate-900">{mockCarrier.address}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Join Date</div>
                        <div className="text-slate-900">{mockCarrier.joinDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Insurance Expiry</div>
                        <div className="text-slate-900">{mockCarrier.insuranceExpiry}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Last Activity</div>
                        <div className="text-slate-900">{mockCarrier.lastActivity}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Equipment Types</div>
                      <div className="flex flex-wrap gap-2">
                        {mockCarrier.equipment.map((eq, index) => (
                          <Badge key={index} variant="outline">
                            <Truck className="w-3 h-3 mr-1" />
                            {eq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Preferred Lanes</div>
                      <div className="flex flex-wrap gap-2">
                        {mockCarrier.preferredLanes.map((lane, index) => (
                          <Badge key={index} variant="outline">
                            <MapPin className="w-3 h-3 mr-1" />
                            {lane}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {mockCarrier.notes && (
                      <div>
                        <div className="text-sm font-medium text-slate-700">Notes</div>
                        <div className="text-slate-900">{mockCarrier.notes}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{mockCarrier.totalLoads}</div>
                        <div className="text-sm text-slate-600">Total Loads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{mockCarrier.completedLoads}</div>
                        <div className="text-sm text-slate-600">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{mockCarrier.onTimePercentage}%</div>
                        <div className="text-sm text-slate-600">On-Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{mockCarrier.averageRate}</div>
                        <div className="text-sm text-slate-600">Avg Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700">Primary Contact</div>
                      <div className="text-slate-900">{mockCarrier.contact}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700">Phone</div>
                      <div className="text-slate-900">{mockCarrier.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700">Email</div>
                      <div className="text-slate-900">{mockCarrier.email}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Assign Load
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Load History
                    </Button>
                    <Button variant="outline" className="w-full">
                      Edit Carrier Info
                    </Button>
                    <Button variant="outline" className="w-full">
                      Update Insurance
                    </Button>
                    <Button variant="outline" className="w-full" disabled={mockCarrier.status === "inactive"}>
                      {mockCarrier.status === "active" ? "Deactivate" : "Activate"} Carrier
                    </Button>
                  </CardContent>
                </Card>

                {/* Current Loads */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Loads ({mockCarrier.activeLoads})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockCarrier.activeLoads > 0 ? (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div className="font-medium">LOAD-2024-001</div>
                          <div className="text-slate-600">LA → Phoenix</div>
                          <div className="text-green-600">In Transit</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">LOAD-2024-015</div>
                          <div className="text-slate-600">Dallas → Atlanta</div>
                          <div className="text-blue-600">Pickup Scheduled</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">LOAD-2024-023</div>
                          <div className="text-slate-600">Miami → NY</div>
                          <div className="text-yellow-600">Delivery Scheduled</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-sm">No active loads</div>
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

export default BrokerCarrierDetail;
