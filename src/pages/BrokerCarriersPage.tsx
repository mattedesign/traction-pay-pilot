
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, Star, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerCarriersPage = () => {
  const { profile, signOut } = useAuth();

  const carriers = [
    { 
      name: "ABC Trucking", 
      contact: "John Smith", 
      phone: "(555) 123-4567", 
      email: "john@abctrucking.com", 
      rating: 4.8, 
      activeLoads: 3, 
      status: "Active" 
    },
    { 
      name: "XYZ Logistics", 
      contact: "Sarah Johnson", 
      phone: "(555) 234-5678", 
      email: "sarah@xyzlogistics.com", 
      rating: 4.6, 
      activeLoads: 2, 
      status: "Active" 
    },
    { 
      name: "Fast Transport", 
      contact: "Mike Wilson", 
      phone: "(555) 345-6789", 
      email: "mike@fasttransport.com", 
      rating: 4.9, 
      activeLoads: 1, 
      status: "Active" 
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Carriers</h1>
              <p className="text-slate-600">Manage your carrier network</p>
            </div>
            <div className="flex space-x-2">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Carrier
              </Button>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Active Carriers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carriers.map((carrier, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{carrier.name}</h3>
                          <Badge className={getStatusColor(carrier.status)}>{carrier.status}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-slate-600">{carrier.rating}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                          <div>
                            <p className="font-medium">Contact: {carrier.contact}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Phone className="w-3 h-3" />
                              <span>{carrier.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Mail className="w-3 h-3" />
                              <span>{carrier.email}</span>
                            </div>
                          </div>
                          <div>
                            <p><span className="font-medium">Active Loads:</span> {carrier.activeLoads}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="outline" size="sm">Contact</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerCarriersPage;
