
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck, MapPin, Clock, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import { LoadService } from "@/services/loadService";

const ActiveLoadsDetailPage = () => {
  const navigate = useNavigate();
  const loads = LoadService.getAllLoads();
  const activeLoads = loads.filter(load => 
    load.status === 'in_transit' || 
    load.status === 'pending_pickup' || 
    load.status === 'pending_acceptance'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_acceptance': return 'bg-yellow-100 text-yellow-800';
      case 'pending_pickup': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_acceptance': return <Clock className="w-4 h-4" />;
      case 'pending_pickup': return <Package className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col h-screen pt-14 md:pt-0">
        <div className="border-b border-slate-200 bg-white px-6 py-4 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Active Loads Detail</h1>
              <p className="text-slate-600 mt-1">All loads currently in progress</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Active</p>
                    <p className="text-3xl font-bold text-slate-900">{activeLoads.length}</p>
                  </div>
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">In Transit</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {activeLoads.filter(l => l.status === 'in_transit').length}
                    </p>
                  </div>
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pending</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {activeLoads.filter(l => l.status !== 'in_transit').length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Loads List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeLoads.map((load) => (
                  <div key={load.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        {getStatusIcon(load.status)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Load #{load.id}</div>
                        <div className="text-sm text-slate-600">{load.broker}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{load.origin} → {load.destination}</span>
                        </div>
                        <div className="text-sm text-slate-600 mt-1">{load.distance}</div>
                      </div>
                      
                      <Badge className={getStatusColor(load.status)}>
                        {load.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      
                      <div className="font-bold text-green-600">{load.amount}</div>
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

export default ActiveLoadsDetailPage;
