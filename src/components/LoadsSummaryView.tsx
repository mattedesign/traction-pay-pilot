
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadService } from "@/services/loadService";
import { Load } from "@/types/load";
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  DollarSign, 
  Package, 
  MapPin,
  Clock,
  CheckCircle
} from "lucide-react";

interface LoadsSummaryViewProps {
  onLoadSelect: (load: Load) => void;
}

const LoadsSummaryView = ({ onLoadSelect }: LoadsSummaryViewProps) => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoads = () => {
      setIsLoading(true);
      const allLoads = LoadService.getAllLoads();
      setLoads(allLoads);
      setIsLoading(false);
    };

    fetchLoads();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4" style={{ backgroundColor: '#F5F6FA' }}>
        <div className="text-slate-600">Loading loads summary...</div>
      </div>
    );
  }

  // Calculate summary metrics
  const totalLoads = loads.length;
  const pendingLoads = loads.filter(load => load.status === 'pending_acceptance').length;
  const inTransitLoads = loads.filter(load => load.status === 'in_transit').length;
  const deliveredLoads = loads.filter(load => load.status === 'delivered').length;
  const totalRevenue = loads.reduce((sum, load) => {
    const amount = parseFloat(load.amount.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_acceptance': return 'bg-yellow-100 text-yellow-800';
      case 'pending_pickup': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'ready_to_invoice': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_acceptance': return <Clock className="w-4 h-4" />;
      case 'pending_pickup': return <Package className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'ready_to_invoice': return <DollarSign className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#F5F6FA' }}>
      {/* Header - Fixed */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-900">Loads Overview</h1>
        <p className="text-slate-600 mt-1">Manage and track all your loads</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Loads</p>
                  <p className="text-3xl font-bold text-slate-900">{totalLoads}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-3xl font-bold text-slate-900">{pendingLoads}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">In Transit</p>
                  <p className="text-3xl font-bold text-slate-900">{inTransitLoads}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loads List */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Recent Loads</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loads.slice(0, 10).map((load) => (
                <div 
                  key={load.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onLoadSelect(load)}
                >
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
                    
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {loads.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Truck className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-medium mb-2">No loads found</h3>
                <p>Start by creating your first load or uploading rate confirmations.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadsSummaryView;
